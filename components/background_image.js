import backimage from '../../images/back.jpg';

class background_image extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const template = `

        <style>
            img{
                position: fixed;
                left: 0;
                top: 0;
                filter: blur(25px);
                z-index: -1;
            }
        </style>

        <img src="${backimage}" width="100%">

      `;
  
      this.shadowRoot.innerHTML = template;
    }
  }
  
  customElements.define("background-image", background_image);
  