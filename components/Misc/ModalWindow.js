const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    :host {
      display: none; 
      position: fixed; 
      z-index: 1; 
      padding-top: 100px; 
      left: 0;
      top: 0;
      width: 100%; 
      height: 100%; 
      overflow: auto; 
      background-color: rgb(0,0,0); 
      background-color: rgba(0,0,0,0.4); 
      font-family: 'KotoriRoseBold';
    }

    .modal-header {
      padding: 2px 16px;
      background-color: var(--admin-main);
      border-bottom: 2px solid orange;
      color: white;
    }

    .modal-body {padding: 2px 16px;}

    .modal-footer {
      padding: 2px 16px;
      background-color: var(--admin-main);
      color: white;
    }

    .modal-content {
      position: relative;
      background-color: #fefefe;
      margin: auto;
      padding: 0;
      border: 1px solid #888;
      width: 80%;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
      animation-name: animatetop;
      animation-duration: 0.4s
    }

    .close {
      font-weight: bold;
      font-size: 1.4rem;
      float: right;
      cursor: pointer;
      backgrou
    }

    @keyframes animatetop {
      from {top: -300px; opacity: 0}
      to {top: 0; opacity: 1}
    }
  </style>

  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2 class="modal-title"></h2>
    </div>
    <div class="modal-body">
      <slot />
    </div>
  </div>
`;

class ModalWindow extends HTMLElement {
  static get observedAttributes() {
    return ["title", "hidden"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$header = this.shadowRoot.querySelector(".modal-title");
    this.$closeBtn = this.shadowRoot.querySelector(".close");
  }

  connectedCallback() {
    this.$closeBtn.addEventListener("click", this.handleClose);
  }

  handleClose = () => {
    this.hidden = true;
  };

  get hidden() {
    return this.getAttribute("hidden");
  }

  set hidden(val) {
    this.setAttribute("hidden", val);
  }

  get title() {
    return this.getAttribute("title");
  }

  set title(val) {
    this.setAttribute("title", val);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "title") {
      this.$header.innerText = newVal;
    } else if (name === "hidden") {
      const val = newVal === "true";
      if (val === true) {
        this.style.display = "none";
      } else {
        this.style.display = "block";
      }
    }
  }
}

customElements.define("modal-window", ModalWindow);
