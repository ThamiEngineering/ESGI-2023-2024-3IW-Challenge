import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class Navbar extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div", { "class":"navbar bg-base-100 h-24 flex items-center justify-between md:px-[80px] px-5" }, Blink.createElement("div", { "class":"" }, Blink.createElement("img", { "class":"w-full h-9" , "src":"../assets/images/JOLogoColored.svg" , "alt":"Logo" })),Blink.createElement("div", { "class":"flex space-x-5" }, Blink.createElement(Link, { "class":"font-sansBold" , "path":"/" , "title":"Accueil" }),Blink.createElement(Link, { "class":"font-sansBold" , "path":"/events" , "title":"Evénements" })))
        );
    };
}