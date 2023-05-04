const ANIMATION_CONF = {
  conf: {
    duration: 2500,
    iterations: Number.POSITIVE_INFINITY,
  },
  frames: [
    {
      transform: "translateY(0)",
    },
    {
      transform: "translateY(400px)",
    },
  ],
};

function runAnimation() {
  new Animation(
    new KeyframeEffect(
      document.getElementById("shapeMain"),
      ANIMATION_CONF.frames,
      ANIMATION_CONF.conf
    ),
    document.timeline
  ).play();
}

async function runAnimationWorklet() {
  await CSS.animationWorklet.addModule("./worklet_animation.js");
  //eslint-disable-next-line
  new WorkletAnimation(
    "customAnimation",
    new KeyframeEffect(
      document.getElementById("shape"),
      ANIMATION_CONF.frames,
      ANIMATION_CONF.conf
    ),
    document.timeline,
    { factor: 0.5 }
  ).play();
}

async function runPaintWorklet() {
  await CSS.paintWorklet.addModule("worklet_paint.js");
}

runAnimation();
runAnimationWorklet();
runPaintWorklet();
