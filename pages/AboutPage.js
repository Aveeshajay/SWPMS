import "../components/GoBackButton.js";

class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>About Page</h1>
      <go-back-button></go-back-button>
    `;
  }
}

customElements.define("about-page", AboutPage);
