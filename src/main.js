import HistoryRouter from "./lib/router/HistoryRouter.js";
import PageHome from "./pages/PageHome.js";
import PageAbout from "./pages/PageAbout.js";
import PageLogin from "./pages/PageLogin.js";
import Page404 from "./pages/Page404.js";

const root = document.getElementById("root");

const routes = {
    "/": PageHome,
    "/about": PageAbout,
    "/login": PageLogin,
    "*": Page404,
    // autres routes
};

HistoryRouter(routes, root);