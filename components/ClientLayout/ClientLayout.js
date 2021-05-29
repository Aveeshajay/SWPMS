import create from "../../../modules/zustand.js";
import "./ClientNavbar.js";
import "./ClientSidebar.js";

export const layoutStore = create(() => ({
  username: "User",
  listItems: [
    {
      icon: "fa fa-dashboard fa-lg",
      name: "Dashboard",
      href: "/client",
      isActive: true,
    },
    {
      icon: "fa fa-list fa-lg",
      name: "My Projects",
      href: "/client/projects",
      isActive: false,
    },
    {
      icon: "fa fa-user fa-lg",
      name: "Profile",
      href: "/client/profile",
      isActive: false,
    },
    {
      icon: "fa fa-commenting-o fa-lg",
      name: "Messages",
      href: "/client/messages",
      isActive: false,
    },
  ],
  projectListItems: [
    {
      icon: "fa fa-dashboard fa-lg",
      name: "Dashboard",
      href: "/client",
      isActive: true,
    },
    {
      icon: "fa fa-plus-square-o fa-lg",
      name: "Request new feature",
      href: "/client/project/features",
      isActive: false,
    },
    {
      icon: "fa fa-remove fa-lg",
      name: "Inform Issues",
      href: "/client/project/issues",
      isActive: false,
    },
    {
      icon: "fa fa-money fa-lg",
      name: "Invoices",
      href: "/client/project/invoices",
      isActive: false,
    },
    {
      icon: "fa fa-check-square-o fa-lg",
      name: "Agreements",
      href: "/client/project/agreements",
      isactive: false,
    },
    {
      icon: "fa fa-rss fa-lg",
      name: "Leave feedback",
      href: "/client/project/feedback",
      isactive: false,
    },
  ],
}));

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .layout {
      display: grid;
      grid-template-columns: 1fr 4fr;
      height: 100%;
      grid-gap: 0;
    }
    .container {
      margin-left: 30px;
      width: 95%;
    }

  </style>
  <div class="layout">
    <div>
      <client-sidebar></client-sidebar>
    </div>
    <div>
      <client-navbar></client-navbar>
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
  </aside>
`;

class ClientLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("client-layout", ClientLayout);
