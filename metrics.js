const el = document.getElementById("requestAnimationFrameP");
const ANIMATION_CHECK_INTERVAL = 250;
const MONITORING_DELAY = 250;

monitorAnimationRate();

function monitorAnimationRate() {
  startMonitoring(ANIMATION_CHECK_INTERVAL, (val) => {
    el.innerText = `Animation Frame Rate: ${val.toFixed(2)}`;
    setTimeout(monitorAnimationRate, MONITORING_DELAY);
  });
}

function startMonitoring(timeout, cb) {
  let arr = [];
  let last = Date.now();
  let isRunning = true;

  loop();
  setTimeout(() => {
    isRunning = false;
  }, timeout);

  function loop() {
    requestAnimationFrame(() => {
      const now = Date.now();
      arr.push(now - last);
      last = now;
      if (isRunning) {
        loop();
      } else if (arr.length > 1) {
        arr = arr.splice(1);
        const average = arr.reduce((last, curr) => last + curr) / arr.length;
        cb(average);
      }
    });
  }
}
