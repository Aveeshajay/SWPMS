
class SelectDropdown extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const template = /*html*/ `
      <style>
        .box select {
            background-color: #1e90ff;
            color: black;
            padding: 10px 10px;
            font-size: 14px;
            -webkit-appearance: button;
            appearance: button;
            font-family: 'KotoriRoseBold';
            margin-bottom: 20px;
            width: 170px;
        }
        </style>
       
       <div class="box">
          <select>
          <option hidden>Select Developer</option>
          <option value="1">Developer 1</option>
          <option value="2">Developer 2</option>
          <option value="3">Developer 3</option>
          <option value="4">Developer 4</option>
          </select>
    `;
    this.shadowRoot.innerHTML = template;

    }
  }
  
  customElements.define("select-dropdown",SelectDropdown);
  