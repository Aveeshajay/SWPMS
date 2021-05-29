import "../../components/CardButton.js";
import "../../components/Misc/BoxCard.js";
import "../../components/Misc/Date.js";



class ClientProjectPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
    <style>
      .page_container{
          width: 100%;
          margin: 0 auto;
          margin-top: 50px;
      }
       
      .left{
        float:left;
        margin-bottom: 10px;
        display: inline-block !important;
      }

      .right{
        float:right !important;
        margin-bottom: 10px;
        display: inline-block !important;
      }

      .title {
        text-align: left;
        text-transform: uppercase;
        font-family: 'KotoriRoseBold';
        margin-top: 10px;
        display: block;
      }

      .clearfix {
        clear: both;
      }

      .dates {
        display: flex;
        justify-content: space-between;
      }

      .top {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-top: 20px
      }

      .bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-family: 'KotoriRoseBold';
      }

  </style>
  <client-layout>
    <div class="page_container">
      <div class="left">
        <link-button name="Go Back" pathname="/client/projects"></link-button>
      </div>
      <div class="clearfix"></div>
      <h1 class="title">Project #1</h1>
      <div class="dates">
        <div>
          <date-picker name="Start Date"></date-picker>
        </div>
        <div>
          <date-picker name="End Date"></date-picker>
        </div>
      </div>
      <div class="top">
        <box-card name="Requirements Gathering" color="var(--yellow)"></box-card>        
        <box-card name="Designing" color="var(--purple)"></box-card>        
        <box-card name="Development" color="var(--lightgreen)"></box-card>        
      </div>
      <div class="bottom">
        <box-card name="Testing" color="var(--pink)"></box-card>        
        <box-card name="Maintenance" color="var(--lightblue)"></box-card>        
      </div>
    </div>

  </client-layout>        
      
    `;
  }
}

customElements.define("client-project-page", ClientProjectPage);
