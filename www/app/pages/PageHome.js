import Button from "../components/Button.js";
import Navbar from "../components/Navbar.js";
import Subtitle from "../components/Subtitle.js";
import SubtitleWithButton from "../components/SubtitleWithButton.js";
import Text from "../components/Text.js";
import Title from "../components/Title.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";
import Counter from "../components/Counter.js";
import CardEvents from "../components/CardEvents.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    sayHi() {
        alert('Hi !');
    }

    render() {
        return (
            Blink.createElement("div",{"class":"bg-white"}, Blink.createElement(Navbar,{}),Blink.createElement("div",{"class":"my-12"}, Blink.createElement(Title,{"title":"Jeux olympiques 2024"}),Blink.createElement("div",{"class":"relative z-20 mx-[88px]"}, Blink.createElement("img",{"src":"../assets/images/Background.svg","alt":"background","class":"w-full h-auto"}))),Blink.createElement("div",{"clas":"my-12"}, Blink.createElement(Subtitle,{"title":"Informations"}),Blink.createElement("div",{"class":"grid grid-cols-2 mx-[88px] gap-12"}, Blink.createElement("img",{"src":"../assets/images/Background.svg","alt":"img"}),Blink.createElement(Text,{"title":"Retrouvez le meilleur des JO de Paris 2024"}))),Blink.createElement("div",{"class":"my-12"}, Blink.createElement(SubtitleWithButton,{"title":"Événements à venir"}),Blink.createElement("div",{"class":"flex mx-[88px] gap-10"}, Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}))),Blink.createElement("div",{"class":"flex mt-10"}, Blink.createElement("div",{}, Blink.createElement(Subtitle,{"title":"Actualités"})),Blink.createElement("div",{"class":"grid grid-cols-3 flex-row gap-10 mr-[88px] ml-[200px]"}, Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}),Blink.createElement(CardEvents,{}))),Blink.createElement("div",{"style":"display: flex; gap: 20px"}, Blink.createElement(Link,{"path":"/login","title":"Go to login !"}),Blink.createElement(Link,{"path":"/about"}, `PageAbout`)),Blink.createElement("h1",{}, `Je suis sur ma page Home`),Blink.createElement("button",{"onClick":this.sayHi}, `Click me !`),Blink.createElement(Button,{}, `Simple button`),Blink.createElement(Button,{"text":"Autre exemple"}),Blink.createElement(Counter,{"initialCount":10}))
        );
    }
}