import Navbar from "../components/Navbar.js";
import Subtitle from "../components/Subtitle.js";
import SubtitleWithButton from "../components/SubtitleWithButton.js";
import TextHome from "../components/TextHome.js";
import Title from "../components/Title.js";
import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import Footer from "../components/Footer.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    sayHi() {
        alert('Hi !');
    }

    render() {
        return (
            Blink.createElement("div",{"class":"bg-white"}, Blink.createElement(Navbar,{}),Blink.createElement("div",{"class":"my-12"}, Blink.createElement(Title,{"title":"Jeux olympiques 2024"}),Blink.createElement("div",{"class":"relative z-20 mx-[88px]"}, Blink.createElement("img",{"src":"../assets/images/Background.svg","alt":"background","class":"w-full h-auto"}))),Blink.createElement("div",{"clas":"my-12"}, Blink.createElement(Subtitle,{"title":"Informations"}),Blink.createElement("div",{"class":" min-[769px]:grid min-[769px]:grid-cols-2 space-x-10 mx-[88px]"}, Blink.createElement("img",{"src":"../assets/images/Background.svg","alt":"img","class":"h-full w-auto object-cover mb-8 "}),Blink.createElement(TextHome,{"title":"Retrouvez le meilleur des JO de Paris 2024"}))),Blink.createElement("div",{"class":"my-12"}, Blink.createElement(SubtitleWithButton,{"title":"Événements à venir"}),Blink.createElement("div",{"class":"flex mx-[88px] gap-10 grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1"}, Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}))),Blink.createElement("div",{"class":"min-[769px]:flex my-12"}, Blink.createElement("div",{}, Blink.createElement(Subtitle,{"title":"Actualités"})),Blink.createElement("div",{"class":"grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1 flex-row gap-10 mr-[88px] ml-[200px] max-[768px]:mx-[88px]"}, Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}))),Blink.createElement(Footer,{}))
        );
    }
}