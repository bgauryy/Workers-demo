(() => {
    let run = false;
    const button = document.getElementById("heavyWorkBtn");
    const p = document.getElementById("mainTaskP");
    let c = 0;
    p.innerHTML = `Main tasks: ${c++}`;
  
    button.onclick = () => {
      run = !run;
      if (run) {
        button.innerText = "stop heavy work on main thread";
        executeHeavyTask();
      } else {
        button.innerText = "start heavy work on main thread";
      }
    };
  
    function executeHeavyTask() {
      for (let i = 0; i < 10000; i++) {
        if (!run) {
          break;
        }
        Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
      }
      p.textContent = `Main tasks: ${c++}`;
      if (run) {
        setTimeout(executeHeavyTask, 100);
      }
    }
  })();
  