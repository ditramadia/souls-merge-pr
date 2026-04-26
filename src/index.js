let sound;

window.addEventListener("load", () => {
  sound = loadSoundEffect();

  const workflows = [];

  workflows.push(new MergePRWorkflow("Great PR Felled"));
  workflows.push(new CreatePRWorkflow("New PR Discovered"));

  workflows.forEach((w) => {
    w.start();
  });
});
