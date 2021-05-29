import logo from "../../assets/images/logo.svg";
import { layoutStore } from "./ClientLayout.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    aside {
      width: 100%;
      height: 100%;
      top: 0px;
      z-index: 10;
      background: #fff;
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
    }
    
    ul {
      /* padding-top: 64px; */
      list-style: none;
      padding: 0;
    }

    li {
      /* padding: 10px; */
      display: flex;
      align-items: center;
      width: 100%;
      /* padding-left: 20px; */
      padding: 5%;
      /* font-size: 1.2rem; */
      text-transform: uppercase;
    }

    a {
      color: #54667a;
      text-decoration: none;
      font-family: 'KotoriRose';
      text-align: center;
      padding: 15px 35px 15px 14px;
    }

    .logo {
      text-align: center;
      color: var(--darkgray);
      padding-top: 8px;
      padding-bottom: 8px;
      border-bottom: 4px solid var(--lightblue);
    }

    img {
      height: 40px;
    }

    i {
      color: var(--darkgray);
    }

    .active {
      font-weight: 500;
      border-left: 6px solid var(--lightblue);
    }

  </style>
  <aside>
    <div class="logo"><img src="${logo}" /></div>
    <ul>
    </ul>
  </aside>
`;

class ClientSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.pathname = window.location.pathname;
    this.setListItems(this.pathname);
  }

  connectedCallback() {
    this.addListItems();
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((el) => {
      el.addEventListener("click", this.listener);
    });
  }

  disconnectedCallback() {
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((a) => a.removeEventListener("click", this.listener));
  }

  listener = (e) => {
    this.setListItems();
  };

  addListItems() {
    const ul = this.shadowRoot.querySelector("ul");
    let items;

    const isProjectView = this.pathname.substring(0, 16) === "/client/project/";

    if (isProjectView) {
      items = layoutStore.getState().projectListItems;
    } else {
      items = layoutStore.getState().listItems;
    }

    items.forEach((item) => {
      const li = `
        <li ${item.isActive ? `class="active"` : ``}>
          <i class="${item.icon}"></i>
          <a href="${item.href}">${item.name}</a>
        </li>
      `;
      ul.insertAdjacentHTML("beforeend", li);
    });
  }

  setListItems() {
    let items;
    const isProjectView = this.pathname.substring(0, 16) === "/client/project/";

    if (isProjectView) {
      items = layoutStore.getState().projectListItems;
    } else {
      items = layoutStore.getState().listItems;
    }

    const newItems = items.map((item) => {
      return {
        ...item,
        isActive: item.href === this.pathname ? true : false,
      };
    });

    layoutStore.setState({
      ...(!isProjectView
        ? { listItems: newItems }
        : { projectListItems: newItems }),
    });
  }
}

customElements.define("client-sidebar", ClientSidebar);
