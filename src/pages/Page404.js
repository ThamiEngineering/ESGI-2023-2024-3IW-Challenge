import { HistoryLink as Link } from "../lib/router/HistoryRouter.js";

export default function Page404() {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Vous êtes sur la page 404"));
    div.appendChild(h1);
    div.appendChild(Link("/", "Retour à la page Home"));
    return div;
}