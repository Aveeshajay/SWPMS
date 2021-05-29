import "../../components/Misc/LinkButton.js";
import "../../components/Misc/TableLayout.js";

class AddExpenses extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
    <style>
      * {
        background-color: #eef1f5;
      }

      .page_container {
        padding-top: 5%;
        width: 100%;
      }


    </style>


      <admin-layout>
    <center>
      <div class="page_container">
            <link-button class="float-left" name="Go Back" pathname="/admin/inprogress"></link-button>
            <link-button class="float-right" name="+ New Expense" pathname="/admin/addNewExpense"></link-button>
            <div class="clearfix pb-3"></div>
      </div>
    </center>  
    
    </admin-layout>
    `;

    const columns = JSON.stringify(["#", "Expense name", "Date", "Amount"]);

    const data = [
      { id: 1, msg: "Search", date: "2020-09-10", rs: "6000" },
      { id: 2, msg: "Push notifications", date: "2020-09-20", rs: "15000" },
      { id: 3, msg: "Login", date: "2020-11-05", rs: "10000" },
      { id: 4, msg: "Edit profile", date: "2020-11-09", rs: "2600" },
      { id: 5, msg: "Payments", date: "2020-11-12", rs: "8000" },
      { id: 6, msg: "Calls", date: "2020-11-16", rs: "9500" },
    ];

    const tableLayout = document.createElement("table-layout");
    tableLayout.setAttribute("columns", columns);
    tableLayout.setAttribute("title", "Project Expenses");
    tableLayout.rows = data;
    this.querySelector(".page_container").appendChild(tableLayout);
  }
}

customElements.define("add-expenses", AddExpenses);
