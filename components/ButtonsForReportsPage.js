class ButtonsForReportsPage extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const template = `

      <style>
      
    
    a{
        position: absolute;
        padding: 20px;
        color: orange;
        text-decoration: none;
        letter-spacing: 2px;
        font-size: 1em;
        transition: 0.5s;
        z-index: 1;
        box-shadow: 1px 3px 8px rgba(0,0,0,.6);
        overflow: hidden;
    }
    span{
        position: absolute;
        display: block;
        width: 40%;
        height: 1100%;
        left: -40%;
        z-index: -1;
        bottom: -500%;
        background: orange;
        transition: 0.5s;
    }
    a:hover{
        color: #606060;
        z-index: 1;
    }
    a:hover span{
        transform: rotate(90deg);
        z-index: -1;
    }
    .report {
        position: relative;
        margin-top: -10%;
        margin-left: 5%;
        font-family: 'KotoriRose';
        color: #606060;
        letter-spacing: 1px;
        height: 50vh;
    }
    .report-heading {
        text-align: center;
        font-size: 4rem;
    }
    .report-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding-top: 100px;
        padding-bottom: 100px;
    }
    .report-grid > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .report-grid h3 {
        padding-top: 30px;
        font-size: 1.4rem;
        letter-spacing: 2px;
    }
    select{
        width: 10em;
        height: 2em;
        border-radius: 5px;
        color: #606060;
        letter-spacing:1px;
        box-shadow: 1px 3px 8px rgba(0,0,0,.6);
    }
    option{
        color: orange;
        letter-spacing:1px;
    }

    </style>


    <div class="report">
        <h1 class="report-heading">REPORTS</h1>

        <select name="project" id="project">
                <option value="proj1">project 1</option>
                <option value="proj2">project 2</option>
                <option value="proj3">project 3</option>
                <option value="proj4">project 4</option>
        </select>

        <div class="report-grid">
            <div>
                <a href="">
                    <span></span>
                        View P&L Report
                </a>
            </div>

            <div>
                <a href="">
                    <span></span>
                        View Revenue Report
                </a>
            </div>    
                
            <div>
                <a href="">
                    <span></span>
                        View Expenses Report
                </a>
            </div>
        </div>
	</div>


      

      `;
  
      this.shadowRoot.innerHTML = template;
    }
  }
  
  customElements.define("reports-page-button", ButtonsForReportsPage);
  