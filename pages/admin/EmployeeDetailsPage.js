import avatar from "../../assets/images/avatar.png";
import "../../components/Misc/FormInput.js";
import "../../components/Misc/FormTextArea.js";
import "../../components/Misc/SubmitButton.js";

class  EmployeeDetailsPage extends HTMLElement {
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
      <h1 class="title">Aveesha Jayawardena</h1>
      <div class="page_container">
        <form>
          <div class="top">
            <img src=${avatar} />
            <div>
              <form-input type="text" name="name" label="First Name" value="Aveesha"></form-input>
              <form-input type="text" name="name" label="Last Name" value="Jayawardena"></form-input>
              <form-input type="email" name="email" label="Email" value="aveesha@gmail.com"></form-input>
              <form-input type="password" name="password" label="Password" value="199712"></form-input>
            </div>
          </div>
          <form-input type="text" name="tele" label="Phone Number" value="0718178456"></form-input>
          <form-input type="text" name="addr" label="Addess" value="Gampaha"></form-input>
          <form-input type="text" name="bs" label="Basic Salary" value="Rs.30000.00"></form-input>
          <form-input type="text" name="position" label="job Type" value="Frontend Developer"></form-input>
          <submit-button name="Update" color="var(--lightgreen)" width="10%"></submit-button>
          <button>Block</button>
        </form>
      </div>
    </admin-layout>
    `;
  }
}


  
  
  
  
  customElements.define("employee-details-page", EmployeeDetailsPage);
  