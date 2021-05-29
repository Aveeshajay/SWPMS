const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    button {
      background-color: var(--lightblue);
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.5;
      border-radius: 2px;
      font-family: 'KotoriRose';
      cursor: pointer;
      color: #fff;
    }
  </style>

  <button>Go Back</button>
`;

class GoBackButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$btn = this.shadowRoot.querySelector("button");
  }
  connectedCallback() {
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  handleClick() {
    window.history.back();
  }
}
customElements.define("go-back-button", GoBackButton);
