import appicon from "../../images/app.png";

class app_image extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = /*html*/ `

        <style>
        img{
            /* position: absolute;
            left: 75%;
            top: 52%; */
            transition: transform .5s;
        }
        img:hover{
            transform: scale(1.2);	
        }
        </style>

        <a href=""><img src="${appicon}" width="18%"></a>

      `;

    this.shadowRoot.innerHTML = template;
  }
}

customElements.define("app-icon-image", app_image);
