import "../Misc/LinkButton";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .card {
      display: grid;
      grid-template-columns: 4fr 1fr 1fr;
      align-items: center;
      background-color: white;
      padding: 20px;
      margin-top: 20px;
      width: 95%;
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      font-family: 'KotoriRose';
    }
  </style>

  <div class="card">
    <div class="project-title"></div>
    <div class="project-status"></div>
    <div>
      <link-button name="View More"></link-button>
    </div>
  </div>
`;

class ClientProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const btn = this.shadowRoot.querySelector("link-button");
    btn.setAttribute("pathname", this.getAttribute("link"));

    const title = this.shadowRoot.querySelector(".project-title");
    title.textContent = this.getAttribute("projectname");

    const status = this.shadowRoot.querySelector(".project-status");
    status.textContent = this.getAttribute("status");
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector("link-button");
  }
}
customElements.define("client-project-card", ClientProjectCard);
