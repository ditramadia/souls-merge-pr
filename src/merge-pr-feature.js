const MERGE_STRINGS = [
  "Confirm merge",
  "Confirm squash and merge",
  "Confirm rebase and merge",
];
const CREATE_STRINGS = ["Create pull request"];

const MERGE_MESSAGE = "PR MERGED";
const CREATE_MESSAGE = "PR CREATED";

const startMergeObserver = () => {
  const container =
    document.querySelector('[class^="prc-PageHeader-PageHeader"]') ||
    document.body;
  if (!container) return;

  const observer = new MutationObserver((_, obs) => {
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
