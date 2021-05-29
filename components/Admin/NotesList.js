import { api } from "../../../config.js";
import { getProjectId, go } from "../../../lib.js";
import axios from "../../../modules/axios.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    notes-list .title {
      font-family: 'KotoriRoseBold';
    }

    #notesList .card {
      align-items: center;
      background-color: white;
      padding: 20px;
      display: grid;
      grid-template-columns: 10fr 0.1fr;
      /* margin-top: 20px; */
      /* width: 95%; */
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      font-family: 'KotoriRose';
      cursor: pointer;
      transition: transform 0.2s ease-in;
      width: 80%;
      margin-bottom: 5px;
    }

    #notesList .card:hover {
      transform: scale(1.01);
    }

    notes-list button {
      background-color: var(--pink);
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

    #notesList {
      width: 100%;
    }

  </style>


  <modal-window title="Add Tasks" id="noteModal">
    <div class="flex" style="width: 100%;">
      <form-input class="flex-4" type="text" name="note" label="Note"></form-input>
    </div>
    <submit-button id="submitNote" name="Submit" color="var(--lightgreen)"></submit-button>
  </modal-window>
  <h3 class="pb-3 title">Notes</h3>
  <div id="notesList">
  </div>
  <button id="addBtn">+ Add Note</button>
`;

class NotesList extends HTMLElement {
  getNotes = async () => {
    const statusId = this.getAttribute("statusid");
    const projectId = getProjectId();
    const res = await axios.get(
      `${api}/project-note/get-notes?status_id=${statusId}&project_id=${projectId}`
    );
    const notes = res.data;
    notes.forEach((d) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div>${d.note}</div> 
        <div style="color: red">X</div>
      `;
      div.className = "card";
      // div.innerText = d.note;
      this.$notesList.appendChild(div);
    });
  };

  handleSubmit = async () => {
    const statusId = this.getAttribute("statusid");
    const projectId = getProjectId();
    const note = this.querySelector("form-input").value;

    const res = await axios.post(`${api}/project-note/add-note`, {
      status_id: statusId,
      project_id: projectId,
      note,
    });
    // console.log(res.data);
    go(window.location.pathname);
  };

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.$notesList = this.querySelector("#notesList");
    this.$addBtn = this.querySelector("#addBtn");
    this.$submitBtn = this.querySelector("#submitNote");
    this.$modal = this.querySelector("modal-window");

    this.$addBtn.onclick = () => {
      this.$modal.hidden = false;
    };

    this.$submitBtn.onclick = this.handleSubmit;

    this.getNotes();
  }
}
customElements.define("notes-list", NotesList);
