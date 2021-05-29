import { api } from "../../../config";
import axios from "../../../modules/axios";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .card {
      align-items: center;
      background-color: white;
      padding: 20px;
      /* margin-top: 20px; */
      /* width: 95%; */
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      font-family: 'KotoriRose';
      cursor: pointer;
      transition: transform 0.2s ease-in;
    }

    .card:hover {
      transform: scale(1.05);
    }

    li {
      font-family: 'KotoriRose';
    }

  </style>

  <div class="pb-3">Depends On</div>
  <ul class="list">
  </ul>
`;

class DependableList extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.$list = this.querySelector(".list");
    this.values = [];
  }

  getTasks = async (taskId, statusId, projectId) => {
    const res = await axios.get(
      `${api}/project-task/get-dep-tasks?task_id=${taskId}&status_id=${statusId}&project_id=${projectId}`
    );
    return res.data;
  };

  set data(data) {
    this.getTasks(data.taskId, data.statusId, data.projectId).then((tasks) => {
      this.$list.innerHTML = ``;
      tasks.forEach((t) => {
        const li = document.createElement("li");
        li.className = "grid grid-cols-5";
        li.innerHTML = `
          <div class="col-span-4">${t.task}</div>
        `;
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.onchange = (e) => this.handleChange(e.target, parseInt(t.id));
        cb.className = "col-span-1";
        li.appendChild(cb);
        this.$list.appendChild(li);
      });
    });
  }

  handleChange = (cb, id) => {
    if (cb.checked) {
      this.values.push(id);
    } else {
      this.values.splice(this.values.indexOf(id), 1);
    }
  };
}
customElements.define("dependable-list", DependableList);
