class TimeAlocate extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const template = /*html*/`
        <style>
         .container {
            outline: 0;
            font-weight: bold;
            letter-spacing: 1px;
            margin-top: 20px;
          }
        .container input {
            width: 25%;
            clear: both;
        }
        label{
            display: inline-block;
            float: left;
            clear: left;
            width: 250px;
        }
         </style>
         <div class="card">
         <form>
         <label for="alt">Alocated Time:</label>
         <input type="text" id="alt"><br><br>
         <label for="rmt">Remaining Time:</label>
         <input type="text" id="rmt"><br>
         </form></div>
       `;
  
      this.shadowRoot.innerHTML = template;
    }
   }
   customElements.define("time-alocate", TimeAlocate);
  