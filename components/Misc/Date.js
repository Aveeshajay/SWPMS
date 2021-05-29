class DatePicker extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = /*html*/ `
    <style>
      * {
        font-family: 'KotoriRose';
      }

      div {
        padding: 10px;
        display: inline-block;
      }

      input {
        /* width: 50%; */
        padding: 10px;
        box-sizing: border-box;
        border: 3px solid silver;
        outline: none;
      }

    </style>
    <div>
      <label>${this.getAttribute("name")}</label>
      <input type="date">
    </div>
  `;

    this.shadowRoot.innerHTML = template;
  }
}

customElements.define("date-picker", DatePicker);
