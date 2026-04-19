let sound;
const SOUND_EFFECT_URL = "assets/sound-effect.mp3";

const MERGE_STRINGS = [
  "Confirm merge",
  "Confirm squash and merge",
  "Confirm rebase and merge",
];
const CREATE_STRINGS = ["Create pull request"];

const MERGE_MESSAGE = "PR MERGED";
const CREATE_MESSAGE = "PR CREATED";

const loadSoundEffect = () => {
  try {
    sound = new Audio(chrome.runtime.getURL(SOUND_EFFECT_URL));
  } catch (error) {
    console.error("sound effect not loaded");
  }
};

const displayMessage = (msg) => {
  const text = document.createElement("p");
  text.classList.add("souls-text");
  text.textContent = msg;

  const textWrapper = document.createElement("div");
  textWrapper.classList.add("souls-text-wrapper");
  textWrapper.appendChild(text);

  const textbox = document.createElement("div");
  textbox.classList.add("souls-textbox");
  textbox.appendChild(textWrapper);

  const overlay = document.createElement("div");
  overlay.classList.add("souls-overlay");
  overlay.appendChild(textbox);

  sound.play();
  document.body.append(overlay);

  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 6000);
};

const startMergeObserver = () => {
  console.log("observer started");

  const container =
    document.querySelector('[class^="prc-PageHeader-PageHeader"]') ||
    document.body;
  if (!container) return;

  console.log("pr header found");

  const observer = new MutationObserver((_, obs) => {
    console.log("observer started");

    const mergedLabel = document.querySelector(
      'span[data-status="pullMerged"]',
    );

    if (mergedLabel) {
      displayMessage(MERGE_MESSAGE);
      obs.disconnect();
    }
  });

  observer.observe(container, {
    childList: true,
    subtree: true,
  });

  setTimeout(() => observer.disconnect(), 30000);
};

document.addEventListener("click", (e) => {
  const target = e.target;
  const targetText = target.textContent.trim();

  const isButton = target.closest("button");
  if (!isButton) return;
  console.log("button clicked");

  const isMergeClick = MERGE_STRINGS.some((text) => targetText.includes(text));
  if (isMergeClick) {
    console.log("merge button clicked");
    startMergeObserver();
    return;
  }
});

window.addEventListener("load", () => {
  console.log("page loaded, setting up...");

  loadSoundEffect();
  console.log("sound effect loaded");
});
