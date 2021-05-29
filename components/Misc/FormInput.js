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
    <input />
  </div>
`;

class FormInput extends HTMLElement {
  static get observedAttributes() {
    return ["type", "value", "label", "name", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$label = this.shadowRoot.querySelector("label");
    this.$input = this.shadowRoot.querySelector("input");
  }

  connectedCallback() {
    this.$input.addEventListener("input", this.updateValue);
  }

  disconnectedCallback() {
    this.$input.removeEventListener("input", this.updateValue);
  }

  updateValue = (e) => {
    this.value = e.target.value;
  };

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "label":
        this.$label.innerText = newVal;
        break;
      case "type":
        this.$input.setAttribute("type", newVal);
        if (newVal === "textarea") {
          this.$input.setAttribute("rows", 5);
        }
        break;
      case "name":
        this.$input.setAttribute("name", newVal);
        break;
      case "disabled":
        this.$input.setAttribute("disabled", newVal);
        break;
      case "value":
        if (newVal) {
          this.$input.value = newVal;
        } else {
          this.$input.value = "";
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

  get disabled() {
    return this.getAttribute("disabled");
  }

  set disabled(val) {
    this.setAttribute("disabled", val);
  }
}
customElements.define("form-input", FormInput);
