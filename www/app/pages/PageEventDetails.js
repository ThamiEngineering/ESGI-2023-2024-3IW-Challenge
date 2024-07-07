import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import EventDetailsWithoutButton from "../components/EventDetailsWithoutButton.js";
import Navbar from "../components/Navbar.js";
import Title from "../components/Title.js";
import Subtitle from "../components/Subtitle.js";
import Footer from "../components/Footer.js";

export default class PageEventDetails extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div", {}, Blink.createElement(Navbar, {}),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Title, { "title":"Carte des spots de l'événement" }),Blink.createElement("div", { "class":"relative z-20 mx-[88px]" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"background" , "class":"h-full w-auto object-cover" }))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Événement" }),Blink.createElement("div", { "class":"grid grid-cols-2 mx-[88px] gap-8" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"img" , "class":"h-full w-auto object-cover" }),Blink.createElement(EventDetailsWithoutButton, { "title":"Para triathlon (ptri)" }))),Blink.createElement("div", { "class":"my-12" }, Blink.createElement(Subtitle, { "title":"Spots de l'événement" }),Blink.createElement("div", { "class":"flex mx-[88px] gap-10" }, Blink.createElement(CardEvents, {}),Blink.createElement(CardEvents, {}),Blink.createElement(CardEvents, {}))),Blink.createElement(Footer, {}))
        );
    }
}