import "../ChooseFile.js";
import "../Misc/LinkButton";
const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .card {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      align-items: center;
      background-color:#ccccff;
      padding: 20px;
      margin-top: 20px;
      margin-left: 20px;
      width: 90%;
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      font-family: 'KotoriRose';
    }

    .project-title, .project-date {
      /* font-weight: bold; */
      font-family: 'KotoriRoseBold';
      font-size: 1.1rem;
    }

  </style>

  <div class="card">
   
    <div>
      <span> Released Version </span>
      <div class="project-title"></div>
    </div>
    <div>
      <span> Released On </span>
      <div class="project-date"></div>
    </div>
    <div>
      <a href="#">View Changelog</a>
    </div>
    <div>
    <choose-file  name="Upload Changelog" color="var(--lightblue)"></choose-file>
    </div>
  </div>
`;

class ReleasePageCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // const btn = this.shadowRoot.querySelector("link-button");
    // btn.setAttribute("pathname", this.getAttribute("link"));

    const name = this.shadowRoot.querySelector(".project-title");
    name.textContent = this.getAttribute("name");

    const title = this.shadowRoot.querySelector(".project-date");
    title.textContent = this.getAttribute("date");
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector("link-button");
  }
}
customElements.define("release-page-card", ReleasePageCard);
