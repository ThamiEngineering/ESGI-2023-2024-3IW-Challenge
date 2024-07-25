import Blink from "../../lib/composents/Blink.js";

export default class EventDetailsWithoutButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        console.log(this.props.event);
        return (
            Blink.createElement("div", { "class":"relative mb-4 min-h-32" }, Blink.createElement("div", { "class":"relative z-10 flex w-full h-full" }, Blink.createElement("div", { "class":"bg-blue-800 w-0.5 h-[296px] mr-4" }),Blink.createElement("div", { "class":"font-poppins" }, Blink.createElement("h1", { "class":"font-headline md:text-[64px] text-[40px] text-black" }, this.props.event.sports ?? "Loading.."),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl font-bold" }, "SITE"),Blink.createElement("p", { "class":"font-normal" }, `${this.props.event.nom_site} (${this.props.event.code_site})` ?? "Loading..")),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl font-bold" }, "DATE DE DEBUT"),Blink.createElement("p", { "class":"font-normal" }, this.props.event.start_date ?? "Loading..")),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl font-bold" }, "DATE DE FIN"),Blink.createElement("p", { "class":"font-normal" }, this.props.event.end_date ?? "Loading..")))))
        );
    }
}