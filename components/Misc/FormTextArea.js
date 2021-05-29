const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    label {
      display: block;
      margin-bottom: 5px;
      font-family: 'KotoriRose';
    }

    .form-textarea {
      margin-bottom: 10px;
      padding: 5px;
    }

    textarea {
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.12);
      line-height: 1.2;
      border-radius: 5px;
      padding: 10px 5px;
      border: 1px solid #f2f2f2;
      width: 100%;
    }

    textarea:focus {
      outline: 0;
    }
  </style>

  <div class="form-textarea">
    <label></label>
    <textarea></textarea>
  </div>
`;

class FormTextArea extends HTMLElement {
  static get observedAttributes() {
    return ["label", "name", "rows", "cols", "value"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$label = this.shadowRoot.querySelector("label");
    this.$textarea = this.shadowRoot.querySelector("textarea");
  }

  connectedCallback() {
    this.$textarea.addEventListener("input", this.updateValue);
  }

  disconnectedCallback() {
    this.$textarea.removeEventListener("input", this.updateValue);
  }

  updateValue = (e) => {
    this.value = e.target.value;
  };

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "label":
        this.$label.innerText = newVal;
        break;
      case "rows":
        this.$textarea.setAttribute("rows", newVal);
        break;
      case "cols":
        this.$textarea.setAttribute("cols", newVal);
        break;
      case "name":
        this.$textarea.setAttribute("name", newVal);
        break;
      case "value":
        if (newVal) {
          this.$textarea.innerText = newVal;
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

  get name() {
    return this.getAttribute("name");
  }

  set name(val) {
    this.setAttribute("name", val);
  }
  get rows() {
    return this.getAttribute("rows");
  }

  set rows(val) {
    this.setAttribute("rows", val);
  }
  get cols() {
    return this.getAttribute("cols");
  }

  set cols(val) {
    this.setAttribute("cols", val);
  }
  get value() {
    return this.getAttribute("value");
  }

  set value(val) {
    this.setAttribute("value", val);
  }
}
customElements.define("form-textarea", FormTextArea);
