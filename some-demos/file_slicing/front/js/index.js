/** @description 文件选择元素 */
const fileInputDom = document.getElementById('fileInput')
/** @description 上传按钮 */
const uploadBunttonDom = document.getElementById('uploadBuntton')

/** @description 进度条 */
const progressDom = document.getElementById('progress')
/** @description 进度提示信息 */
const messageDom = document.getElementById('message')
/** @description 暂停上传 */
const stopUploadDom = document.getElementById('stopUpload')
/** @description 继续上传 */
const keepUploadDom = document.getElementById('keepUpload')

const config = Object.freeze({
  api: 'http://127.0.0.1:9999'
})

/** 
 * @description 选择的文件
 * @type {File | null} . 
*/
let checkedFile = null
let filehash = null
let chunksList = []
const chunkSize = 100 * 1024 * 1024

let controller = new AbortController();

function clearData() {
  checkedFile = null
  filehash = null
  chunksList = []
  progressDom.value = 0
  progressDom.max = 0
  messageDom.innerHTML = ''
}

fileInputDom.addEventListener('click', function (event) {
  clearData()
})

fileInputDom.addEventListener('change', function (event) {
  const [file] = event.target.files
  console.log(event.target.files, file)
  if (file) {
    checkedFile = file
  }
})

const worker_url = new URL('./getfilehash.worker.js', import.meta.url)
const getFileHash_worker = new Worker(worker_url)

getFileHash_worker.addEventListener('message', async (event) => {
  filehash = event.data.filehash
  const res = await verifyFile(filehash)
  if (res.code === '2000') {
    messageDom.innerHTML = '上传成功!'
    uploadBunttonDom.innerHTML = '上传'
    progressDom.value = progressDom.max
    return
  }
  console.log('文件还未上传... 开始切片...')
  const alreadyUploadChunk = res.code === '2001' ? res.data.alreadyUploadChunk : []
  createChunks(checkedFile, alreadyUploadChunk)

})


uploadBunttonDom.addEventListener('click', function () {
  if (!checkedFile) return
  uploadBunttonDom.innerHTML = '上传中'
  messageDom.innerHTML = '0/**  正在解析文件!'
  const stream = checkedFile.stream()
  getFileHash_worker.postMessage(stream, [stream])
})

stopUploadDom.addEventListener('click', function (event) {
  console.log('正在取消');
  controller.abort(); // 取消
  controller = new AbortController();
})

keepUploadDom.addEventListener('click', async function (event) {
  const res = await verifyFile(filehash)
  const alreadyUploadChunk = res.code === '2001' ? res.data.alreadyUploadChunk : []
  createChunks(checkedFile, alreadyUploadChunk)
})

/**
 * @function 进行文件切片
 * @param {File} file
 */
const createChunks = (file, alreadyUploadChunk) => {
  let start = 0
  chunksList = []

  while (start < file.size) {
    let chunk = file.slice(start, start + chunkSize)
    start += chunkSize
    chunksList.push(chunk)
  }
  progressDom.max = chunksList.length
  progressDom.value = alreadyUploadChunk.length
  getFileHash(alreadyUploadChunk)
}

/**
 * @function 获取文件hash
 */
const getFileHash = async (alreadyUploadChunk) => {
  const chunkNum = chunksList.length
  const maxLength = String(chunkNum).length
  let alreadyUploadChunkIndexs = []
  if (alreadyUploadChunk.length > 0) {
    alreadyUploadChunkIndexs = alreadyUploadChunk.map(chunk => chunk.split('_')[0])
  }
  const curController = controller
  chunksList.forEach(async (chunk, index) => {

    const chunkIndex = String(index).padStart(maxLength, '0')
    if (alreadyUploadChunkIndexs.includes(chunkIndex)) return

    const buffer = await chunk.arrayBuffer()
    const formData = new FormData();

    const spark = new SparkMD5.ArrayBuffer();
    spark.append(buffer);
    const hash = spark.end();
    console.log(`hash of ${index}/${chunkNum} is ${hash}`)

    formData.append(`${chunkIndex}_${hash}`, chunk, filehash);

    const uploadChunkRes = await uploadChunk(formData,curController)
    if (!uploadChunkRes) {
      messageDom.innerHTML = `${progressDom.value}/${progressDom.max} 上传暂停`
      return
    }
    if (uploadChunkRes.code !== '2000') {
      messageDom.innerHTML = `${progressDom.value}/${progressDom.max} 上传错误`
      return
    }
    progressDom.value++
    messageDom.innerHTML = `${progressDom.value}/${progressDom.max}`


    if (progressDom.value !== progressDom.max) return
    const mergeChunksRes = await mergeChunks()
    if (mergeChunksRes.code === '2000') {
      messageDom.innerHTML = `${progressDom.value}/${progressDom.max} 上传完成！`
      uploadBunttonDom.innerHTML = '上传'
    }
  })



}

const fetchApi = async (params) => {
  const url = `${config.api}/verifyFile?${new URLSearchParams(params)}`
  const resp = await fetch(url)
  return resp.json()
}

/**
 * @function 调用接口，判断文件是否上传过
 */
const verifyFile = async (fileNameHash) => {
  return fetchApi({ fileNameHash })
}

/**
 * @function 调用接口，上传文件
 */
const uploadChunk = async (formData,curController) => {
  try {
    const resp = await fetch(`${config.api}/uploadChunk`, {
      method: "POST",
      body: formData,
      signal: curController.signal
    });
    return resp.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      // 处理取消请求的情况
      console.log('请求已被取消');
    } else {
      // 处理其他类型的错误
      throw error;
    }
  }
}

/**
 * @function 调用接口，通知上传完毕，进行合并
 */
const mergeChunks = async () => {
  const formData = new FormData();

  formData.append("fileNameHash", filehash);
  formData.append("fileType", checkedFile.type);
  formData.append("chunkCount", chunksList.length);

  const resp = await fetch(`${config.api}/mergeChunks`, {
    method: "POST",
    body: formData
  })
  checkedFile = null
  return resp.json()
}
