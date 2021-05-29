import "../../components/GoBackButton.js";
import "../../components/CardButton.js";

class ClientPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
   
    <left-bar></left-bar>
      
<style>
.left_bar{
  background-color: #252525;
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  height: 100%; 
  padding-top: 100px;
}
.left_bar a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 24px;
  color: #818181;
  display: block;
  margin:10px;
  font-family: arial;

}

.left_bar a:hover {
  color: #f1f1f1;
}
  
    .page_container{
        position: absolute;
        margin-top: 10%;
        width: 80%;
        left: 20%;
    }
    
</style>
    <div class="left_bar">
    <br>
    <a href="/features">Request New Features </a>
    <a href="/issues">Inform Issues </a>
    <a href="/invoice">Invoice </a>
    <a href="/agreements">Agreements </a>
    <a href="/feedback">Leave Feedback</a>
   
    </div>
         
      <div class="page_container">
      <p align="left"> <a href="/clientproject"><view-button name="Go Back"></view-button></a></p>
      <h1 align = "center"> Project #</h1>
      <card-button>
      
      </card-button></div>
      <div>

      
    `;
  }
}

customElements.define("client-page", ClientPage);
