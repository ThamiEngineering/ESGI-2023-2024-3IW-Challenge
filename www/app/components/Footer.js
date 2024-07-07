import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class Footer extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div", { "class":"navbar bg-black h-24" }, Blink.createElement("div", { "class":"flex-1" }, Blink.createElement("img", { "class":"h-9 px-20" , "src":"../assets/images/JOLogoWhite.svg" , "alt":"Logo" })),Blink.createElement("div", { "class":"flex-none" }, Blink.createElement("ul", { "class":"menu menu-horizontal px-20 text-white" }, Blink.createElement("li", {}, Blink.createElement(Link, { "class":"font-sansBold" , "path":"/" , "title":"Accueil" })),Blink.createElement("li", {}, Blink.createElement(Link, { "class":"font-sansBold" , "path":"/events" , "title":"Evénements" })))))
        );
    };
}