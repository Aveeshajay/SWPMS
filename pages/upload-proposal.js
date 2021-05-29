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
        <form-textarea name="address" label="Address" rows="5" ></form-textarea>
        <form-textarea name="idea" label="Brief description" rows="2" ></form-textarea>
        <div class="top">
          <form-input type="text" name="tele" label="Phone Number" ></form-input>
        </div><br>
        <label for="category">Select category:</label>
        <select name="category" id="category">
          <option value="1">Software</option>
          <option value="2">E-Commerce Website</option>
          <option value="7">Android App</option>
          <option value="8">IOS app</option>
          <option value="9">Commercial Website</option>
          <option value="10">Other (Please specify in the description)</option>
        </select> <br><br><br>
        <div>
          <choose-file name="Upload proposal" color="var(--web3)"></choose-file>
        </div>
        <div class="right">
          <submit-button name="Submit Data" color="var(--web1)" width="100%"></submit-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>

`;

class UploadProposal extends HTMLElement {
  handleSubmit = async (e) => {
    e.preventDefault();
    const name = this._form.querySelector('form-input[name="name"]').value;
    const email = this._form.querySelector('form-input[name="email"]').value;
    const password = this._form.querySelector('form-input[name="password"]')
      .value;
    // const password2 = this._form.querySelector('form-input[name="password2"]').value;
    const nic = this._form.querySelector('form-input[name="nic"]').value;
    const address = this._form.querySelector('form-textarea[name="address"]')
      .value;
    const tele = this._form.querySelector('form-input[name="tele"]').value;
    const category = this._form.querySelector("#category").value;
    const path = this._filepath;
    const idea = this._form.querySelector('form-textarea[name="idea"]').value;

    if (!name) {
      alert("Name must be filled out");
      return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      alert("Please enter a valid Email Address");
      return;
    }

    if (!nic || (nic.length != 10 && nic.length != 12)) {
      alert("NIC number is incorrect");
      return false;
    }

    if (!tele || tele.length != 10) {
      alert("Phone number must be Ex:011265879");
      return false;
    }

    if (!address) {
      alert("Name must be filled out");
      return false;
    }

    if (!idea) {
      alert("Brief Description Field must be filled out");
      return false;
    }

    const data = {
      name,
      email,
      password,
      nic,
      tele,
      path,
      address,
      category,
      idea,
    };

    console.log(data);
    // return;

    this._submitBtn.loading = true;
    try {
      const res = await axios.post(`${api}/project/add-proposal`, data);
      if (res.data.type == "ERROR") {
        alert(res.data.err);
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

customElements.define("upload-proposal", UploadProposal);
