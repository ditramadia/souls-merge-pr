let sound;
const SOUND_EFFECT_URL = "assets/sound-effect.mp3";

const MERGE_STRINGS = ["Confirm merge", "Confirm squash and merge", "Confirm rebase and merge"];
const CREATE_STRINGS = ["Create pull request"];

const MERGE_MESSAGE = "PR MERGED";
const CREATE_MESSAGE = "PR CREATED";

const loadSoundEffect = () => {
  try {
    sound = new Audio(chrome.runtime.getURL(SOUND_EFFECT_URL
    ));
  } catch (error) {
    console.error("sound effect not loaded")
  }
}

const displayMessage = (msg) => {

  const text = document.createElement("p")
  text.classList.add("souls-text")
  text.textContent = msg

  const textWrapper = document.createElement("div")
  textWrapper.classList.add("souls-text-wrapper")
  textWrapper.appendChild(text)

  const textbox = document.createElement("div")
  textbox.classList.add("souls-textbox")
  textbox.appendChild(textWrapper)

  const overlay = document.createElement("div")
  overlay.classList.add("souls-overlay")
  overlay.appendChild(textbox)

  sound.play();
  document.body.append(overlay)

  setTimeout(() => {
    document.body.removeChild(overlay)
  }, 6000)
}

document.addEventListener("click", (e) => {
  const target = e.target;
  const targetText = target.textContent.trim()

  const isButton = target.closest('button')
  if (!isButton) return
  // console.log("button clicked")

  const isMergeClick = MERGE_STRINGS.some(text =>
    targetText.includes(text)
  );
  if (isMergeClick) {
    // console.log("merge button clicked")
    displayMessage(MERGE_MESSAGE)
    return
  }

  // const isCreateClick = CREATE_STRINGS.some(text =>
  //   targetText.includes(text)
  // );
  // if (isCreateClick) {
  //   displayMessage(CREATE_MESSAGE)
  //   return
  // }
})

window.addEventListener("load", () => {
  // console.log("page loaded, setting up...")

  loadSoundEffect()
  // console.log("sound effect loaded")
})
