const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .label {
      color: var(--lightblue);
      /* box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); */
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      font-weight: bold;
      /* line-height: 1.5; */
      border-radius: 2px;
      font-family: 'KotoriRoseBold';
      /* cursor: pointer; */
      /* color: #fff; */
      text-align: center;
      
    }
  </style>

  <span class="label"></span>
`;

class StatusLabel extends HTMLElement {
  static get observedAttributes() {
    return ["text", "color", "block"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$span = this.shadowRoot.querySelector(".label");
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "text") {
      this.$span.innerText = newVal;
    } else if (name === "color") {
      this.$span.style.color = newVal;
    } else if (name === "block") {
      this.$span.style.display = newVal === "true" ? "block" : "inline-block";
    }
  }

  get text() {
    return this.getAttribute("text");
  }

  set text(val) {
    this.setAttribute("text", val);
  }

  get color() {
    return this.getAttribute("color");
  }

  set color(val) {
    this.setAttribute("color", val);
  }

  get block() {
    return this.getAttribute("block");
  }

  set block(val) {
    this.setAttribute("block", val);
  }
}
customElements.define("status-label", StatusLabel);
