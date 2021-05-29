import "../components/GoBackButton.js";
class PageLayout extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const template =/*html*/ `
        <style>
        .label {
            color: white;
            padding: 8px;
            font-family: 'KotoriRoseBold';
            text-align: center;
            background-color:#FF5733;
            display: block;
            width: 250px;
            font-size: 25px; 
        }
          
        
        .head{
            font-family: 'KotoriRoseBold';
            text-align: center;
            font-size: 32px; 
            margin-top: 10px; 
        }
       </style>

       <go-back-button></go-back-button>
       <div class="head">
        <p>
            ${this.getAttribute("name1")}
        </p>
       </div>
       <span class="label">
            ${this.getAttribute("name2")}
       </span> 
      
        
      `;
       this.shadowRoot.innerHTML = template;
    }
  }
  customElements.define("page-layout", PageLayout);
  