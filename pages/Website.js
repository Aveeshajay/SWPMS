import appicon from "../../images/app.png";
import swicon from "../../images/swdeve.png";
import Webicon from "../../images/webdeve.png";
import msgIllu from "../../src/assets/images/msgIllustration.svg";
import aboutIllu from "../../src/assets/images/about.svg";
import "../components/Website/HomeTop.js";

class Website extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `

    <style>
        #root {
            background-color: transparent;
        }
        .services {
            position: relative;
            margin-top: 8%;
            font-family: 'KotoriRose';
            color: #606060;
            letter-spacing: 1px;
            height: 80vh;
        }

        .services-heading {
            text-align: center;
            font-size: 4rem;
        }

        .services-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding-top: 100px;
            padding-bottom: 100px;
        }

        .services-grid > div {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .services-grid img {
            width: 300px;
            height: 300px;
            margin: 0 auto;
        }
        
        .services-grid p {
            width: 400px;
            margin: 0 auto;
            font-size: 0.8em;
        }

        .services-grid h3 {
            padding-top: 30px;
            font-size: 1.4rem;
            letter-spacing: 2px;
        }

        .con{
            position: relative;
            font-family: Arial;
            /*color: white;*/
            letter-spacing: 1px;
        }
        /* span{
            position: relative;
            margin: 11%;
            overflow: hidden;
        } */
        a{    
            text-decoration: none;
            font-family: arial;
            color: #606060;
            font-size: 20px;
            display: inline-block;
            padding: 20px 30px;
            overflow: hidden;
            transition: 0.2s;
        }
        /* .web{
            position: absolute;
            left: -1.5%;
        }
        .sw{
            position: absolute;
            left: 30%;
        }
        .app{
            position: absolute;
            left: 68%;
        } */
        .contact_container input[type=text], textarea{
            padding: 10px;
            margin: 8px;
            margin-left: 0;
            border:0;
            background-color: #f4faf8;
            opacity: 0.7;
            border-radius: 5px;
        }
        
        .contact_container{
            position: relative;
            width: 40%;
            margin: 5% auto;
            padding: 50px;
            background: rgba(254, 196, 45, .4);
            border-radius: 15px;
            box-shadow: 0px 5px 10px rgba(0,0,0,.5);
            font-family: 'KotoriRose';
            color: #666561;
        }

        .subB,.CanB{
            padding: 15px;
            width: 100px;
            color: white;
            background-color: #fd782d;
            border-radius: 5px;
            border: 0;
        }
        .subB:hover,.CanB:hover{
            cursor: pointer;
        }
        .about{
            position: relative; 
            width: 60%;
            margin: 0% auto;
            height: 90vh;
            padding: 100px;
            background: rgba(254, 196, 45, .2);
            /* top: 220%; */
            /* left: 20%; */
            border-radius: 10px;
            /*box-shadow: 0px 5px 10px rgba(0,0,0,.5);*/
            font-family: 'KotoriRose';
            /*color: white;	*/
        }
        .feedback{
            width: 40%;
            margin: 0 auto;
            padding: 50px;
            background: rgba(254, 196, 45, .4);
            margin-top: 20%;
            margin-bottom: 10%;
            left: 30%;
            border-radius: 15px;
            box-shadow: 0px 5px 10px rgba(0,0,0,.5);
            font-family: arial;
            color: #666561;	
        }

        img{
            transition: transform .5s;
        }
        img:hover{
            transform: scale(1.1);
            cursor: pointer;	
        }
        web-login-signup-button{
            position: relative;
            z-index: 1;
            /* top: 50%; */
            /* display: flex; */
            width: 100%;
        }
        web-nav-bar{
            position: fixed;
            z-index: 1;
        }

        #msgIllu {
            position: absolute;
            height: 70%;
            width: 70%;
            left: -60%;
            top: 30%;
        }
        #aboutIllu{
            position: absolute;
            height: 120%;
            width: 120%;
            right: -25%;
            top: -5%;
            z-index: -1;
            opacity: 0.2;
        }


    </style>

    <web-nav-bar></web-nav-bar>
    <home-top></home-top>
    <div id="ser" class="services">
    <h1 class="services-heading">OUR SERVICES</h1>
    <div class="services-grid">
        <div>
            <img src="${Webicon}" />
            <a href="">
                <h3>Web Development</h3>
            </a>
            <p>We have the ability to create, create and maintain websites. This includes areas such as web design, web publishing, web programming and database management.</p>
        </div>
        <div>
            <img src="${swicon}" />
            <a href="">
                <h3>Software Development</h3>
            </a>
            <p>We have the ability to conceive, specify, design, program, document, test, and troubleshoot applications related to the design and maintenance of applications, frames, or other software components.</p>
        </div>
        <div>
            <img src="${appicon}" />
            <a href="">
                <h3>App Development</h3>
            </a>
            <p>It is our responsibility to develop and modify the source code for software applications. These applications are intended to assist customers with computer tasks or programs.</p>
        </div>
    </div>
    </div>
    <div id="contactus" class="contact_container">
    <img src="${msgIllu}" id="msgIllu" />
    <h1 class="con" align="center">Contact Us</h1>
    <br>
    Please check that your email address is correct. We'll contact you within 24 Hours
    <table cellspacing="20px" align="center">
        <form>
            <tr>
                <td width="40%">Your name</td>
                <td><input type="text" name="name" size="52%"></td>
            </tr>
            <tr>
                <td>Your Email Address</td>
                <td><input type="text" name="email" size="52%"></td>
            </tr>
            <tr>
                <td style="position: absolute;">Message</td>
                <td><textarea name="msg" cols="40" rows="7"></textarea></td>
            </tr>
            <tr>
                <td colspan="2" align="center"><input type="submit" name="subB" value="SEND" class="subB">
                <input type="reset" name="cancelB" value="CANCEL" class="CanB">
                </td>
            </tr>
        </form>
    </table>
    </div>
    
    <div id="aboutus" class="about">
            <img src="${aboutIllu}" id="aboutIllu" />

    <h1 align="center">About Us</h1>
    <br><br><br>
    
   <br> <b> Who We Are </b> <br><br> 

Afterlogic Corporation is a technology corporation operating since 2002 and currently registered in Cheyenne, Wyoming. Our areas of specialization are COM/ActiveX and .NET email components development, email software development and software consulting. We're known worldwide for our award winning MailBee.NET Objects and MailBee Objects mailing components as well as for popular family of AfterLogic WebMail Pro PHP products. You've come to the right place if you need professionally implemented programming solutions for your business or hobby.

<br><br> <b> Our Team </b> <br><br> 

Only the best professionals in mail components who love what they do are employed by Afterlogic Corporation. Our development team has more than four years of experience in developing of e-mails components, by your request they can implement our applications with special functionality you need in your critical programming task. Our support team works hard to resolve any problems with our software, provides you with support that you need when you have technical questions and brings you the latest information regarding products updates. Please feel free to contact us if you have any questions.

<br><br> <b> Innovations </b> <br><br> 

Our MailBee.NET Objects, MailBee Objects and Afterlogic WebMail Pro PHP have become leaders in their category. It would not be possible without continuous empowering of our products with leading-edge technologies. Our components provide you with unique features which help you add even the most sophisticated email functionality into your application.

<br><br> <b> Our customers </b> <br><br> 

Our products and technical support always meet the requirements of our customers from degree students to huge multinational companies.

    </div>
    <div id="cusfeed" class="feedback">
    <h1 align=center>Customer Feedbacks</h1>
    <br><br><br>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione</p>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione</p>
    </div>

    `;
  }
}

customElements.define("web-page", Website);
