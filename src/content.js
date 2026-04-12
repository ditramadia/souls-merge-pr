let mergeButton;
let sound;

const MERGE_TEXTS = ["Squash and merge", "Merge pull request", "Rebase and merge"]; // For testing
// const MERGE_TEXTS = ["Confirm squash and merge", "Confirm merge", "Confirm rebase and merge"]; // For production

const displayMessage = () => {
  console.log("PR MERGED")

  const text = document.createElement("p")
  text.classList.add("ds-text")
  text.textContent = "PR MERGED"

  const textWrapper = document.createElement("div")
  textWrapper.classList.add("ds-text-wrapper")
  textWrapper.appendChild(text)

  const textbox = document.createElement("div")
  textbox.classList.add("ds-textbox")
  textbox.appendChild(textWrapper)

  const overlay = document.createElement("div")
  overlay.classList.add("ds-overlay")
  overlay.appendChild(textbox)

  sound.play();
  document.body.append(overlay)
}

const getMergeButtonIfAvailable = () => {

  const spans = document.querySelectorAll("span");
  console.log(spans.length)

  spans.forEach((span) => {
    if (MERGE_TEXTS.includes(span.textContent.trim())) {
      console.log("merge button found")
      mergeButton = span
    }
  })

}

const assignMergeButtonListener = () => {

  if (!mergeButton) return

  mergeButton.addEventListener("click", displayMessage)
}

document.addEventListener("click", () => {

  if (mergeButton) return

  getMergeButtonIfAvailable()
  assignMergeButtonListener()
})

window.addEventListener("load", () => {
  // On load
  sound = new Audio('sound-effect.m4a');
  getMergeButtonIfAvailable()
  assignMergeButtonListener()
})

