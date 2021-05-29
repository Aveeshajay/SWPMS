import { api } from "../../../config.js";
import axios from "../../../modules/axios.js";
import "../../components/Admin/ProjectStatusCard.js";
import "../../components/Misc/LoadingCircle.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
      .wrapper {
        /* display: grid; */
        /* grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr; */
        margin-top: 10%;
      }

  </style>
  <admin-layout>
      <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      <div class="wrapper">
      </div>
  </admin-layout>
`;

class AdminDashboard extends HTMLElement {
  getCounts = async () => {
    const res = await axios.get(`${api}/project/get-dashboard-counts`);
    return res.data;
  };

  addBoxes = async () => {
    const items = await this.getCounts();
    this.querySelector("loading-circle").remove();
    const wrapper = this.querySelector(".wrapper");
    wrapper.style.display = "grid";
    wrapper.style.gridTemplateColumns = "1fr 1fr 1fr";
    wrapper.style.gridTemplateRows = "1fr 1fr";

    items.forEach((item) => {
      const card = document.createElement("project-status-card");
      card.name = item.name;
      card.link = item.link;
      card.count = item.count;
      wrapper.appendChild(card);
    });
  };

  getProjects = async () => {
    const res = await axios.get(`${api}/project/get-inprogress-projects`);
    return res.data;
  };

  addItems = async () => {
    const items = await this.getProjects();
    this.querySelector("loading-circle").remove();
    const wrapper = this.querySelector(".wrapper");
    items.forEach((project) => {
      const card = document.createElement("project-list-card");
      card.title = project.name;
      const statusId = parseInt(project.status_id);
      let html;
      if (statusId === 6) {
        html = `
          <status-label block="true" text="Developers Not Assigned" color="var(--pink)"></status-label>
          <link-button name="View More" pathname="/admin/project/${project.id}" color="var(--lightblue)"></link-button>
        `;
      } else if (statusId === 7) {
        html = `<status-label block="true" text="Requirements Gathering" color="var(--lightgreen)"></status-label>
          <link-button name="View More" pathname="/admin/project/${project.id}" color="var(--lightblue)"></link-button>
        `;
      } else if (statusId === 8) {
        html = `<status-label block="true" text="Designing" color="var(--lightgreen)"></status-label>
          <link-button name="View More" pathname="/admin/project/${project.id}" color="var(--lightblue)"></link-button>
        `;
      } else if (statusId === 9) {
        html = `<status-label block="true" text="Development" color="var(--purple)"></status-label>
          <link-button name="View More" pathname="/admin/project/${project.id}" color="var(--lightblue)"></link-button>
        `;
      } else if (statusId === 10) {
        html = `<status-label block="true" text="Testing" color="var(--pink)"></status-label>
          <link-button name="View More" pathname="/admin/project/${project.id}" color="var(--lightblue)"></link-button>
        `;
      }

      card.shadowRoot
        .querySelector(".btns")
        .insertAdjacentHTML("beforeend", html);
      wrapper.appendChild(card);
    });
  };

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    const userType = sessionStorage.getItem("userType");
    if (userType === "ADMIN") {
      this.addBoxes();
    } else {
      this.addItems();
      // console.log(ele.shadowRoot.querySelector(".page_container"));
    }
  }
}

customElements.define("admin-dashboard", AdminDashboard);
