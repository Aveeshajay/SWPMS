// don't touch theses
import { go, main } from "./lib.js";
import "./modules/runtime.js";
import { adminRoutes, clientRoutes } from "./routes";
// import "./src/pages/AboutPage.js";
import "./src/pages/admin/admin-dashboard.js";
import "./src/pages/admin/AdminLoginPage.js";
import "./src/pages/admin/AssignDeveloper.js";
import "./src/pages/admin/ClientsDetailsPage.js";
import "./src/pages/admin/ClientsPage.js";
import "./src/pages/admin/EmployeeDetailsPage.js";
import "./src/pages/admin/EmployeePage.js";
import "./src/pages/admin/FinancePage.js";
import "./src/pages/admin/inprogress-projects.js";
import "./src/pages/admin/pending-projects.js";
import "./src/pages/admin/project-dashboard.js";
import "./src/pages/admin/project-designs.js";
import "./src/pages/admin/project-devtasks.js";
import "./src/pages/admin/project-maintenance.js";
import "./src/pages/admin/project-proposals.js";
import "./src/pages/admin/project-releases.js";
import "./src/pages/admin/project-requirements.js";
import "./src/pages/admin/project-tests.js";
import "./src/pages/admin/ProjectDesignPage.js";
import "./src/pages/admin/ProjectRequirementPage.js";
import "./src/pages/admin/rejected-proposals.js";
import "./src/pages/admin/ReportsPage.js";
import "./src/pages/admin/AddExpenses.js";
import "./src/pages/admin/AddNewExpensePage.js";
import "./src/pages/client/AddFeaturePage";
import "./src/pages/client/AddfeedbackPage";
import "./src/pages/client/AddInvoice";
import "./src/pages/client/AddIssuePage";
import "./src/pages/client/AgreementsPage";
import "./src/pages/client/ClientDashboardPage";
import "./src/pages/client/ClientLoginPage.js";
import "./src/pages/client/ClientProfilePage.js";
import "./src/pages/client/ClientProjectPage.js";
import "./src/pages/client/ClientProjectsPage.js";
import "./src/pages/client/FeaturesPage";
import "./src/pages/client/FeedbackPage";
import "./src/pages/client/InvoicePage";
import "./src/pages/client/IssuesPage";
import "./src/pages/client/MessagePage.js";
import "./src/pages/client/RequestProjectPage";
// import "./src/pages/client/SendmessagePage.js";
import "./src/pages/NotFoundPage.js";
import "./src/pages/upload-proposal.js";
import "./src/pages/UploadCV.js";
// import "./src/pages/TestPage.js";
import "./src/pages/Website.js";

const routes = [
  { path: "/", component: "web-page" },
  { path: "/about", component: "about-page" },
  { path: "/upload-proposal", component: "upload-proposal" },
  { path: "/upload-cv", component: "upload-cv" },
  ...clientRoutes,
  ...adminRoutes,
];

const root = document.getElementById("root");
main(routes, root);

window.document.addEventListener("click", (e) => {
  const path = e.composedPath();

  for (let i = 0; i < path.length; i++) {
    const target = path[i];
    if (
      target.nodeName &&
      target.nodeName.toLowerCase() === "a" &&
      !target.hash
    ) {
      e.preventDefault();
      go(target.href);
      root.innerHTML = ``;
      main(routes, root);
      break;
    }
  }
});

window.addEventListener("popstate", () => {
  root.innerHTML = ``;
  main(routes, root);
});

window.addEventListener("pushstate", () => {
  root.innerHTML = ``;
  main(routes, root);
});

history.pushState = ((f) =>
  function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    return ret;
  })(history.pushState);
