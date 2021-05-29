import avatar from "../../assets/images/avatar.png";
import "../../components/Misc/FormInput.js";
import "../../components/Misc/FormTextArea.js";
import "../../components/Misc/SubmitButton.js";

class ClientsDetailsPage extends HTMLElement {
  connectedCallback() {
    

    this.innerHTML = /*html*/ `
    <style>
      .title {
        text-align: left;
        text-transform: uppercase;
        font-family: 'KotoriRoseBold';
        margin-top: 50px;
      }

      .page_container{
        margin-top: 20px;
        background-color: #fff;
        width: 95%;
        padding: 20px;
        box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
        padding: 20px 10px 40px;
      }

      .top {
        display: grid;
        grid-template-columns: 2fr 3fr;
        align-items: center;
      }

      img {
        width: 200px;
        height: 200px;
        padding: 10px;
        margin-left: 30px;
      }
      button {
        background-color: var(--lightgreen);
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        border: 1px solid transparent;
        /* padding: 0.375rem 0.75rem; */
        font-size: 0.875rem;
        line-height: 2;
        border-radius: 2px;
        font-family: 'KotoriRose';
        cursor: pointer;
        color: #fff;
        width:130px;
        }
    </style>

    <admin-layout>
      <h1 class="title">Sanoj Silva</h1>
      <div class="page_container">
        <form>
          <div class="top">
            <img src=${avatar} />
            <div>
              <form-input type="text" name="name" label="Full Name" value="Sanoj Silva"></form-input>
              <form-input type="email" name="email" label="Email" value="silvasanoj@gmail.com"></form-input>
              <form-input type="password" name="password" label="Password" value="123456"></form-input>
            </div>
          </div>
          <form-textarea name="address" label="Address" rows="5" value="Ragama/Gampaha"></form-textarea>
          <form-input type="text" name="tele" label="Phone Number" value=0726063810></form-input>
          <submit-button name="Update" color="var(--lightgreen)" width="10%"></submit-button>
          <button>Block</button>
        </form>
      </div>
    </admin-layout>
    `;
  }
}


  
  customElements.define("client-details-page", ClientsDetailsPage);
  