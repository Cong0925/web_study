export class WorkerPool {

  workerUrl = new URL("./getfilehash.worker.js", import.meta.url);
  _workers = [];
  _maxWorkers = 16;
  _index = 0

  next() {
    const worker = this._workers[this._index++]
    // overflow
    if (this._index >= this._workers.length) {
      this._index = 0
    }
    return worker
  }

  constructor(handler) {
    for (let index = 0; index < this._maxWorkers; index++) {
      const name = `Worker#${index}`;
      const worker = new Worker(this.workerUrl, { name, type: "classic" });
      worker.addEventListener("message", handler)
      this._workers.push(worker);
    }
  }
}