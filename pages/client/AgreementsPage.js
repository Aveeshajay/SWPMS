import { api } from "../../../config.js";
import axios from "../../../modules/axios.js";
import "../../components/ChooseFile.js";
import "../../components/Misc/LinkButton.js";
import "../../components/Misc/SubmitButton";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>
      * {
        background-color: #eef1f5;
        font-family: 'KotoriRose';
      }
      .grid-container {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr;
          grid-gap: 10px;
      }

      .grid-container > div {
          padding: 20px 0;
      }
    </style>


    <client-layout>
      <div class="grid-container">
        <div>
          <link-button name="Go Back" pathname="client/project/1"></link-button>
          <h1 align = "center"> Project Agreements</h1>
        </div>
        <div>
        </div>
        <div></div>
        <div>
          <h2>1.Project Agreement</h2>
        </div>
        <div>
          <link-button name="View" pathname="client/project/1"></link-button>
        </div>
        <div><choose-file name=" Upload Signed Copy" color="#1e90ff"></choose-file></div>
        <div>
          <h2>2.Requirement Confirmation Agreement</h2>
        </div>
        <div>
          <link-button name="View" pathname="client/project/1"></link-button>
        </div>
        <div>
          <choose-file name=" Upload Signed Copy" color="#1e90ff"></choose-file>
        </div>
      </div>
    </client-layout>
    `;

class AgreementsPage extends HTMLElement {
  handleUpload = async (e, projectId) => {
    this._uploadBtn.loading = true;

    try {
      const data = new FormData();
      const file = this._uploadBtn.files[0];
      data.append("file", file);
      const pathRes = await axios.post(
        `${api}/project/upload-signed-agreement`,
        data,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      const filePath = pathRes.data.path;
      const res = await axios.post(
        `${api}/project/update-signed-agreement-path`,
        {
          // change later
          projectId: 24,
          filePath,
        }
      );
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
    this._uploadBtn = this.querySelector("choose-file");
    this._uploadBtn.shadowRoot
      .querySelector("input")
      .addEventListener("change", this.handleUpload);
  }
}

customElements.define("agreements-page", AgreementsPage);
