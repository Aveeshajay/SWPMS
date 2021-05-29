import "../../components/Misc/TableLayout.js";
import "../../components/Misc/LinkButton.js";

class IssuesPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
    <style>
      * {
        background-color: #eef1f5;
      }
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
      <div class="page_container">
        <div class="grid-container">
          <div>
            <link-button name="Go Back" pathname="client/project/1"></link-button>
          </div>
          <div></div>
          <div>
            <link-button name="+ New Issue" pathname="client/project/addissue"></link-button>
          </div>
        </div>
      </div>
    </client-layout>
    `;

    const columns = JSON.stringify(["#", "Issue", "Date", "Received/Sent"]);
    const data = [
      { id: 1, iss: "Message 1", date: "2020-10-20", rs: true },
      { id: 2, iss: "Message 2", date: "2020-10-20", rs: false },
    ];

    const tableLayout = document.createElement("table-layout");
    tableLayout.setAttribute("columns", columns);
    tableLayout.setAttribute("title", "Issues");
    tableLayout.rows = data;
    this.querySelector(".page_container").appendChild(tableLayout);
  }
}

customElements.define("issues-page", IssuesPage);
