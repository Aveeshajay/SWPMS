import "../ChooseFile.js";
import "../Misc/LinkButton";
const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
      button {
        background-color: var(--lightblue);
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        border: 1px solid transparent;
        /* padding: 0.375rem 0.75rem; */
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 2px;
        font-family: 'KotoriRose';
        cursor: pointer;
        color: #fff;
        margin: 4px;
      }
    .card {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr;
      align-items: center;
      background-color: #9494b8;
      padding: 20px;
      margin-top: 20px;
      /* margin-left: 30px; */
      /* width: 50%; */
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
      font-family: 'KotoriRose';
      border-radius: 10px;
    }

    .bugs{
      display: none;
      background-color: #f2f2f2;
      padding-left: 10px;
      padding-right: 10px;
    }

    .grid {
      display: grid;
      grid-template-columns: 2fr 2fr 2fr 2fr;
      width: 80%;
      border-bottom: 1px solid #f2f2f2;
    }

    .top {
      font-family: 'KotoriRoseBold';
      padding-bottom: 10px;
    }

    .project-status {
      color: green;
      background-color: #fff;
      border-radius: 10px;
      text-align: center;
    }


  </style>

  <div class="card">
   
    <div>
      <div>Test File</div>
      <a href="" class="project-test"></a>
    </div>
    <div></div>
    <div>
      <span>Status</span>
      <div class="project-status"></div>
    </div>
  </div>
  <div class="bugs">
    <h4>BUGS IDENTIFIED</h4>
    <div class="grid top">
      <div>Bug</div>
      <div>Status</div>
      <div>Assigned Developer</div>
    </div>
    <div class="grid">
      <div>Bug #1</div>
      <div>Fixed</div>
      <div>Dev1</div>
      <button>Update Status</button>
    </div>
    <div class="grid">
      <div>Bug #2</div>
      <div>Not Fixed</div>
      <button>Assign Developer</button>
      <button>Update Status</button>
    </div> 
  </div>
`;

class TestCaseCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const test = this.shadowRoot.querySelector(".project-test");
    test.textContent = this.getAttribute("test");

    const status = this.shadowRoot.querySelector(".project-status");
    status.textContent = this.getAttribute("status");
    if (this.getAttribute("status") === "Fail") {
      this.shadowRoot.querySelector(".bugs").style.display = "block";
      this.shadowRoot.querySelector(".project-status").style.color = "red";
    }
  }

  connectedCallback() {}
}
customElements.define("test-case-card", TestCaseCard);
