// import { Router } from "../../../modules/router";
import { go } from "../../../lib.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .card {
      position: relative;
      padding: 20px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      transition: 0.3s;
      background-color: #fff;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10px;
      cursor: pointer;
      border-bottom: 4px solid orange;
    }

    .card:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }


    * {
      font-family: 'KotoriRoseBold';
    }

    h2 {
      text-transform: uppercase;
      text-align: center;
    }


  </style>

  <div class="card">
    <h2></h2>
    <h1 class="count"></h1>
  </div>
`;

class ProjectStatusCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._text = this.shadowRoot.querySelector("h2");
    this._count = this.shadowRoot.querySelector(".count");
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      go(this._link);
    });
  }

  set link(val) {
    this._link = val;
  }

  set name(val) {
    this._text.innerText = val;
  }

  set count(val) {
    this._count.innerText = val;
  }
}
customElements.define("project-status-card", ProjectStatusCard);
