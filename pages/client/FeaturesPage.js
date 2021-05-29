import "../../components/Misc/TableLayout.js";
import "../../components/Misc/LinkButton.js";

class FeaturesPage extends HTMLElement {
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
            <link-button name="+ New Feature" pathname="client/project/addfeature"></link-button>
          </div>
        </div>
      <div>
    </client-layout>
    `;

    const columns = JSON.stringify(["#", "Feature", "Date", "Received/Sent"]);
    const data = [
      { id: 1, fet: "Message 1", date: "2020-10-20", rs: true },
      { id: 2, fet: "Message 2", date: "2020-10-20", rs: false },
    ];

    const tableLayout = document.createElement("table-layout");
    tableLayout.setAttribute("columns", columns);
    tableLayout.setAttribute("title", "Features");
    tableLayout.rows = data;
    this.querySelector(".page_container").appendChild(tableLayout);
  }
}
customElements.define("features-page", FeaturesPage);
