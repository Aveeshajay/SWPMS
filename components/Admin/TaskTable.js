import { api } from "../../../config.js";
import { getProjectId, getUserType, go } from "../../../lib.js";
import axios from "../../../modules/axios.js";
import "../../components/Admin/TaskSuggestions.js";
import "../../components/Misc/FormInput.js";
import "../../components/Misc/ModalWindow.js";
import "../../components/Misc/SubmitButton.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    #suggestions li {
      list-style: none;
      cursor: pointer;
      padding: 10px;
    }

    #suggestions li:hover {
      background-color: gray;
    }

    .assign-btn {
      background-color: var(--lightblue);
    }
    .complete-btn {
      background-color: var(--purple);
    }
    .done-btn {
      background-color: var(--orange);
    }

  </style>
  <modal-window title="Assign Tasks" id="assignModal">
      <div class="flex" style="width: 100%;">
        <form-input class="flex-4" type="text" name="task-disabled" label="Task" disabled="true"></form-input>
        <input type="text" hidden name="task-id" />
        <form-input class="flex-2" type="text" name="duration" label="Duration"></form-input>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <developer-list class="col-span-1"></developer-list>
        <dependable-list class="col-span-3"></dependable-list>
      </div>
      <form-input class="float-left mt-3" type="text" name="orderNo" label="Order"></form-input>
      <div class="clearfix"></div>
      <dev-tasks-list></dev-tasks-list>
      <submit-button id="assignTask" name="Assign" color="var(--lightgreen)"></submit-button>
  </modal-window>
  <modal-window title="Add Tasks" id="taskModal">
      <div class="flex" style="width: 100%;">
        <form-input class="flex-4" type="text" name="task" label="Task"></form-input>
      </div>
      <task-suggestions></task-suggestions>
      <submit-button id="addTask" name="Add Task" color="var(--lightgreen)"></submit-button>
  </modal-window>

  <div id="tasks">
    <h3 class="mt-10">Tasks</h3>
    <ul id="task-list" class="mb-3 mt-3">
      <li class="grid grid-cols-7 header ">
        <div class="col-span-3">Task</div>
        <div class="col-span-1">Duration (Hours)</div>
        <div class="col-span-1">Remaining (Hours)</div>
        <div class="col-span-1">Developer</div>
        <div class="col-span-1"></div>
      </li>
    </ul>
    
    <button id="addBtn">+ Add Tasks</button>
  </div>
`;

class TaskTable extends HTMLElement {
  static get observedAttributes() {
    return ["statusid"];
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.$addBtn = this.querySelector("#addBtn");
    this.$taskModal = this.querySelector("#taskModal");
    this.$assignModal = this.querySelector("#assignModal");
    this.$submitTaskBtn = this.querySelector("#addTask");
    this.$submitAssignBtn = this.querySelector("#assignTask");

    this.$submitTaskBtn.onclick = this.handleAddSubmit;
    this.$submitAssignBtn.onclick = this.handleAssignSubmit;

    this.$addBtn.onclick = () => {
      this.$taskModal.hidden = false;
    };

    if (getUserType() !== "ADMIN") {
      this.$addBtn.style.display = "none";
    }

    this.querySelector("task-suggestions").statusid = this.statusid;
    this.getTasks();
  }

  getTasks = async () => {
    const projectId = getProjectId();
    const res = await axios.get(
      `${api}/project-task/get-tasks?status_id=${this.statusid}&project_id=${projectId}`
    );
    const tasks = res.data;
    tasks.forEach((t) => {
      const li = document.createElement("li");
      li.className = "grid grid-cols-7 t items-center";
      li.innerHTML = `
        <div class="col-span-3">${t.task}</div>
        <div class="col-span-1 dur">${t.duration || "-"}</div>
        <div class="col-span-1 remTime">${t.remaining || "-"}</div>
        <div class="col-span-1">${t.first_name || "-"}</div>
      `;

      const btn = document.createElement("button");
      if (t.completed_date) {
        btn.className = "col-span-1 done-btn";
        btn.innerText = "DONE";
        li.appendChild(btn);
      } else if (t.start_date) {
        btn.className = "col-span-1 complete-btn";
        btn.innerText = "Complete";
        btn.onclick = () => this.handleStartComplete(t, "COMPLETE");
        li.appendChild(btn);
      } else if (t.employee_id) {
        btn.className = "col-span-1";
        btn.innerText = "Start";
        btn.onclick = () => this.handleStartComplete(t, "START");
        li.appendChild(btn);
      } else {
        if (getUserType() === "ADMIN") {
          btn.className = "col-span-1 assign-btn";
          btn.innerText = "Assign";
          btn.onclick = () => this.handleAssignClick(t);
        }
        li.appendChild(btn);
      }
      this.querySelector("#task-list").appendChild(li);
    });
  };

  handleAssignClick = (t) => {
    const projectId = getProjectId();
    const assignModal = this.querySelector("#assignModal");
    assignModal.hidden = false;
    assignModal.querySelector('[name="task-disabled"]').value = t.task;
    assignModal.querySelector('[name="task-id"]').value = t.id;
    const depList = this.querySelector("dependable-list");
    depList.data = {
      taskId: t.id,
      projectId: projectId,
      statusId: this.statusid,
    };
  };

  handleStartComplete = async (t, type) => {
    const res = await axios.post(`${api}/project-task/update-task-status`, {
      taskId: t.id,
      type,
    });
    alert(res.data.msg);
    go(this._link);
  };

  handleAddSubmit = async () => {
    const project_id = getProjectId();
    const task = this.querySelector("[name='task']").value;

    try {
      const res = await axios.post(`${api}/project-task/add-task`, {
        project_id,
        task,
        status_id: this.statusid,
      });
      // alert(res.data.msg);
      this.$taskModal.hidden = true;
      go(this._link);
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  handleAssignSubmit = async () => {
    const task_id = this.querySelector("[name='task-id']").value;
    const order_no = this.querySelector("[name='orderNo']").value;
    const employee_id = this.querySelector("developer-list").employeeId;
    const duration = this.querySelector("[name='duration']").value;
    const depend_ids = this.querySelector("dependable-list").values;

    try {
      const res = await axios.post(`${api}/project-task/assign-task`, {
        task_id,
        order_no,
        employee_id,
        duration,
        depend_ids,
      });
      alert(res.data.msg);
      this.$assignModal.hidden = true;
      go(this._link);
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  set statusid(val) {
    let phase;
    if (val === 7) {
      phase = "requirements";
    } else if (val === 8) {
      phase = "designs";
    } else if (val === 9) {
      phase = "devtasks";
    } else if (val === 10) {
      phase = "tests";
    }
    const projectId = getProjectId();
    this._link = `/admin/project/${projectId}/${phase}`;
    this.setAttribute("statusid", val);
  }

  get statusid() {
    return this.getAttribute("statusid");
  }
}

customElements.define("task-table", TaskTable);
