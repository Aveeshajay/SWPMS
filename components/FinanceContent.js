class FinanceContent extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const template = `

    <style>
    
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
        a{
            position: absolute;
            padding: 15px;
            left: 35%;
            color: orange;
            text-decoration: none;
            letter-spacing: 2px;
            font-size: 30px;
            z-index: 1;
            box-shadow: 1px 3px 8px rgba(0,0,0,.6);
            transition: 0.5s;
            overflow: hidden;
        }
        span{
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            left: -100%;
            bottom: 0%;
            z-index: -1;
            background: orange;
            transition: 0.5s;
            mix-blend-mode: screen;        
        }
        a:hover{
            z-index: 1;
            color: #303030
        }
        a:hover span{
            z-index: -1;
            transform: translateX(100%);
        }
        .page_container {
            position: relative;
            margin-top: 5%;
            margin-left: 5%;
            font-family: 'KotoriRose';
            color: #606060;
            letter-spacing: 1px;
            height: 50vh;
        }
        .heading {
            text-align: center;
            font-size: 3rem;
        }
        

    </style>


    <div class="page_container">
          <h1 align="center" class="heading">Estimate Project Budget</h1>

          <center>
              <select name="project" id="project">
                <option value="proj1">project 1</option>
                <option value="proj2">project 2</option>
                <option value="proj3">project 3</option>
                <option value="proj4">project 4</option>
              </select>

              <br><br><br>
              <a href="">
                 <span></span>
                 Calculate Budget
              </a>

                  <br><br><br><br><br><br>

          <h1 align="center" class="heading">Calculate developer salary</h1>

              <select name="dev" id="dev">
                <option value="dev1">developer 1</option>
                <option value="dev2">developer 2</option>
                <option value="dev3">developer 3</option>
                <option value="dev4">developer 4</option>
              </select>

              <br><br><br>
              <a href="">
                 <span></span>
                 Calculate Salary
              </a>	
          </center>	
          <br><br><br><br><br><br>
          <h1 align="center" class="heading">Client's Payments</h1>
        <center>
          <br><br><br>
          <a href="">
             <span></span>
               Client Invoice
          </a>	
      </center>	


    </div>


      

      `;
  
      this.shadowRoot.innerHTML = template;
    }
  }
  
  customElements.define("finance-content-page", FinanceContent);
  