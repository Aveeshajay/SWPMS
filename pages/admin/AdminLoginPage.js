import { api } from "../../../config.js";
import bg from "../../../images/bg.png";
import { go } from "../../../lib.js";
import axios from "../../../modules/axios.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
   * {
     font-family: 'KotoriRose';
   }

  img{
      transition: transform .5s;
      height: 100%;
      width: 100%;
  }
  
  .login-box{
    width: 400px;
    position: absolute;
    top: 50%;
    left: 80%;
    transform: translate(-50%,-50%);
    color: black;
  }
  .login-box h1{
    float: left;
    font-size: 40px;
    border-bottom: 6px solid black;
    margin-bottom: 50px;
    padding: 13px 0;
  }
  .textbox{
    width: 100%;
    overflow: hidden;
    font-size: 20px;
    padding: 8px 0;
    margin: 8px 0;
    border-bottom: 1px solid black;
  }
  
  .textbox input{
    border: none;
    outline: none;
    background: none;
    color:black;
    font-size: 18px;
    width: 80%;
    float: left;
    margin: 0 10px;
  }
  .btn{
    width: 100%;
    background: none;
    border: 2px solid  black;
    color: black;
    padding: 5px;
    font-size: 18px;
    cursor: pointer;
    margin: 12px 0;
  }
  ::placeholder {
    color: black;
    opacity: 1; 
  }


</style>

<img src="${bg}" />
<div align="left">
  <div class="login-box" >
  <h1>Login</h1>
  <div class="textbox">
  
  <input type="email" name="email" placeholder="Email" required>
  </div>

  <div class="textbox">
  
  <input type="password" name="password" placeholder="Password" required>
  </div>

  <input type="submit" class="btn" value="Login">
  </div>
  </div>
`;

class AdminLoginPage extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.querySelector('input[type="submit"]').onclick = this.handleSubmit;
  }

  handleSubmit = async (e) => {
    const email = this.querySelector('[name="email"]').value;
    const password = this.querySelector('[name="password"]').value;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      alert("Please enter a valid Email Address");
      return;
    }

    const res = await axios.post(
      `${api}/user/employee-login`,
      { email, password },
      { withCredentials: true }
    );
    if (res.data.canLogin === true) {
      sessionStorage.setItem("username", res.data.user.first_name);
      sessionStorage.setItem("userId", res.data.user.id);
      const userType = res.data.user.user_type;
      sessionStorage.setItem("userType", userType);
      go("/admin");
    } else {
      alert("Invalid Email or Password");
    }
  };
}

customElements.define("admin-login-page", AdminLoginPage);
