class AddNote extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = /*html*/ `
    <style>
      input[type=button]{
        background-color: #1e90ff;
        border: none;
        color:white;
        padding: 10px 10px;
        font-size: 14px;
        cursor: pointer;
        text-align:center;
        width: 150px;
        font-family: 'KotoriRoseBold';
        margin-bottom: 20px;
        display:inline-block
      }
    </style>
      <div id="dynamicCheck">
        <div id="newElementId"></div>
        <input type="button" value="+ Note" onclick="createAddNote();"/>
      </div> 
    `;

    this.shadowRoot.innerHTML = template;

    function createAddNote() {
    // First create a DIV element.
    var txtNewInputBox = document.createAddNote('div');
    // Then add the content (a new input box) of the element.
    txtNewInputBox.innerHTML = "<input type='text' id='newInputBox'>";
    // Finally put it where it is supposed to appear.
    document.getElementById("newElementId").appendChild(txtNewInputBox);
  }
 }
}
customElements.define("add-note" , AddNote);
