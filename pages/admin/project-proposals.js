import { api } from "../../../config.js";
import { go } from "../../../lib.js";
import axios from "../../../modules/axios.js";
import "../../components/Admin/ProjectListCard.js";
import "../../components/GoBackButton.js";
import "../../components/Misc/FormInput.js";
import "../../components/Misc/LinkButton.js";
import "../../components/Misc/ModalWindow.js";
import "../../components/Misc/SubmitButton.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .title {
      /* float: left; */
      text-transform: uppercase;
      font-family: 'KotoriRoseBold';
      margin-bottom: 20px;
      margin-top: 20px;
    }

    .page_container{
      margin-top: 50px;
    }

    .btn {
      float: right;
    }

    span {
      font-family: 'KotoriRose';
      border-bottom: 1px solid #f2f2f2;
      margin-bottom: 5px;
    }

  </style>

  <admin-layout>
  <div class="page_container">
      <modal-window title="Add a Project Name">
        <div class="flex">
          <form-input disabled class="flex-1" type="text" name="projectCode" label="Project Code"></form-input>
          <form-input class="flex-3" type="text" name="projectName" label="Project Name"></form-input>
        </div>
        <div class="flex">
          <div class="p-4">
            <span>Requested Category</span>
            <div name="category"></div>
          </div>
          <div class="p-4">
            <span>Client's Brief Description</span>
            <div name="clientDesp"></div>
          </div>
        </div>
        <submit-button name="Submit Data" color="var(--lightgreen)"></submit-button>
      </modal-window>
      <link-button name="Go Back" pathname="/admin"></link-button>
      <h1 class="title">New Project Proposals</h1>
      <div id="proposals">
        <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      </div>
    </div>
  </admin-layout>
`;

class ProjectProposals extends HTMLElement {
  getProposals = async () => {
    const res = await axios.get(`${api}/project/get-new-proposals`);
    return res.data;
  };

  handleApprove = async (approveBtn, projectId) => {
    const projectData = await axios.get(
      `${api}/project/get-project?id=${projectId}`
    );
    const project = projectData.data;
    this.querySelector('[name="projectCode"]').value = project.code;
    this.querySelector(
      '[name="clientDesp"]'
    ).innerText = `"${project.client_desp}"`;
    this.querySelector(
      '[name="category"]'
    ).innerText = `${project.service_type}`;

    this._modal.hidden = false;
    this._submitBtn.onclick = async () => {
      this._submitBtn.loading = true;
      try {
        const res = await axios.post(`${api}/project/approve-proposal`, {
          projectId,
          value: this._input.value,
        });
        console.log(res.data);
        alert(res.data.msg);
        go("/admin");
        this._submitBtn.loading = false;
      } catch (err) {
        this._submitBtn.loading = false;
        console.log(err);
        alert("Failed to submit");
      }
    };
  };

  handleReject = async (rejectBtn, projectId) => {
    try {
      const res = await axios.post(`${api}/project/reject-proposal`, {
        projectId,
      });
      console.log(res.data);
      alert(res.data.msg);
      go("/admin");
    } catch (err) {
      console.log(err);
      alert("Failed to Reject");
    }
  };

  addItems = async () => {
    const items = await this.getProposals();
    this.querySelector("loading-circle").remove();
    const wrapper = this.querySelector("#proposals");
    items.forEach((item) => {
      const card = document.createElement("project-list-card");
      card.title = `A Proposal by ${item.name}`;
      const btns = `
        <link-button name="View Proposal" hardLink="true" pathname="${`${api}${item.proposal_path}`}"></link-button>
        <link-button id="approveBtn" name="Approve" color="var(--lightgreen)"></link-button>
        <link-button id="rejectBtn" name="Reject" color="var(--pink)"></link-button>
      `;
      card.shadowRoot
        .querySelector(".btns")
        .insertAdjacentHTML("beforeend", btns);
      const approveBtn = card.shadowRoot.querySelector("#approveBtn");
      approveBtn.addEventListener("click", (e) =>
        this.handleApprove(e.target, item.id)
      );
      const rejectBtn = card.shadowRoot.querySelector("#rejectBtn");
      rejectBtn.addEventListener("click", (e) =>
        this.handleReject(e.target, item.id)
      );
      wrapper.appendChild(card);
    });
  };
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.addItems();
    this._modal = this.querySelector("modal-window");
    this._input = this.querySelector("[name='projectName']");
    this._submitBtn = this.querySelector("submit-button");
  }
}

customElements.define("project-proposals", ProjectProposals);
