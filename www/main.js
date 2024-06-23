import HistoryRouter from "./lib/router/HistoryRouter.js";

import PageHome from "./app/pages/PageHome.js";
import PageAbout from "./app/pages/PageAbout.js";
import PageLogin from "./app/pages/PageLogin.js";
import Page404 from "./app/pages/Page404.js";

const root = document.getElementById("root");

const routes = {
    "/": PageHome,
    "/about": PageAbout,
    "/login": PageLogin,
    "*": Page404,
    // autres routes
};

HistoryRouter(routes, root);