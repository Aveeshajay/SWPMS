import { api } from "../../../config.js";
import { getProjectId, getUserType, go } from "../../../lib.js";
import axios from "../../../modules/axios.js";
import "../../components/Admin/ProjectStatusCard.js";
import "../../components/Misc/LinkButton.js";
import "../../components/Misc/LoadingCircle.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
      /* @import url("../../../index.css"); */

      .wrapper {
        margin-top: 2%;
        background-color: #fff;
        height: 100vh;
        width: 100%;
        box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      }

      h3 {
        border-bottom: 3px solid orange;
        text-transform: uppercase;
      }

      #gantt-chart {
        padding: 200px;
        border: 3px solid var(--darkgray);
      }

      button {
        background-color: var(--purple);
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 2px;
        font-family: 'KotoriRose';
        cursor: pointer;
        color: #fff;
      }
      
      #project-name {
        /* border: 4px solid var(--web3); */
        background-color: var(--yellow);
        width: 80%;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        margin: 0 auto;
        /* border-radius: 50px; */
        /* color: #fff; */
      }

      #status {
        color: var(--lightgreen);
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        padding: 10px;
      }

  </style>
  <admin-layout>
      <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      <br />
      <link-button pathname="${
        sessionStorage.getItem("userType") === "ADMIN"
          ? "/admin/inprogress"
          : "/admin"
      }" name="Go back to Projects" class="mb-5"></link-button>
      <div class="wrapper font-kotori pt-3">
        <h1 id="project-name" class="text-center p-4">Project #1</h1>
        <div class="flex justify-between mt-8">
          <div class="ml-10">
            <div>
              <h3>Start date</h3>
              <legend id="start-date" class="ml-8"></legend>
            </div>
            <div>
              <h3>End date</h3>
              <legend id="end-date" class="ml-8"></legend>
            </div>
            <button id="calcDead" class="mt-3">Calculate Deadlines</button><br><br>
            <link-button pathname="/admin/addExpenses" name="Add Project Expenses" class="mb-5"></link-button>
          </div>
          <div class="mr-10">
            <h3>Current Status</h3>
            <legend id="status" class="mt-2"></legend>
          </div>
        </div>
        <div id="chart-container" class="m-5">
          <h3 class="text-center mb-5 pb-3">Gantt Chart</h3>
          <div id="gantt-chart">
          </div>
        </div>
      </div>
  </admin-layout>
`;

class ProjectDashboard extends HTMLElement {
  getProject = async () => {
    const id = getProjectId();
    const res = await axios.get(`${api}/project/get-project?id=${id}`);
    return res.data;
  };

  handleCalc = async () => {
    const id = getProjectId();
    try {
      const res = await axios.post(`${api}/project/calc-deadline`, {
        projectId: id,
      });
      console.log(res.data);
      alert("Deadlines Updated Successfully");
      go(`/admin/project/${id}`);
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  updateContent = async () => {
    const project = await this.getProject();
    this.querySelector("loading-circle").remove();
    sessionStorage.setItem("project-name", project.name);
    sessionStorage.setItem("project-code", project.code);
    this.$projectName.innerText = "(" + project.code + ") " + project.name;
    this.$startDate.innerText = project.start_date || "-";
    this.$endDate.innerText = project.end_date || "-";
    this.$status.innerText = project.status_name;
  };

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.$startDate = this.querySelector("#start-date");
    this.$endDate = this.querySelector("#end-date");
    this.$status = this.querySelector("#status");
    this.$projectName = this.querySelector("#project-name");
    this.querySelector("#calcDead").onclick = this.handleCalc;
    if (getUserType() !== "ADMIN") {
      this.querySelector("#calcDead").style.display = "none";
    }
    this.updateContent();
  }
}

customElements.define("project-dashboard", ProjectDashboard);
