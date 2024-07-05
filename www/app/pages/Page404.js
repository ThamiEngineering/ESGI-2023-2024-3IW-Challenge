import Blink from "../../lib/composents/Blink.js";
import Navbar from "../components/Navbar.js";
import Button404 from "../components/Button404.js";
import TitleCenteredWithBg from "../components/TitleCenteredWithBg.js";

export default class Page404 extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{"class":"h-screen overflow-y-hidden"}, Blink.createElement(Navbar,{}),Blink.createElement("div",{"class":"flex flex-col justify-center items-center h-full w-full -mt-32"}, Blink.createElement(TitleCenteredWithBg,{"title":"404"}),Blink.createElement("h1",{"class":"font-headline text-9xl"}, `Cette page est introuvable`),Blink.createElement(Button404,{"title":"Retour"})))
        );
    }
}