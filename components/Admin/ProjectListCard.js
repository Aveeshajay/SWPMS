import "../Misc/LinkButton";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .card {
      display: grid;
      grid-template-columns: 5fr 5fr;
      align-items: center;
      background-color: white;
      padding: 20px;
      margin-top: 20px;
      width: 95%;
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      font-family: 'KotoriRose';
    }

    .btns {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

  </style>

  <div class="card">
    <div class="project-title"></div>
    <div class="btns">
    </div>
  </div>
`;

class ProjectListCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // this._btn = this.shadowRoot.querySelector("link-button");
    this._title = this.shadowRoot.querySelector(".project-title");
  }

  // set link(val) {
  //   this._btn.setAttribute("pathname", val);
  // }

  set title(val) {
    this._title.textContent = val;
  }

  // set hardLink(val) {
  //   this._btn.setAttribute("hardLink", val);
  // }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector("link-button");
  }
}
customElements.define("project-list-card", ProjectListCard);
