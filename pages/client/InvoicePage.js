import "../../components/Misc/LinkButton.js";
import "../../components/Misc/TableLayout.js";

class InvoicePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
    <style>
      * {
        background-color: #eef1f5;
      }
      .page_container {
        padding-top: 50px;
      }
    </style>


    <client-layout>
      <div class="page_container">
          <link-button class="float-left" name="Go Back" pathname="client/project/1"></link-button>
          <link-button class="float-right" name="View" pathname=""></link-button>
          <link-button class="float-right pr-2" name="Add Payment" pathname="client/project/addinvoice"></link-button>
          <div class="clearfix pt-3"></div>
      </div>
    </client-layout>
     `;

    const columns = JSON.stringify([
      "#",
      "Invoice Number",
      "Date",
      "Payment Status",
    ]);
    const data = [
      { id: 1, adp: "Invoice 1", date: "2020-10-20", rs: "Paid" },
      { id: 2, adp: "Invoice 2", date: "2020-10-20", rs: "Not Paid" },
    ];

    const tableLayout = document.createElement("table-layout");
    tableLayout.setAttribute("columns", columns);
    tableLayout.setAttribute("title", "Invoices");
    tableLayout.rows = data;
    this.querySelector(".page_container").appendChild(tableLayout);
  }
}

customElements.define("invoice-page", InvoicePage);
