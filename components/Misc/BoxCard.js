const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .card {
      position: relative;
      padding: 20px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      transition: 0.3s;
      background-color: #fff;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      cursor: pointer;
    }

    .card:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .color {
      position: absolute;
      bottom: 0;
      left: 0;
      /* padding: 30px; */
      border-left: 25px solid var(--lightgreen);
      border-right: 60px solid transparent;
      border-top: 25px solid transparent;
      border-bottom: 60px solid var(--lightgreen);
    }

    h2 {
      font-family: 'KotoriRoseBold';
    }
  </style>

  <div class="card">
    <h2></h2>
    <div class="color"></div>
  </div>
`;

class BoxCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const text = this.shadowRoot.querySelector("h2");
    text.innerText = this.getAttribute("name");

    const colorPart = this.shadowRoot.querySelector(".color");
    const color = this.getAttribute("color");
    colorPart.style.borderLeft = `25px solid ${color}`;
    colorPart.style.borderBottom = `60px solid ${color}`;
  }
}
customElements.define("box-card", BoxCard);
