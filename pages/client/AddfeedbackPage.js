import "../../components/TextArea.js";
import "../../components/Misc/SubmitButton";
import "../../components/Misc/LinkButton.js";

class AddFeedbackPage extends HTMLElement {
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
            <link-button name="Go Back" pathname="/client/project/feedback"></link-button>
          </div>
        <div>
          <h1 align="center">New Feedback</h1>
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

  customElements.define("add-feedback-page", AddFeedbackPage);