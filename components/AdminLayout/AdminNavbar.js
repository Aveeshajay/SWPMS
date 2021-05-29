import { api } from "../../../config";
import login_image from "../../../images/login.png";
import msg_image from "../../../images/msg.png";
import { go } from "../../../lib";
import axios from "../../../modules/axios";

class AdminNavbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = /*html*/ `
      <style>
        nav {
          background-color: #252525;
        	margin: 0;
        	padding: 0.5%;
        	position: relative;
          height: 60px;
        	z-index: 1;
          border-bottom: 2px solid orange;
          list-style: none;
          display: flex;
          justify-content: space-between;
        }

        a {
          text-decoration: none;
          color: white; 
          padding: 20px;
          display: block;
        }
        ul {
          padding: 10px;
          list-style: none;
          display: flex;
          align-items: center;
        }


        img {
          width: 50px;
          height: 50px;
        }

        .logo {
          font-family: 'KotoriRoseBold';
          color: #fff;
          font-size: 3rem;
        }

        button {
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

        #username {
          color: #fff;
          text-align: center;
          font-family: 'KotoriRoseBold';
        }

        
      </style>
      
      <nav>
         <div class="logo">Admin Panel</div>
         <ul>
             <li>
                <a href="/admin">
                  <img src="${login_image}">
                </a>
              </li>
             <li>
                <a href="/admin">
                  <img src="${msg_image}">
                </a>
             </li>
             <li>
                <div id="username">${sessionStorage.getItem("username")}</div>
                <button id="logout">Logout</button>
             </li>
        </ul>
      </nav>
    `;

    this.shadowRoot.innerHTML = template;
    this.shadowRoot.querySelector("#logout").onclick = this.handleLogout;
  }

  handleLogout = async () => {
    await axios.post(`${api}/user/logout`, {}, { withCredentials: true });
    sessionStorage.clear();
    go("/admin/login");
  };
}

customElements.define("admin-navbar", AdminNavbar);
