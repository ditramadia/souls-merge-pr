let mergeButton;

const MERGE_TEXTS = ["Squash and merge", "Merge pull request", "Rebase and merge"]; // For testing
// const MERGE_TEXTS = ["Confirm squash and merge", "Confirm merge", "Confirm rebase and merge"]; // For production

const displayMessage = () => {
  console.log("PR MERGED")

  const overlay = document.createElement("div")
  const textbox = document.createElement("div")
  const text = document.createElement("span")
  document.append()
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
  // getMergeButtonIfAvailable()
  // assignMergeButtonListener()

  displayMessage()
})

