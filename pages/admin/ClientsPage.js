import "../../components/Admin/ClientProfileCard.js";
class ClientsPage extends HTMLElement {
  connectedCallback() {
    const projects = [
      { id: 1, name: "Client 1" },
      { id: 2, name: "Client 2" },
      { id: 3, name: "Client 3" },
      { id: 4, name: "Client 4" },
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

    <admin-layout>
      <div class="page_container">
        <h1 class="title">Clients</h1>
        <div class="clearfix"></div>
        ${projects
          .map(
            (p) =>
              `<client-profile-card projectname="${p.name}"  link="/admin/clientdetailspage"></client-profile-card>`
          )
          .join("")}
      </div>
    </admin-layout>
    `;
  }
}

customElements.define("clients-page", ClientsPage);
