const SOUND_EFFECT_URL = "assets/sound-effect.mp3";

const loadSoundEffect = () => {
  try {
    return new Audio(chrome.runtime.getURL(SOUND_EFFECT_URL));
  } catch (error) {
    console.error("sound effect not loaded");
    return null;
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
