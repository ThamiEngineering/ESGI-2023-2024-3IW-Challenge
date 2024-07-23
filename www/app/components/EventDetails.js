import Blink from "../../lib/composents/Blink.js";
import ButtonEvents from "./ButtonEvents.js";

export default class EventDetails extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            Blink.createElement("div", { "class":"relative mb-4 min-h-32 mt-[15px]" }, Blink.createElement("div", { "class":"relative z-10 flex w-full h-full" }, Blink.createElement("div", { "class":"bg-blue-800 w-0.5 h-[328px] mr-4" }),Blink.createElement("div", {}, Blink.createElement("h1", { "class":"font-headline text-[64px] leading-[70px] text-black max-[1024px]:text-[42px] max-[1024px]:leading-10 max-[768px]:text-[50px] max-[768px]:pt-7 max-[768px]:leading-9  mb-4" }, this.props.event.sports),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "SITE"),Blink.createElement("p", {}, `${this.props.event.nom_site} (${this.props.event.code_site})`)),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "DATE DE DEBUT"),Blink.createElement("p", {}, this.props.event.start_date)),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "DATE DE FIN"),Blink.createElement("p", {}, this.props.event.end_date)),Blink.createElement(ButtonEvents, { "title":"Détails de l'événement" , "event":this.props.event}))))
        );
    }
}