class NotFoundPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <style>
        .container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        h1 {
          font-size: 7rem;
          font-family: 'KotoriRose';
        }
      </style>
      <div class="container">
        <h1>404 - Page Not Found</h1>
      </div>
    `;
  }
}

customElements.define("not-found-page", NotFoundPage);
