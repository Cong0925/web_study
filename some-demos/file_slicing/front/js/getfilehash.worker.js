importScripts("spark-md5.min.js");

/**
 * @function 获取文件hash
 * @param {ReadableStream<Uint8Array>} filestream .
 */
const getFileHash = async (filestream) => {
  const spark = new SparkMD5.ArrayBuffer();
  for await (const chunk of filestream.values()) {
    spark.append(chunk)
  }

  const hash = spark.end();
  return hash
}

self.addEventListener("message", async (event) => {
  const fileNameHash = await getFileHash(event.data)
  self.postMessage({ filehash: fileNameHash })
})
