const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .submit-btn {
      /* width: 100%; */
      margin: 10px 5px;
      padding: 7px;
      background-color: #bd59d4;
      border: 0;
      outline: 0;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
      font-family: 'KotoriRoseBold';
    }
  </style>

  <input type="submit" value="Submit" class="submit-btn" />
`;

class SubmitButton extends HTMLElement {
  static get observedAttributes() {
    return ["loading", "name", "color", "width"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$input = this.shadowRoot.querySelector("input");
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(val) {
    this.setAttribute("name", val);
  }

  get color() {
    return this.getAttribute("color");
  }

  set color(val) {
    this.setAttribute("color", val);
  }

  get width() {
    return this.getAttribute("width");
  }

  set width(val) {
    this.setAttribute("width", val);
  }

  get loading() {
    return this.getAttribute("loading");
  }

  set loading(val) {
    this.setAttribute("loading", val);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "name":
        this.$input.setAttribute("value", newVal);
        break;
      case "color":
        this.$input.style.backgroundColor = newVal;
        break;
      case "width":
        this.$input.style.width = newVal;
        break;
      case "loading":
        const val = newVal === "true";
        this.$input.disabled = val;
        if (val === true) {
          this.$input.setAttribute("value", `Submitting......`);
        } else {
          this.$input.setAttribute("value", this.name);
        }
        break;

      default:
        break;
    }
  }
}
customElements.define("submit-button", SubmitButton);
