import "../../components/Misc/LinkButton.js";
import "../../components/Misc/SelectDropdown.js";

class ReportsPage extends HTMLElement {

    connectedCallback() {
      this.innerHTML = `

      <style>
          .page_container{
              position: absolute;
              margin-top: 10%;
              width: 85%;
              left: 15%;
          }
          </style>
          
          <admin-layout>
          <div class="page_container">
          
               <center>          
                   <reports-page-button></reports-page-button>
               </center> 

          </div>
          </admin-layout>   
  
      `;

    }
  }
  
  customElements.define("reports-page", ReportsPage);
  