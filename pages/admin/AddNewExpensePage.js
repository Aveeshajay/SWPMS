import "../../components/Misc/SubmitButton";
import "../../components/TextArea.js";

class AddNewExpensePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <style>
         .grid-container {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr;
          grid-gap: 10px;
          font-family: 'KotoriRose';
      }

      .grid-container > div {
          text-align: center;
          padding: 20px 0;
      }
      form-input{
          display: inline-block;
          margin-top: 5%;
      }
    </style>

      <admin-layout>

        <div class="grid-container">
          <div>
              <link-button name="Go Back" pathname="/admin/inprogress"></link-button>
          </div>
          <div>
            <h1 align="center">New Expense</h1>
          </div>
        </div>
          <center>
            <form-input type="text" name="ExpenseName" label="Expense Name" ></form-input>
            <form-input type="text" name="date" label="Date" ></form-input>
            <form-input type="text" name="amount" label="Amount" ></form-input>
          </center>   
          <div align="center">
            <submit-button name="Add"  color=" #1e90ff" width="150px"></submit-button>
          </div>
        </admin-layout>
      `;
  }
}

customElements.define("add-new-expense", AddNewExpensePage);
