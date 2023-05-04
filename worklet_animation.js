//eslint-disable-next-line
registerAnimator(
  "customAnimation",
  class {
    animate(currentTime, effect) {
      //Regular animation
      effect.localTime = currentTime;
    }
  }
);
