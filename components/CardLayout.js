class CardLayout extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const template = `
        <style>
        * {
            box-sizing: border-box;
          } 
        .card {
            background-color: white;
            padding: 20px;
            margin-top: 20px;
         }
         .column {
            background-color: #aaa;
            width: 100%;
            padding: 20px;
          }
          
  
        </style>
        <div class="card">
       
        <div class="column">pr1<p align="right"> <a href="/client/clientproject"><view-button name="View more"></view-button></a>
        </p></div><br>
        <div class="column">pr2<p align="right"><view-button name="View more"></view-button></p></div><br>
        <div class="column">pr3<p align="right"><view-button name="View more"></view-button></p></div>
    </div>
       
      `;
  
      this.shadowRoot.innerHTML = template;
    }
     
  
     }
      customElements.define("card-layout", CardLayout);
  
  