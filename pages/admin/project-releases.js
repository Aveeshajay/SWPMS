import "../../components/Admin/DependableList.js";
import "../../components/Admin/DeveloperList.js";
import "../../components/Admin/DevTasksList.js";
import "../../components/Admin/NotesList.js";
import "../../components/Admin/ProjectStatusCard.js";
import "../../components/Admin/ReleasePageCard.js";
import "../../components/Admin/TaskTable.js";
import "../../components/Misc/LoadingCircle.js";
import "../../components/Misc/ProjectPageWrapper.js";

const statusId = 10;
const title = "Project Releases";

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

      button {
        background-color: var(--lightgreen);
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

      .start-btn {
        background-color: var(--lightblue);
      }

      .header {
        background-color: var(--web4); 
        padding: 0.3rem;
      }

      li {
        padding: 0.3rem;
        border-bottom: 1px solid var(--web4);
      }

      .purple-btn {
        background-color: var(--purple);
      }

  </style>
  <admin-layout>
      <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      <modal-window title="Add Releases" id="releasesModal">
          <div class="flex" style="width: 100%;">
            <form-input class="flex-3" type="text" name="version" label="Version No"></form-input>
            <input class="flex-2" type="date" name="releaseDate">
          </div>
          <submit-button id="submitRelease" name="Submit Release" color="var(--lightgreen)"></submit-button>
      </modal-window>
      
      <project-page-wrapper class="mt-5" title="${title}">
        <div class="float-right mr-6 mt-2 grid grid-cols-2">
          <div>
            <h3>Alocated Time</h3>
            <span id="alocatedTime">-</span>
          </div>
          <div>
            <h3 >Remaining Time</h3>
            <span id="remainingTime">-</span>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="grid grid-cols-4">
          <task-table class="pl-10 pr-10 col-span-4" statusid="${statusId}"></task-table>
        </div>
        <div class="flex align-center p-10">
          <notes-list class="flex-1" statusid="${statusId}""></notes-list>
        </div>
        <div class="align-center p-10">
          <h3 class="float-left">Previous Releases</h3>
          <button class="float-right purple-btn" id="addReleaseBtn">+ Add New Release</button>
          <div class="clearfix"></div>
          <release-page-card name="1.2" date="30/10/2020"></release-page-card>
          <release-page-card name="1.1" date="25/10/2020"></release-page-card>
          <release-page-card name="1.0" date="20/10/2020"></release-page-card>
        </div>
      </project-page-wrapper>
  </admin-layout>
`;

class ProjectReleases extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.querySelector("loading-circle").remove();
    this.querySelector("#addReleaseBtn").onclick = () => {
      this.querySelector("#releasesModal").hidden = false;
    };
  }
}

customElements.define("project-releases", ProjectReleases);
