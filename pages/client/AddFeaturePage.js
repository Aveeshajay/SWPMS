import "../../components/TextArea.js";
import "../../components/Misc/SubmitButton.js";
import "../../components/Misc/LinkButton.js";

class AddFeaturePage extends HTMLElement {
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
            <link-button name="Go Back" pathname="/client/project/features"></link-button>
        </div>
        <div>
          <h1 align="center">New Feature</h1>
        </div>
        <div></div>
      </div>
      <text-area></text-area>
      <div align="center">
        <submit-button name="Submit"  color=" #1e90ff" width="150px"></submit-button>
      </div>
    </client-layout>
       `;
    }
  }
  
  customElements.define("add-feature-page", AddFeaturePage);