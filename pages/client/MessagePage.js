import { api } from "../../../config.js";
import axios from "../../../modules/axios.js";
import "../../components/Misc/FormInput.js";
import "../../components/Misc/LinkButton.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
      * {
        background-color: #eef1f5;
      }

      .page_container {
        padding-top: 50px;
      }

      .msg_window {
        border: 3px solid var(--web5);
        margin: 20px;
        height: 400px;
      }

      .client_msg {
        padding: 10px;
        background-color: var(--lightblue);
        border-radius: 10px;    
      }

      .admin_msg {
        padding: 10px;
        background-color: var(--lightgreen);
        border-radius: 10px;    
      }
      button {
          background-color: #1e90ff;
  		    border: none;
    		  color: white;
    		  padding: 10px 10px;
    		  font-size: 14px;
    		  cursor: pointer;
    		  text-align:center;
          width: 150px;
          font-family: 'KotoriRoseBold';
          margin-bottom: 20px;
        }
    </style>


    <client-layout>
      <div class="page_container">
            <link-button class="float-left" name="Go Back" pathname="/client"></link-button>
            <div class="clearfix pb-3"></div>
            
            <div class="msg_window">
            </div>
            <form-input name="msgbox"></form-input>
            <button class="button">Send</button>
            </div>
    </client-layout>

`;

class MessagePage extends HTMLElement {
  sendMessage = async () => {
    console.log("in here");
    const mesg = this.querySelector("form-input");
    const text = mesg.value;
    const id = sessionStorage.getItem("userId");

    const res = await axios.post(`${api}/client/send-message`, {
      client_id: id,
      client_msg: text,
    });

    this.querySelector(".msg_window").innerHTML = "";
    this.getClientMsg();
    mesg.value = "";

    /* console.log(res.data);
    mesg.value = "";*/
  };
  getClientMsg = async () => {
    const res = await axios.get(`${api}/client/get-client-msg`);
    const client = res.data;
    console.log(client);
    client.forEach((msg) => {
      if (msg.client_msg) {
        const card = `
          <div class="float-right client_msg"  >${msg.client_msg}</div>
          <div class="clearfix pt-3"></div>
        `;
        this.querySelector(".msg_window").insertAdjacentHTML("beforeend", card);
      } else if (msg.emp_msg) {
        const card = `
          <div class="float-left admin_msg"  >${msg.emp_msg}</div>
          <div class="clearfix pt-3"></div>
        `;
        this.querySelector(".msg_window").insertAdjacentHTML("beforeend", card);
      }
    });
  };

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));

    const send = this.querySelector("button");
    send.onclick = this.sendMessage;
    this.getClientMsg();
  }
}

customElements.define("message-page", MessagePage);
