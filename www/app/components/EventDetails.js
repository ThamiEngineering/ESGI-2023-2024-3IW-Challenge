import Blink from "../../lib/composents/Blink.js";
import ButtonEvents from "./ButtonEvents.js";

export default class EventDetails extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            Blink.createElement("div", { "class":"relative mb-4 min-h-32" }, Blink.createElement("div", { "class":"relative z-10 flex w-full h-full" }, Blink.createElement("div", { "class":"bg-blue-800 w-0.5 h-[328px] mr-4" }),Blink.createElement("div", {}, Blink.createElement("h1", { "class":"font-headline md:text-[64px] text-[40px] text-black" }, this.props.event.sports),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "SITE"),Blink.createElement("p", {}, `${this.props.event.nom_site} (${this.props.event.code_site})`)),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "DATE DE DEBUT"),Blink.createElement("p", {}, this.props.event.start_date)),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "DATE DE FIN"),Blink.createElement("p", {}, this.props.event.end_date)),Blink.createElement(ButtonEvents, { "title":"Détails de l'événement" , "event":this.props.event}))))
        );
    }
}