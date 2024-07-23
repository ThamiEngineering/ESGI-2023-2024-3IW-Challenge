import Blink from "../../lib/composents/Blink.js";
import ButtonHome from "./ButtonHome.js";

export default class SubtitleWithButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div", { "class":"relative md:mb-10 md:mt-10 min-h-32" }, Blink.createElement("h1", { "class":"font-headline lg:text-9xl md:text-7xl text-4xl absolute xl:-top-5 md:-top-8 -top-4 left-0 opacity-5 z-0 text-black lg:ml-8 ml-8" }, this.props.title),Blink.createElement("div", { "class":"relative z-10 flex items-center md:ml-[90px] ml-5 h-full" }, Blink.createElement("div", { "class":"border-l-4 border-[#0078D0]" }, Blink.createElement("div", { "class":"flex flex-col" }, Blink.createElement("h1", { "class":"font-headline lg:text-[84px] md:text-[52px] text-[24px] relative z-10 md:ml-[16px] text-black ml-8" }, this.props.title),Blink.createElement(ButtonHome, { "title":"Voir plus d'événements" })))))
        );
    }
}