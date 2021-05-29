import { api } from "../../../config.js";
import axios from "../../../modules/axios.js";

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

    .header {
      /* background-color: var(--purple); */
    }

  </style>

  <h3 class="mt-10 title"></h3>
  <ul id="devTasks" class="mb-3 mt-3">
  </ul>
`;

class DevTasksList extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.$list = this.querySelector("#devTasks");
    this.$title = this.querySelector(".title");
  }

  set employee(val) {
    this.getTasks(val);
  }

  getTasks = async (employeeId) => {
    const res = await axios.get(
      `${api}/project/get-user-tasks?user_id=${employeeId}`
    );
    const tasks = res.data;
    if (!tasks.length) {
      this.$title.innerText = "No Tasks";
      this.$list.innerHTML = ``;
      return;
    }
    this.$title.innerText = "Tasks";
    const headerHtml = `
      <li class="grid grid-cols-7 header">
        <div class="col-span-1">Order</div>
        <div class="col-span-1">Project</div>
        <div class="col-span-3">Task</div>
        <div class="col-span-1">Duration (Hours)</div>
        <div class="col-span-1">Remaining (Hours)</div>
      </li>
    `;
    this.$list.innerHTML = headerHtml;
    tasks.forEach((t) => {
      console.log(t.free);
      if (t.free) {
        const li = document.createElement("li");
        li.style.listStyle = "none";
        li.className = "t text-center";
        li.innerHTML = `
          <div class="text-center p-3">Free ${t.free} Hours</div>
        `;
        this.$list.appendChild(li);
      }
      const li = document.createElement("li");
      li.className = "grid grid-cols-7 t";
      li.innerHTML = `
      <div class="col-span-1">${t.order_no}</div>
      <div class="col-span-1">${t.name}</div>
      <div class="col-span-3">${t.task}</div>
      <div class="col-span-1 dur">${t.duration}</div>
      <div class="col-span-1 remTime">${t.remaining || t.duration}</div>
      `;
      this.$list.appendChild(li);
    });
  };
}
customElements.define("dev-tasks-list", DevTasksList);
