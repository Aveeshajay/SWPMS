const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>

  .loader {
    border: 4px solid transparent;
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 10px;
    height: 10px;
    margin-right: 5px;
    margin-left: 5px;
    -webkit-animation: spin 1.5s linear infinite; /* Safari */
    animation: spin 1.5s linear infinite;
    display: flex;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  </style>

  <div class="loader">
  </div>
`;

class LoadingCircle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const loader = this.shadowRoot.querySelector(".loader");
    loader.style.borderTop = `6px solid ${this.getAttribute("color")}`;

    const width = this.getAttribute("width");
    const height = this.getAttribute("height");
    const fullHeight = this.getAttribute("fullHeight");

    if (width) {
      loader.style.width = width;
    }

    if (height) {
      loader.style.height = height;
    }

    if (fullHeight) {
      this.style.display = "flex";
      this.style.alignItems = "center";
      this.style.justifyContent = "center";
      this.style.justifyContent = "center";
      this.style.height = "100%";
      this.style.width = "100%";
    }
  }
}
customElements.define("loading-circle", LoadingCircle);
