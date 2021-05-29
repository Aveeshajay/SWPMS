import { api } from "../../../config.js";
import { go } from "../../../lib.js";
import axios from "../../../modules/axios.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    nav {
      width: 100%;
      z-index: 10;
      background-color:#2f323e;
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      padding: 5px 0;
    }

    .avatar {
      float: right;
      padding-right: 20px;
      display: flex;
      align-items: center;
    }

    .avatar > span {
      color: #fff;
      font-family: 'KotoriRose';
      padding-left: 25px;
    }

    i {
      color: #fff;
    }

    #logout {
      font-family: 'KotoriRose';
      margin: 0 10px;
      padding: 5px;
    }
    
  </style>
  <nav>
    <div class="avatar">
      <i class="fa fa-user fa-3x" aria-hidden="true"></i>
      <span id="username">User</span>
      <button id="logout">Logout</button>
    </div>
    <div style="clear: both;"></div>
  </nav>
`;

class ClientNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const username = sessionStorage.getItem("username") || "";
    this.shadowRoot.querySelector("#username").textContent = username;
    this.shadowRoot
      .querySelector("#logout")
      .addEventListener("click", this.handleLogout);
  }

  handleLogout = async () => {
    await axios.post(`${api}/user/logout`, {}, { withCredentials: true });
    sessionStorage.clear();
    go("/client/login");
  };
}

customElements.define("client-navbar", ClientNavbar);
