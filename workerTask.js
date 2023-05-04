(() => {
    const worker = new Worker("./worker.js");
    const p = document.getElementById("workerTaskP");
    let c = 0;
  
    p.innerHTML = `worker tasks: ${c++}`;
  
    document.getElementById("heavyWorkerBtn").onclick = () => {
      worker.postMessage("");
  
      worker.onmessage = (e) => {
        p.textContent = `worker tasks: ${c++}`;
        console.log("worker event", e);
      };
    };
  })();
  