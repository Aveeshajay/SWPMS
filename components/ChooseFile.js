import "../components/Misc/LoadingCircle.js";

const template = document.createElement("template");

template.innerHTML = /*html*/ `
  <style>
    .label {
      border: none;
      color: white;
      padding: 5px 5px;
      font-size: 14px;
      cursor: pointer;
      text-align:center;
      border-radius: 5px; 
      font-family: 'KotoriRoseBold';
      display:inline-flex;
      align-items: center;
    }
    </style>
    
    
    <input type="file" id="upload" hidden/>
    <label for="upload" class="label"></label>
    <div class="file_name"></div>
`;

class ChooseFile extends HTMLElement {
  static get observedAttributes() {
    return ["loading", "name", "color"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$label = this.shadowRoot.querySelector("label");
    this.$input = this.shadowRoot.querySelector("input");
  }

  connectedCallback() {
    this.$input.addEventListener("change", this.handleChange);
  }

  disconnectedCallback() {
    this.$input.removeEventListener("change", this.handleChange);
  }

  handleChange = () => {
    if (this.$input.files.length) {
      this.files = this.$input.files;
      this.shadowRoot.querySelector(
        "div"
      ).innerText = this.$input.files[0].name;
    }
  };

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "loading") {
      const val = newVal === "true";
      this.$input.disabled = val;
      if (val === true) {
        this.$label.innerHTML = `<loading-circle color="white"></loading-circle> Uploading...`;
      } else {
        this.$label.innerText = "Re-Upload";
      }
    } else if (name === "color") {
      this.$label.style.backgroundColor = newVal;
    } else if (name === "name") {
      this.$label.innerText = newVal;
    }
  }

  get loading() {
    return this.getAttribute("loading");
  }

  set loading(val) {
    this.setAttribute("loading", val);
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
}

customElements.define("choose-file", ChooseFile);
