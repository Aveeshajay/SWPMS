import { api } from "../../../config.js";
import bg1 from "../../../images/bg1.jpg";
import { go } from "../../../lib.js";
import axios from "../../../modules/axios.js";
const template = /*html*/ `
    <style>
      * {
        font-family: 'KotoriRoseBold';
        color: 	 #007acc;
      }
      img{
            transition: transform .5s;
            height: 100%;
            width: 100%;
        }
       
    
      .login-form {
        position: absolute;
        right:60%;
        top: 50%;
        transform: translate(-50%, -50%);
        /* border: 1px solid #000; */
        padding: 100px 50px;
        box-shadow: 0 5px 10px 0px #7d8085;
        background:#80ccff;
      }

      h1 {
        text-align: center;
        font-size: 3rem;
      }

      label {
        display: block;
        margin-bottom: 5px;
      }

      .form-input {
        margin-bottom: 10px;
        padding: 5px;
      }

      input[type="text"], input[type="password"] {
        box-shadow: 0 2px 7px 0px #7d8085;
        line-height: 1.2;
        border-radius: 5px;
        padding: 5px 5px;
        border: 1px solid #f2f2f2;
        width: 100%;
      }

      input[type="text"], input[type="password"]:focus {
        outline: 0;
      }

      .submit-btn {
        width: 100%;
        margin: 10px 5px;
        padding: 7px;
        background-color:#007acc;
        border: 0;
        outline: 0;
        color: #fff;
        cursor: pointer;
      }

    </style>
<img src="${bg1}" />
    <div class="login-form">
      <form> 
        <h1>Login</h1>
        <div class="form-input">
          <label>Email</label>
          <input type="text" name="email" required />
        </div>
        <div class="form-input">
          <label>Password</label>
          <input type="password" name="password" required />
        </div>
        <input type="submit" value="Submit" class="submit-btn" />
      </form>
    </div>
`;

class ClientLoginPage extends HTMLElement {
  handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    const password = e.target.elements["password"].value;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      alert("Please enter a valid Email Address");
      return;
    }

    const res = await axios.post(
      `${api}/user/client-login`,
      { email, password },
      { withCredentials: true }
    );
    if (res.data.canLogin === true) {
      sessionStorage.setItem("username", res.data.user.name);
      sessionStorage.setItem("userId", res.data.user.id);
      go("/client");
    } else {
      alert("Invalid Email or Password");
    }
  };

  connectedCallback() {
    this.innerHTML = template;

    const form = this.querySelector("form");
    form.addEventListener("submit", this.handleSubmit);
  }
}

customElements.define("client-login-page", ClientLoginPage);
