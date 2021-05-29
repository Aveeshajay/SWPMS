import { api } from "../../../config.js";
import axios from "../../../modules/axios.js";
import "../../components/Misc/FormInput.js";
import "../../components/Misc/ModalWindow.js";
import "../../components/Misc/SubmitButton.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    :host li {
      list-style: none;
      cursor: pointer;
      padding: 10px;
    }

    :host li:hover {
      background-color: gray;
    }
  </style>
  <h3>Suggestions</h3>
  <ul id="suggestions" class="grid grid-cols-2">
  </ul>
`;

class TaskSuggestions extends HTMLElement {
  static get observedAttributes() {
    return ["statusid"];
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }

  getSuggestions = async () => {
    const res = await axios.get(
      `${api}/project-task/get-suggestions?status_id=${this.statusid}`
    );
    const data = res.data;
    const suggestionList = this.querySelector("#suggestions");
    data.forEach((s) => {
      const li = document.createElement("li");
      li.innerText = s.task;
      li.onclick = (e) => {
        this.parentNode.querySelector("form-input").value = e.target.innerText;
      };
      suggestionList.appendChild(li);
    });
  };

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "statusid") {
      this.getSuggestions();
    }
  }

  set statusid(val) {
    this.setAttribute("statusid", val);
  }

  get statusid() {
    return this.getAttribute("statusid");
  }
}

customElements.define("task-suggestions", TaskSuggestions);
