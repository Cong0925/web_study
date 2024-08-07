importScripts("spark-md5.min.js");

const routers = {
  /**
 * @function 获取文件hash
 * @param {ReadableStream<Uint8Array>} filestream .
 */
  getFileHash: async (filestream) => {
    const spark = new SparkMD5.ArrayBuffer();
    for await (const chunk of filestream.values()) {
      spark.append(chunk)
    }
    const hash = spark.end();
    return hash
  },
  // 其他方法
}

self.addEventListener(
  "message",
  async (event) => {
    console.log('event.data', event.data);

    const { type, body } = event.data
    try {
      const resp = await routers[type](body);
      self.postMessage({ type, resp });
    } catch (error) {
      self.postMessage({ type, error });
    }
  }
);

