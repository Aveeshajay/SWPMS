import "../../components/Client/ClientProjectCard.js";
import "../../components/Misc/LinkButton.js";


class ClientProjectsPage extends HTMLElement {
  connectedCallback() {
    const projects = [
      { id: 1, name: "Mobile Application", status: "Pending" },
      { id: 2, name: "Election System", status: "In Progress" },
      { id: 3, name: "E-Commerce Application", status: "Cancelled" },
      { id: 4, name: "Cake Shop Landing Page", status: "Completed" },
    ];
    this.innerHTML = /*html*/ `
    <style>
      .title {
        float: left;
        text-transform: uppercase;
        font-family: 'KotoriRoseBold';
      }

      .page_container{
        margin-top: 50px;
      }

      .btn {
        float: right;
      }

    </style>

    <client-layout>
      <div class="page_container">
        <h1 class="title"> My Projects</h1>
        <div class="btn">
          <link-button name="+ Request New Project" color="var(--lightgreen)" pathname="/client/requestproject"></link-button>
        </div>
        <div class="clearfix"></div>
        ${projects
          .map(
            (p) =>
              `<client-project-card projectname="${p.name}" status="${p.status}" link="/client/project/${p.id}"></client-project-card>`
          )
          .join("")}
      </div>
    </client-layout>
    `;
  }
}

customElements.define("client-projects-page", ClientProjectsPage);
