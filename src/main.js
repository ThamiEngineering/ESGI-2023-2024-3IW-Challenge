import HistoryRouter from "./lib/router/HistoryRouter.js";

import PageHome from "./outputs/pages/PageHome.js";
import PageAbout from "./outputs/pages/PageAbout.js";
import PageLogin from "./outputs/pages/PageLogin.js";
import Page404 from "./outputs/pages/Page404.js";

const root = document.getElementById("root");

const routes = {
    "/": PageHome,
    "/about": PageAbout,
    "/login": PageLogin,
    "*": Page404,
    // autres routes
};

HistoryRouter(routes, root);