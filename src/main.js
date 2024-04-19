import HistoryRouter from "./lib/router/HistoryRouter.js";
import PageHome from "./pages/PageHome.js";
import Page404 from "./pages/Page404.js";

const root = document.getElementById("root");

const routes = {
    "/": PageHome,
    "*": Page404,
    // autres routes
};

HistoryRouter(routes, root);