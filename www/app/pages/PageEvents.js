import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import EventDetails from "../components/EventDetails.js";
import Navbar from "../components/Navbar.js";
import Title from "../components/Title.js";
import Subtitle from "../components/Subtitle.js";
import Footer from "../components/Footer.js";

export default class PageEvents extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{}, Blink.createElement(Navbar,{}),Blink.createElement("div",{"class":"my-12"}, Blink.createElement(Title,{"title":"Carte des événements"}),Blink.createElement("div",{"class":"relative z-20 mx-[88px]"}, Blink.createElement("img",{"src":"../assets/images/Background.svg","alt":"background","class":"h-full w-auto object-cover"}))),Blink.createElement("div",{"class":"my-12"}, Blink.createElement(Subtitle,{"title":"Prochain événement"}),Blink.createElement("div",{"class":" min-[769px]:grid min-[769px]:grid-cols-2 space-x-10 mx-[88px]"}, Blink.createElement("img",{"src":"../assets/images/Background.svg","alt":"img","class":"h-full w-auto object-cover"}),Blink.createElement(EventDetails,{"title":"Para triathlon (ptri)"}))),Blink.createElement("div",{"class":"my-12"}, Blink.createElement(Subtitle,{"title":"Événements à venir"}),Blink.createElement("div",{"class":"flex mx-[88px] gap-10 grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1"}, Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}))),Blink.createElement(Footer,{}))
        );
    }
}