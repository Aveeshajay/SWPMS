import "../../components/GoBackButton.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    * {
      font-family: "KotoriRose";
    }
      .wrapper {
        margin-top: 2%;
        background-color: #fff;
        height: 100vh;
        width: 100%;
        box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
        position: relative;
      }

      #title {
        position: absolute;
        top: -20;
        left: -20;
        background-color: var(--web2);
        color: #fff;
        text-transform: uppercase;
        padding: 20px;
        margin: 10px;
      }

      #project-name {
        text-align: center;
      }
      .mt-5 {
        margin-top: 20px;
      }

  </style>
  <div class="mt-5"></div>
  <go-back-button></go-back-button>
  <h1 id="project-name"></h1>
  <div class="wrapper">
    <h2 id="title"></h2>
    <slot />
  </div>
`;

class ProjectPageWrapper extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("#title").innerText = this.getAttribute(
      "title"
    );
    this.shadowRoot.querySelector(
      "#project-name"
    ).innerText = sessionStorage.getItem("project-name");
  }
}

customElements.define("project-page-wrapper", ProjectPageWrapper);
