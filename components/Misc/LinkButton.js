import { go } from "../../../lib.js";

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

  <button></button>
`;

class LinkButton extends HTMLElement {
  static get observedAttributes() {
    return ["name", "color", "hardLink", "pathname"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$btn = this.shadowRoot.querySelector("button");

    const color = this.getAttribute("color");
    if (color) {
    }

    const hardLink = this.getAttribute("hardLink");
    if (hardLink) {
      this._hardLink = hardLink === "true";
    }
  }
  connectedCallback() {
    this.addEventListener("click", this.handleClick);
  }

  handleClick() {
    if (this.hardLink === "true") {
      window.location = this.pathname;
    } else {
      if (this.pathname) {
        go(this.pathname);
      }
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "name") {
      this.$btn.innerText = newVal;
    } else if (name === "color") {
      this.$btn.style.backgroundColor = newVal;
    }
  }

  get pathname() {
    return this.getAttribute("pathname");
  }

  get name() {
    return this.getAttribute("name");
  }

  get color() {
    return this.getAttribute("color");
  }

  get hardLink() {
    return this.getAttribute("hardLink");
  }

  set hardLink(val) {
    this.setAttribute("hardLink", val);
  }

  set color(val) {
    this.setAttribute("color", val);
  }

  set name(val) {
    this.setAttribute("name", val);
  }

  set pathname(val) {
    this.setAttribute("pathname", val);
  }
}
customElements.define("link-button", LinkButton);
