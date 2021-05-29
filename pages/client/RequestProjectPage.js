import "../../components/TextArea.js";
import "../../components/ChooseFile.js";
import "../../components/Misc/SubmitButton.js";

class RequestProjectPage extends HTMLElement {
    connectedCallback() {
      this.innerHTML =   /*html*/`
      <style>
         .grid-container {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr;
          grid-gap: 10px;
      }

      .grid-container > div {
          text-align: center;
          padding: 20px 0;
      }
    </style>


    <client-layout>
      <div class="grid-container">
        <div>
          <link-button name="Go Back" pathname="/client/projects"></link-button>
        </div>
        <div>
          <h1 align="center">Request New Project</h1>
        </div>
      </div>
      <text-area></text-area>
      <br>
      <div align="center">
        <choose-file name=" Upload Proposal" color=" #1e90ff"></choose-file><br>
        <submit-button name="Submit"  color=" #1e90ff" width="150px"></submit-button>
      </div>
    </client-layout>
    `;
    }
  }
  
  customElements.define("request-project-page", RequestProjectPage);