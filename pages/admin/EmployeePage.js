import "../../components/Admin/AdminProjectCard.js";
class EmployeePage extends HTMLElement {
  connectedCallback() {
    const projects = [
      { id: 1, name: "Emlpoyee 1" },
      { id: 2, name: "Emlpoyee 2" },
      { id: 3, name: "Emlpoyee 3" },
      { id: 4, name: "Emlpoyee 4" },
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
        <h1 class="title">Emloyees</h1>
        <div class="clearfix"></div>
        ${projects
          .map(
            (p) =>
              `<admin-project-card projectname="${p.name}"  link="/admin/empdetailspage"></admin-project-card>`
          )
          .join("")}
      </div>
    </admin-layout>

    `;
  }
}

customElements.define("employee-page", EmployeePage);
