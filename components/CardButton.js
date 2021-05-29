class CardButton extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const template = `
        <style>
        .card {
          background-color: rgba(51, 110, 123, 1);
          max-width: 300px;
          height: 250x;
          margin: auto;
          text-align: center;
          font-family: arial;
        }
        
        .price {
          color: grey;
          font-size: 22px;
        }
        
        .card button {
          border: none;
          outline: 0;
          padding: 12px;
          color: white;
          background-color: #000;
          text-align: center;
          cursor: pointer;
          width: 100%;
          font-size: 18px;
        }
        
        .card button:hover {
          opacity: 0.7;
        }
          .column {
            float: left;
            width: 18%;
            padding: 0 10px;
          }
          
        </style>
       
        <div class="column">
        <div class="card">
        <h1>Requirement Gathering</h1>
        <p><button type>View</button></p>
        </div></div>

        <div class="column">
        <div class="card">
        <h1>Designing</h1><br>
        <p><button>View</button></p>
        </div></div>

        <div class="column">
        <div class="card">
        <h1>Development</h1><br>
        <p><button>View</button></p>
        </div></div>

        <div class="column">
        <div class="card">
        <h1>Testing</h1><br>
        <p><button>View</button></p>
        </div></div>

        <div class="column">
        <div class="card">
        <h1>Maintenance</h1><br>
        <p><button>View</button></p>
        </div></div>

       
      `;
  
      this.shadowRoot.innerHTML = template;
    }
     
  
     }
      customElements.define("card-button", CardButton);
  
  