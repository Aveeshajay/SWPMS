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
  </style>

  <div class="pb-3">Select Developer</div>
  <div id="empList">
  </div>
`;

class DeveloperList extends HTMLElement {
  getDevelopers = async () => {
    const res = await axios.get(`${api}/employee/get-employees`);
    const devs = res.data;
    devs.forEach((d) => {
      const div = document.createElement("div");
      div.className = "card";
      div.onclick = (e) => this.handleDeveloperClick(e, d.id);
      div.innerText = d.first_name;
      this.$empList.appendChild(div);
    });
  };

  handleDeveloperClick = async (e, devId) => {
    this.$empList.querySelectorAll(".card").forEach((card) => {
      card.style.backgroundColor = "#fff";
      card.style.color = "#000";
    });
    e.target.style.backgroundColor = "var(--web2)";
    e.target.style.color = "#fff";
    this.employeeId = devId;
    document.querySelector("dev-tasks-list").employee = devId;
  };

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.$empList = this.querySelector("#empList");
    this.getDevelopers();
  }

  disconnectedCallback() {
    this.$empList.querySelectorAll(".card").forEach((card) => {
      card.style.backgroundColor = "#fff";
      card.style.color = "#000";
    });
    this.employeeId = null;
  }
}
customElements.define("developer-list", DeveloperList);
