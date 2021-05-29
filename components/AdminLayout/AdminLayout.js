import "./AdminNavbar.js";
import "./AdminSidebar.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>

    .layout {
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .layout-grid {
      display: grid;
      grid-template-columns: 1fr 4fr;
      height: 100%;
      grid-gap: 0;
      width: 100%;
    }
    .container {
      margin-left: 30px;
      width: 95%;
    }

  </style>
  <div class="layout">
    <admin-navbar></admin-navbar>
    <div class="layout-grid">
      <admin-sidebar></admin-sidebar>
      <div>
        <div class="container">
          <slot />
        </div>
      </div>
    </div>
  </div>
  </aside>
`;

class AdminLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("admin-layout", AdminLayout);
