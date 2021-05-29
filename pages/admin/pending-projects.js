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
      <h1 class="title">Pending Projects</h1>
      <div id="projects">
        <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      </div>
    </div>
  </admin-layout>
`;

class PendingProjects extends HTMLElement {
  getProjects = async () => {
    const res = await axios.get(`${api}/project/get-pending-projects`);
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
      let label;
      let buttons;
      if (statusId === 2) {
        buttons = document.createElement("choose-file");
        buttons.name = "Upload & Send the Agreement";
        buttons.color = "var(--orange)";
        buttons.shadowRoot.querySelector("input").onchange = (e) =>
          this.handleUpload(e, project.id);
        label = `<status-label block="true" text="Agreement not sent" color="var(--pink)"></status-label>`;
      } else if (statusId === 4) {
        buttons = document.createElement("link-button");
        buttons.name = "View Agreement";
        buttons.color = "var(--lightblue)";
        buttons.hardLink = true;
        buttons.pathname = `${api}${project.agreement_path}`;
        label = `<status-label block="true" text="Agreement sent" color="var(--lightblue)"></status-label>`;
      } else if (statusId === 5) {
        buttons = document.createElement("div");
        buttons.style.textAlign = "center";
        const link = document.createElement("link-button");
        link.name = "View Signed Agreement";
        link.color = "var(--web3)";
        link.hardLink = true;
        link.pathname = `${api}${project.signed_agreement_path}`;
        buttons.appendChild(link);
        const devBtn = document.createElement("link-button");
        devBtn.name = "Start Development";
        devBtn.color = "var(--web2)";
        devBtn.onclick = (e) => this.handleStartDev(e, project.id);
        buttons.appendChild(devBtn);
        label = `<status-label block="true" text="Agreement confirmed" color="var(--lightgreen)"></status-label>`;
      }

      card.shadowRoot
        .querySelector(".btns")
        .insertAdjacentHTML("beforeend", label);
      card.shadowRoot.querySelector(".btns").appendChild(buttons);
      wrapper.appendChild(card);
    });
  };

  handleStartDev = async (e, projectId) => {
    try {
      const res = await axios.post(`${api}/project/update-project-status`, {
        projectId,
        statusId: 6,
      });
      alert(res.data.msg);
      go(`/admin/project/${projectId}`);
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
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

customElements.define("pending-projects", PendingProjects);
