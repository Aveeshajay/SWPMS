class FinancePage extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
  
  
      <style>
          .page_container{
              position: absolute;
              margin-top: 10%;
              width: 85%;
              left: 15%;
          }
          
      </style>
 <admin-layout>
        <finance-content-page></finance-content-page>
  </admin-layout>
      `;
    }
  }
  
  customElements.define("finance-page", FinancePage);
  