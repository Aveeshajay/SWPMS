import "../../components/Admin/DependableList.js";
import "../../components/Admin/DeveloperList.js";
import "../../components/Admin/DevTasksList.js";
import "../../components/Admin/NotesList.js";
import "../../components/Admin/ProjectStatusCard.js";
import "../../components/Admin/TaskTable.js";
import "../../components/ChooseFile.js";
import "../../components/Misc/LoadingCircle.js";
import "../../components/Misc/ProjectPageWrapper.js";

const statusId = 9;
const title = "Project Development";

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

  </style>
  <admin-layout>
      <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      
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
      </project-page-wrapper>
  </admin-layout>
`;

class ProjectDevtasks extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.querySelector("loading-circle").remove();
  }
}

customElements.define("project-devtasks", ProjectDevtasks);
