import "../../components/ChooseFile.js";
import "../../components/Layout.js";
import "../../components/Misc/LinkButton.js";
import "../../components/Misc/Note.js";
import "../../components/Misc/TimeAlocate.js";
class ProjectDesigntPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
    <style>
    .card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 100%;
            background-color:#D0DCFC ;
           
         }
         .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 10px;
        }

        .grid-container > div {
          padding: 20px 0;
        }
    </style>
      <admin-layout>
        <page-layout name1="Project 1" name2="Designs"> </page-layout>
            <div class="card">
                <div class="grid-container">

                <div></div>
                <div></div>
                <div>
                <time-alocate> </time-alocate>  
                </div>
                
                <div>
                    <a href="">View Usecase Diagram</a>
                </div>
                <div>
                    <choose-file name="Upload" color="#1e90ff"></choose-file>
                </div>
                <div></div>

                <div>
                    <a href="">View Activity Diagrams</a>
                </div>
                <div>
                    <choose-file name="Upload" color="#1e90ff"></choose-file>
                </div>
                <div></div>

                <div>
                    <a href="">View Component Diagram</a>
                </div>
                <div>
                    <choose-file name="Upload" color="#1e90ff"></choose-file>
                </div>
                <div></div>

                <div>
                <a href="">View ER Diagram</a>
                </div>
                <div>
                    <choose-file name="Upload" color="#1e90ff"></choose-file>
                </div>
                <div></div>

                <div>
                    <a href="">View Prototype</a>
                </div>
                <div>
                    <choose-file name="Upload" color="#1e90ff"></choose-file>
                </div>
                <div> 
                    <link-button name="Send to client" pathname="/"></link-button>
                </div>
                
                <div>
                    Notes<br>
                    <add-note></add-note>
                </div>
                <div></div>
                <div>
                    Assign Developers<br>
                    <link-button name="+ Assign Developer" pathname="/"></link-button>
                </div>
           </div>
        </div>       
     </admin-layout>
    `;
  }
}

customElements.define("project-design-page", ProjectDesigntPage);
