const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    label {
      display: block;
      margin-bottom: 5px;
      font-family: 'KotoriRose';
    }

    .form-input {
      margin-bottom: 10px;
      padding: 5px;
    }

    input {
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.12);
      line-height: 1.2;
      border-radius: 5px;
      padding: 10px 5px;
      border: 1px solid #f2f2f2;
      width: 100%;
    }

    input:focus {
      outline: 0;
    }
  </style>

  <div class="form-input">
    <label></label>
    <select>
    </select>
  </div>
`;

class FormSelect extends HTMLElement {
  static get observedAttributes() {
    return ["value", "label", "name"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$label = this.shadowRoot.querySelector("label");
    this.$select = this.shadowRoot.querySelector("select");
  }

  connectedCallback() {
    this.$select.addEventListener("change", this.updateValue);
  }

  disconnectedCallback() {
    this.$select.removeEventListener("change", this.updateValue);
  }

  updateValue = (e) => {
    this.value = e.target.value;
  };

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "label":
        this.$label.innerText = newVal;
        break;
      case "name":
        this.$select.setAttribute("name", newVal);
        break;
      case "value":
        if (newVal) {
          this.$select.setAttribute("value", newVal);
        }
        break;
    }
  }

  get label() {
    return this.getAttribute("label");
  }

  set label(val) {
    this.setAttribute("label", val);
  }

  get type() {
    return this.getAttribute("type");
  }

  set type(val) {
    this.setAttribute("type", val);
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(val) {
    this.setAttribute("value", val);
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(val) {
    this.setAttribute("name", val);
  }
}
customElements.define("form-select", FormSelect);
