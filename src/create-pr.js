class CreatePRWorkflow extends Workflow {
  #SESSION_KEY = "is_creating_pr";
  #BUTTON_STRINGS = ["Create pull request"];

  #isPending() {
    return sessionStorage.getItem(this.#SESSION_KEY);
  }

  #isPRPage() {
    return /^\/[^\/]+\/[^\/]+\/pull\/\d+/.test(window.location.pathname);
  }

  #addTurboListener() {
    document.addEventListener("turbo:load", () => {
      console.log("isPending:", isPending);
      console.log("isPRPage:", isPRPage);

      if (this.#isPending() && this.isPRPage()) {
        displayMessage(this.message);
        sessionStorage.removeItem(this.#SESSION_KEY);
      }
    });
  }

  #addClickListener() {
    document.addEventListener("click", (e) => {
      const target = e.target;
      const targetText = target.textContent.trim();

      const isButton = target.closest("button");
      if (!isButton) return;

      const isCreateClick = this.#BUTTON_STRINGS.some((text) =>
        targetText.includes(text),
      );
      if (isCreateClick) {
        sessionStorage.setItem(this.#SESSION_KEY, true);
        this.#addTurboListener();
        setTimeout(() => sessionStorage.removeItem(this.#SESSION_KEY), 30000);

        return;
      }
    });
  }

  constructor(message) {
    super(message);
  }

  start() {
    if (this.#isPending() && this.#isPRPage()) {
      displayMessage(this.message);
      sessionStorage.removeItem(this.#SESSION_KEY);
    } else {
      this.#addClickListener();
    }
  }
}
