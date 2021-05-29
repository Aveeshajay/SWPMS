class ClientDashboardPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <client-layout>
      </client-layout> 
    `;
  }
}

customElements.define("client-dashboard-page", ClientDashboardPage);
