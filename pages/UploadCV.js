import { api } from "../../config.js";
import { go } from "../../lib.js";
import axios from "../../modules/axios.js";
import "../components/ChooseFile.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>

    .title {
      text-align: left;
      text-transform: uppercase;
      font-family: 'KotoriRoseBold';
      margin-top: 50px;
    }

    .page_container{
      margin-top: 20px;
      background-color: #f2f2f2;
      width: 80%;
      margin: 100px auto;
      padding: 20px;
      /* box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08); */
      box-shadow: 0 2px 7px 0px #7d8085;
      padding: 20px 20px 40px;
    }

    .top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }

    img {
      width: 200px;
      height: 200px;
      padding: 10px;
      margin-left: 30px;
    }

    .container {
      width: 100%;
      margin: 0 auto;
    }

    .right {
      float: right;
    }
    label{
        font-family: KotoriRose;
    }
    select{
        width: 20%;
        padding: 5px;
        box-sizing: border-box;
        border: 3px solid silver;
        border-radius: 3px;
        outline: none
        color: orange;
        font-family: KotoriRose;
    }

  </style>

  <web-nav-bar></web-nav-bar>
  <div class="container">
    <div class="page_container">
      <h1 class="title">Upload your proposal</h1>
      <form name="ProposalUploadFrom" onsubmit="return validateForm()">
        <div class="top">
            <form-input type="text" name="name" label="Your name" ></form-input>
            <form-input type="email" name="email" label="Email" ></form-input>
            <form-input type="password" name="password" label="Password" ></form-input>
            <form-input type="text" name="nic" label="NIC" ></form-input>
        </div>
        <div class="top">
          <form-input type="text" name="tele" label="Phone Number" ></form-input>
        </div>

        <div class="skills">
          <h4>My Skills</h4><br><br>
              <input type="checkbox" id="HTML" name="HTML" value="HTML">
                  <label for="vehicle1"> HTML</label><br>

              <input type="checkbox" id="js" name="js" value="js">
                  <label for="vehicle2"> js</label><br>

              <input type="checkbox" id="PHP" name="PHP" value="PHP">
                  <label for="vehicle3">PHP</label><br>

              <input type="checkbox" id="C" name="C" value="C">
                  <label for="vehicle1"> C</label><br>

              <input type="checkbox" id="c++" name="c++" value="c++">
                  <label for="vehicle2"> c++</label><br>
                  
              <input type="checkbox" id="c#" name="c#" value="c#">
                  <label for="vehicle3">c#</label><br>

              <input type="checkbox" id="Python" name="Python" value="Python">
                  <label for="vehicle1"> Python</label><br>

              <input type="checkbox" id="Java" name="Java" value="Java">
                  <label for="vehicle2"> Java</label><br>
                  
              <input type="checkbox" id="Bootstrap" name="Bootstrap" value="Bootstrap">
                  <label for="vehicle3">Bootstrap</label><br><br><br>    
        </div>

        <div>
          <choose-file name="Upload CV" color="var(--web3)"></choose-file>
        </div>
        
        <div class="right">
          <submit-button name="Submit Data" color="var(--web1)" width="100%"></submit-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>

`;

class UploadCV extends HTMLElement {
  handleSubmit = async (e) => {
    e.preventDefault();
    const name = this._form.querySelector('form-input[name="name"]').value;
    const email = this._form.querySelector('form-input[name="email"]').value;
    const password = this._form.querySelector('form-input[name="password"]').value;
    const nic = this._form.querySelector('form-input[name="nic"]').value;
    const tele = this._form.querySelector('form-input[name="tele"]').value;
    const path = this._filepath;


    if (name == "") {
      alert("Name must be filled out");
      return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      alert("Please enter a valid Email Address");
      return;
    }

    if (nic.length != 10 || nic.length != 12) {
      alert("NIC number is incorrect");
      return false;
    }

    if (tele.length != 10) {
      alert("Phone number must be Ex:011265879");
      return false;
    }
    
    if (address == "") {
      alert("Name must be filled out");
      return false;
    }


    const data = {
      name,
      email,
      password,
      nic,
      tele,
      path,
    };

    this._submitBtn.loading = true;
    try {
      const res = await axios.post(`${api}/project/add-proposal`, data);
      const data = res.data;
      if (data.type == 'ERROR') {
        alert(data.err);
        return;
      }

      alert(res.data.msg);
      go("/client/login");
      this._submitBtn.loading = false;
    } catch (err) {
      this._submitBtn.loading = false;
      console.log(err);
      alert(err.message);
    }
  };

  handleUpload = async () => {
    this._uploadBtn.loading = true;

    try {
      const data = new FormData();
      const file = this._uploadBtn.files[0];
      data.append("file", file);
      const res = await axios.post(`${api}/project/upload-proposal`, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      this._filepath = res.data.path;
      alert(res.data.msg);
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
    this._uploadBtn.loading = false;
  };

  connectedCallback() {
    //alert("Test");
    document.querySelector("#root").style.backgroundColor = "#fff";

    this.appendChild(template.content.cloneNode(true));

    this._form = this.querySelector("form");
    this._uploadBtn = this.querySelector("choose-file");
    this._submitBtn = this.querySelector("submit-button");

    this._submitBtn.addEventListener("click", this.handleSubmit);
    this._uploadBtn.shadowRoot
      .querySelector("input")
      .addEventListener("change", this.handleUpload);
  }
}

customElements.define("upload-cv", UploadCV);
