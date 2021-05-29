import { api } from "./config.js";
import axios from "./modules/axios.js";

export function main(routes, node) {
  let found = false;
  for (const route of routes) {
    let path = window.location.pathname;
    if (path[path.length - 1] === "/") {
      path = path.substring(0, path.length - 1);
    }

    const split = path.split("/");
    let newPath = [];
    split.forEach((item) => {
      const trimmed = item.trim();
      if (trimmed !== "") {
        if (!isNaN(trimmed)) {
          newPath.push(":id");
        } else {
          newPath.push(trimmed);
        }
      }
    });

    newPath = "/" + newPath.join("/");

    if (route.path === newPath) {
      const comp = document.createElement(route.component);
      node.appendChild(comp);
      found = true;
      break;
    }
  }

  if (found === false) {
    const comp = document.createElement("not-found-page");
    node.appendChild(comp);
  }
}

export const validateClient = async (ctx, commands) => {
  console.log("Validating route...");
  const res = await axios.get(`${api}/user/is-client-logged-in`, {
    withCredentials: true,
  });

  const isLoggedIn = res.data.loggedIn;

  if (isLoggedIn) {
    if (ctx.pathname === "/client/login") {
      window.location = "/client";
      return commands.redirect("/client");
    }
  } else {
    if (ctx.pathname !== "/client/login") {
      return commands.redirect("/client/login");
    }
  }
};

export async function validateEmployee(ctx, commands) {
  console.log("Validating route...");
  const res = await axios.get(`${api}/user/is-employee-logged-in`, {
    withCredentials: true,
  });

  const isLoggedIn = res.data.loggedIn;

  if (isLoggedIn) {
    if (ctx.pathname === "/admin/login") {
      return commands.redirect("/admin");
    }
  } else {
    if (ctx.pathname !== "/admin/login") {
      return commands.redirect("/admin/login");
    }
  }
}

export function getProjectId() {
  const pathname = window.location.pathname;
  const split = pathname.split("/");
  const id = parseInt(split[3]);
  return id;
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function go(pathname) {
  history.pushState({}, "", pathname);
}

export function getUserType() {
  return sessionStorage.getItem("userType");
}
