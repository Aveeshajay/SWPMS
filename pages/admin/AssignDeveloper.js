import "../../components/Misc/TableLayout.js";
import "../../components/Misc/LinkButton.js";
import "../../components/Misc/SelectDropdown.js";
import "../../components/TimeAssign.js";

class AssignDeveloper extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
    <style>
      * {
        background-color: #eef1f5;
       }
      .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 10px;
      }

      .grid-container > div {
          text-align: center;
          padding: 20px 0;
          font-family: 'KotoriRoseBold';
      }
    </style>


    <admin-layout>
      <div class="page_container">
        <div class="grid-container">
          <div></div>
          <div><h1>Assign Developer</h1></div>
          <div>
          </div>
           
          <div>
            <select-dropdown></select-dropddown> 
          </div>
          <div></div>
          <div>
            <time-assign></time-assign>
          </div>
        </div>
      <div>
    </admin-layout>
    `;

    const columns = JSON.stringify(["#", "Feature", "Date", "Received/Sent"]);
    const data = [
      { id: 1, fet: "Message 1", date: "2020-10-20", rs: true },
      { id: 2, fet: "Message 2", date: "2020-10-20", rs: false },
    ];

    const tableLayout = document.createElement("table-layout");
    tableLayout.setAttribute("columns", columns);
    tableLayout.setAttribute("title", "Developer Status");
    tableLayout.rows = data;
    this.querySelector(".page_container").appendChild(tableLayout);
  }
}
customElements.define("assign-developer-page", AssignDeveloper);
