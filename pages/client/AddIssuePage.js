import "../../components/TextArea.js";
import "../../components/Misc/LinkButton.js";
import "../../components/Misc/SubmitButton";

class AddIssuePage extends HTMLElement {
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
            <link-button name="Go Back" pathname="/client/project/issues"></link-button>
        </div>
        <div>
          <h1 align="center">New Issue</h1>
        </div>
      </div>
      <text-area></text-area>
      <div align="center">
        <submit-button name="Submit"  color=" #1e90ff" width="150px"></submit-button>
      </div>
     </client-layout>
     `;
    }
  }
  
  customElements.define("add-issue-page", AddIssuePage);