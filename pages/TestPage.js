import image from "../assets/images/image.jpg";
import "../components/GoBackButton.js";

class TestPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

    <left-bar></left-bar>

    <center>
      <style>
        div {
          background-image: url(${image});
          background-size: cover;
          height: 200px;
          width: 200px;
        }
       </style>
      <go-back-button></go-back-button>
      <div>hello</div>
      <h2>My Test Page</h1> 
      <img src="${image}" width="200" height="200" />
    </center>
      
    `;
  }
}

customElements.define("test-page", TestPage);
