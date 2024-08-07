import { config } from "../config/index.js"
import { WorkerPool } from "./workerPool.js"
import { verifyFile,uploadChunk,mergeChunks } from "./api.js"


// const { config } = await import("../config/index.js")

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


/** 
 * @description 选择的文件
 * @type {File | null} . 
*/
let checkedFile = null
let filehash = null
let chunksList = []

let controller = new AbortController();

const request = {
  getFileHash: async (resp) => {
    filehash = resp
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
  },
  // ...其他方法
}

const workersPool = new WorkerPool(async (event) => {
  request[event.data.type](event.data.resp)
})

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

uploadBunttonDom.addEventListener('click', function () {
  if (!checkedFile) return
  uploadBunttonDom.innerHTML = '上传中'
  messageDom.innerHTML = '0/**  正在解析文件!'
  const stream = checkedFile.stream()
  const data = {
    type: 'getFileHash',
    body: stream
  }
  const getFileHash_worker = workersPool.next()
  getFileHash_worker.postMessage(data, [stream])
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
    let chunk = file.slice(start, start + config.chunkSize)
    start += config.chunkSize
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
    
    const spark = new SparkMD5.ArrayBuffer();
    spark.append(buffer);
    const hash = spark.end();
    console.log(`hash of ${index}/${chunkNum} is ${hash}`)
    
    const formData = new FormData();
    formData.append(`${chunkIndex}_${hash}`, chunk, filehash);

    const uploadChunkRes = await uploadChunk(formData, curController)
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

function clearData() {
  checkedFile = null
  filehash = null
  chunksList = []
  progressDom.value = 0
  progressDom.max = 0
  messageDom.innerHTML = ''
}
