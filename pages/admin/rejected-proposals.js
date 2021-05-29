import { api } from "../../../config.js";
import axios from "../../../modules/axios.js";
import "../../components/Admin/ProjectListCard.js";
import "../../components/GoBackButton.js";
import "../../components/Misc/LinkButton.js";

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

  </style>

  <admin-layout>
  <div class="page_container">
      <link-button name="Go Back" pathname="/admin"></link-button>
      <h1 class="title">Rejected Proposals</h1>
      <div id="proposals">
        <loading-circle width="50px" height="50px" fullHeight="true"></loading-circle>
      </div>
    </div>
  </admin-layout>
`;

class RejectedProposals extends HTMLElement {
  getProposals = async () => {
    const res = await axios.get(`${api}/project/get-rejected-proposals`);
    return res.data;
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
      `;
      card.shadowRoot
        .querySelector(".btns")
        .insertAdjacentHTML("beforeend", btns);
      wrapper.appendChild(card);
    });
  };
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.addItems();
  }
}

customElements.define("rejected-proposals", RejectedProposals);
