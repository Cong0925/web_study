
const fetchApi = async (params) => {
  const url = `${config.api}/verifyFile?${new URLSearchParams(params)}`
  const resp = await fetch(url)
  return resp.json()
}
/**
 * @function 调用接口，判断文件是否上传过
 */
export const verifyFile = async (fileNameHash) => {
  return fetchApi({ fileNameHash })
}

/**
 * @function 调用接口，上传文件
 */
export const uploadChunk = async (formData, curController) => {
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
export const mergeChunks = async () => {
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
