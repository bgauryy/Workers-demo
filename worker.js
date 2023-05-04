this.onmessage = () => {
  executeHeavyTask(() => {
    postMessage("done execution iteration from worker");
  });
};

function executeHeavyTask(cb) {
  for (let i = 0; i < 10000; i++) {
    Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
  }
  cb();
  setTimeout(executeHeavyTask.bind(this, cb), 100);
}
