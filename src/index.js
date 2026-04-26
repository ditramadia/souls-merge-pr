let sound;

// document.addEventListener("click", (e) => {
//   const target = e.target;
//   const targetText = target.textContent.trim();
//
//   const isButton = target.closest("button");
//   if (!isButton) return;
//
//   const isMergeClick = MERGE_STRINGS.some((text) => targetText.includes(text));
//   if (isMergeClick) {
//     startMergeObserver();
//     return;
//   }
// });

window.addEventListener("load", () => {
  sound = loadSoundEffect();

  const workflows = [];

  workflows.push(new MergePRWorkflow("Great PR Felled"));

  workflows.forEach((w) => {
    w.start();
  });
});
