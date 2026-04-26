const CREATE_STRINGS = ["Create pull request"];
const CREATE_MESSAGE = "PR CREATED";

class MergePRWorkflow extends Workflow {
  #BUTTON_STRINGS = [
    "Confirm merge",
    "Confirm squash and merge",
    "Confirm rebase and merge",
  ];

  #startObserver() {
    const container =
      document.querySelector('[class^="prc-PageHeader-PageHeader"]') ||
      document.body;
    if (!container) return;

    const observer = new MutationObserver((_, obs) => {
      const mergedLabel = document.querySelector(
        'span[data-status="pullMerged"]',
      );

      if (mergedLabel) {
        displayMessage(this.message);
        obs.disconnect();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => observer.disconnect(), 30000);
  }

  #addClickListener() {
    document.addEventListener("click", (e) => {
      const target = e.target;
      const targetText = target.textContent.trim();

      const isButton = target.closest("button");
      if (!isButton) return;

      const isMergeClick = this.#BUTTON_STRINGS.some((text) =>
        targetText.includes(text),
      );
      if (isMergeClick) {
        this.#startObserver();
        return;
      }
    });
  }

  constructor(message) {
    super(message);
  }

  start() {
    this.#addClickListener();
  }
}
