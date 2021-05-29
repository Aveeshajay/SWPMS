import { getProjectId } from "../../../lib.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    ul {
      list-style: none;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    a {
      text-decoration: none;
      color: white;
      font-family: 'KotoriRoseBold';
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    li {
        padding: 10%;
    }

    div {
      background-color: #252525;
      height: 100%; 
      width: 100%;
    }
    a:hover{
        color:yellow;
    }
    
  </style>
  <div>
    <ul>
    </ul>
  </div>    
`;

class AdminSidebar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const ul = this.shadowRoot.querySelector("ul");
    const pathname = window.location.pathname;
    const userType = sessionStorage.getItem("userType");
    if (pathname.substring(0, 15) === "/admin/project/") {
      const id = getProjectId();

      ul.innerHTML = /*html*/ `
        <li><a href="/admin">Dashboard</a></li>
        <li><a href="/admin/project/${id}">Project Dashboard</a></li>
        <li><a href="/admin/project/${id}/requirements">Requirements</a></li>
        <li><a href="/admin/project/${id}/designs">Designs</a></li>
        <li><a href="/admin/project/${id}/devtasks">Development Tasks</a></li>
        <li><a href="/admin/project/${id}/tests">Test Cases</a></li>
        <li><a href="/admin/project/${id}/releases">Release</a></li>
        <li><a href="/admin/project/${id}/maintenance">Maintenance</a></li>
      `;
    } else {
      if (userType === "ADMIN") {
        ul.innerHTML = /*html*/ `
          <li><a href="/admin">Dashboard</a></li>
          <li><a href="/admin/employeepage">Employees</a></li>
          <li><a href="/admin/clientSpage">Clients</a></li>
          <li><a href="/admin/reportspage">Reports</a></li>
          <li><a href="/admin/financepage">Finance</a></li>
        `;
      }
    }
  }
}

customElements.define("admin-sidebar", AdminSidebar);
