import { api } from "../../../config.js";
import { go } from "../../../lib.js";
import axios from "../../../modules/axios.js";
import "../../components/Admin/ProjectListCard.js";
import "../../components/GoBackButton.js";
import "../../components/Misc/LinkButton.js";
import "../../components/Misc/StatusLabel.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .title {
      /* float: left; */
      text-transform: uppercase;
      font-family: 'KotoriRoseBold';
      margin-bottom: 20px;
      margin-top: 20px;
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
      <link-button name="Go Back" pathname="/admin"></link-button>
      <h1 class="title">Inprogress Projects</h1>
      <div id="projects">
        <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      </div>
    </div>
  </admin-layout>
`;

class InprogressProjects extends HTMLElement {
  getProjects = async () => {
    const res = await axios.get(`${api}/project/get-inprogress-projects`);
    return res.data;
  };

  addItems = async () => {
    const items = await this.getProjects();
    this.querySelector("loading-circle").remove();
    const wrapper = this.querySelector("#projects");
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

  handleUpload = async (e, projectId) => {
    const btn = e.target;
    btn.loading = true;

    try {
      const data = new FormData();
      const file = btn.files[0];
      data.append("file", file);
      const pathRes = await axios.post(
        `${api}/project/upload-agreement`,
        data,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      const filePath = pathRes.data.path;
      const res = await axios.post(`${api}/project/update-agreement-path`, {
        projectId,
        filePath,
      });
      alert(res.data.msg);
      go("/admin/pending");
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
    btn.loading = false;
  };

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.addItems();
  }
}

customElements.define("inprogress-projects", InprogressProjects);
