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
    
    <div>
      <link-button name="View Profile"></link-button><br>
    </div>
    <div>
      <link-button name="View Progress"></link-button><br>
    </div>
  </div>
`;

class AdminProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const btn = this.shadowRoot.querySelector("link-button");
    btn.setAttribute("pathname", this.getAttribute("link"));

    const title = this.shadowRoot.querySelector(".project-title");
    title.textContent = this.getAttribute("projectname");
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector("link-button");
  }
}
customElements.define("admin-project-card", AdminProjectCard);
