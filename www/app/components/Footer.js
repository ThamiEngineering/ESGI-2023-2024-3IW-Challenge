import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class Footer extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div", { "class":"navbar bg-black h-24 mt-10 relative flex justify-between" }, Blink.createElement("div", { "class":"" }, Blink.createElement("img", { "class":"h-9 z-40" , "src":"../assets/images/JOLogoWhite.svg" , "alt":"Logo" })),Blink.createElement("div", { "class":"gap-5" }, Blink.createElement(Link, { "class":"font-sansBold text-white" , "path":"/" , "title":"Accueil" }),Blink.createElement(Link, { "class":"font-sansBold text-white" , "path":"/events" , "title":"Evénements" })))
        );
    };
}