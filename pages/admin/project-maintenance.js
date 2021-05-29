import { api } from "../../../config.js";
import { getProjectId } from "../../../lib.js";
import axios from "../../../modules/axios.js";
import "../../components/Admin/NotesList.js";
import "../../components/Admin/ProjectStatusCard.js";
import "../../components/Misc/LoadingCircle.js";
import "../../components/Misc/ProjectPageWrapper.js";
import "../../components/Misc/TableLayout.js";

const statusId = 11;
const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>

      .wrapper {
        margin-top: 2%;
        background-color: #fff;
        height: 100vh;
        width: 100%;
        box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      }

      .page_container{
        background-color: #eef1f5;
        width: 90%;
        margin: 0 auto;
      }
      #gantt-chart {
        padding: 200px;
        border: 3px solid var(--darkgray);
      }
      button {
        background-color: var(--lightblue);
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        border: 1px solid transparent;
        /* padding: 0.375rem 0.75rem; */
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 2px;
        font-family: 'KotoriRose';
        cursor: pointer;
        color: #fff;
        width:150px;
        margin-bottom: 20px;
        /* margin-left: 80%; */
      }
   

  </style>
  <admin-layout>
      <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      
      <project-page-wrapper class="mt-5" title="Project Maintenance">
          <br>
          <br>
          <br>
          <br>
          <br>
          <h3 class="pl-10 pb-4">Issues</h3>
          <div class = "page_container"></div>

        <div class="flex align-center p-10">
          <notes-list class="flex-1" statusid="${statusId}""></notes-list>
        </div>
      </project-page-wrapper>
  </admin-layout>
`;

class ProjectMaintenance extends HTMLElement {
  getProject = async () => {
    const id = getProjectId();
    const res = await axios.get(`${api}/project/get-project?id=${id}`);
    return res.data;
  };

  updateContent = async () => {
    const project = await this.getProject();
    this.querySelector("loading-circle").remove();
    this.$projectName.innerText = project.name;
    this.$startDate.innerText = project.start_date || "-";
    this.$endDate.innerText = project.end_date || "-";
    this.$status.innerText = project.status_name;
  };

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.querySelector("loading-circle").remove();
    // this.$startDate = this.querySelector("#start-date");
    // this.$endDate = this.querySelector("#end-date");
    // this.$status = this.querySelector("#status");
    // this.$projectName = this.querySelector("#project-name");
    // this.updateContent();
    const columns = JSON.stringify(["#", "Issue", "Date", "Status"]);
    const data = [
      {
        id: 1,
        fet: "Runtime error",
        date: "2020-10-20",
        rs: "Fixed",
      },
      {
        id: 2,
        fet: "Validation error",
        date: "2020-10-20",
        rs: "Not Fixed",
        ac1: "<button>Assign Developer</button>",
        ac2: "<button>Update Status</button>",
      },
    ];

    const tableLayout = document.createElement("table-layout");
    tableLayout.setAttribute("columns", columns);
    tableLayout.setAttribute("title", "");
    tableLayout.rows = data;
    this.querySelector(".page_container").appendChild(tableLayout);
  }
}

customElements.define("project-maintenance", ProjectMaintenance);
