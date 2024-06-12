import { HistoryLink as Link } from "../lib/router/HistoryRouter.js";

export default function Home() {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Je suis sur ma page Home"));
    div.appendChild(h1);
    div.appendChild(Link("/about", "Aller sur la page About"));

    return div;
}