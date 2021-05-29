import avatar from "../../assets/images/avatar.png";
import "../../components/Misc/FormInput.js";
import "../../components/Misc/FormTextArea.js";
import "../../components/Misc/SubmitButton.js";

class ClientProfilePage extends HTMLElement {
  connectedCallback() {
    const data = {
      name: "Client Name",
      email: "client@gmail.com",
      password: "123456",
      image: avatar,
      address:
        "Vestibulum vulputate bibendum erat, at ullamcorper magna euismod eu. Integer congue turpis velit, at maximus nulla tristique id. Donec porttitor, nulla et suscipit egestas, dui arcu malesuada erat, nec lobortis metus enim vitae arcu.",
    };

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

    </style>

    <client-layout>
      <h1 class="title">My Profile</h1>
      <div class="page_container">
        <form>
          <div class="top">
            <img src=${avatar} />
            <div>
              <form-input type="text" name="name" label="Full Name"></form-input>
              <form-input type="email" name="email" label="Email"></form-input>
              <form-input type="password" name="password" label="Password"></form-input>
            </div>
          </div>
          <form-textarea name="address" label="Address" rows="5"></form-textarea>
          <form-input type="text" name="tele" label="Phone Number"></form-input>
          <submit-button name="Update" color="var(--lightgreen)" width="10%"></submit-button>
        </form>
      </div>
    </client-layout>
    `;
  }
}

customElements.define("client-profile-page", ClientProfilePage);
