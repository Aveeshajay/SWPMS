const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .table-wrapper {
      font-family: 'KotoriRoseBold';
      padding: 25px;
      background: #fff;
      box-shadow: 0 2px 7px 0px #7d8085;
    }

    .table-heading  {
      text-transform: uppercase;
      line-height: 30px;
      color: var(--darkgray);
    }

    .table {
        border-collapse: collapse;
        margin-bottom: 1rem;
        color: #797979;
        width: 100%;
        font-weight: 300;
        align:center;
      }
      
    th, td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #f2f2f2;
      line-height: 2rem;
    }
    
    th {
      color: var(--darkgray);
      font-weight: bold;
      letter-spacing: 3px;
    }

    td {
      font-family: 'KotoriRose';
    }

      button {
        background-color: var(--lightblue);
        /* box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); */
        border: 1px solid transparent;
        /* padding: 0.375rem 0.75rem; */
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 2px;
        font-family: 'KotoriRose';
        cursor: pointer;
        color: #fff;
        width:150px;
        /* margin-bottom: 20px; */
        /* margin-left: 80%; */
      }


  </style>
  <div class="table-wrapper">
    <div class="table-heading">
      <h3></h3>
    </div>
    <table class="table">
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
`;

class TableLayout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const columns = JSON.parse(this.getAttribute("columns"));
    this.shadowRoot.querySelector("h3").textContent = this.getAttribute(
      "title"
    );

    columns.forEach((col) => {
      const th = document.createElement("th");
      th.textContent = col;
      this.shadowRoot.querySelector("thead > tr").appendChild(th);
    });
  }

  set rows(values) {
    const tbody = this.shadowRoot.querySelector("tbody");
    values.forEach((val) => {
      const tr = `
        <tr>
          ${Object.keys(val)
            .map((key) => `<td>${val[key]}</td>`)
            .join("")}
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", tr);
    });
  }
}

customElements.define("table-layout", TableLayout);
