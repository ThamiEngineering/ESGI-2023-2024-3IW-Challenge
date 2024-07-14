import Blink from "../../lib/composents/Blink.js";

export default class EventDetailsWithoutButton extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        console.log(this.props.event);
        return (
            Blink.createElement("div", { "class":"relative mb-4 min-h-32" }, Blink.createElement("div", { "class":"relative z-10 flex w-full h-full" }, Blink.createElement("div", { "class":"bg-blue-800 w-0.5 h-[296px] mr-4" }),Blink.createElement("div", {}, Blink.createElement("h1", { "class":"font-headline text-[64px] leading-[70px] text-black max-[1024px]:text-[42px] max-[1024px]:leading-10 max-[768px]:text-[36px] max-[768px]:pt-7 max-[768px]:leading-9 max-[426px]:text-[22px] mb-4" }, this.props.event.sports ?? "Loading.."),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "SITE"),Blink.createElement("p", {}, `${this.props.event.nom_site} (${this.props.event.code_site})` ?? "Loading..")),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "DATE DE DEBUT"),Blink.createElement("p", {}, this.props.event.start_date ?? "Loading..")),Blink.createElement("div", { "class":"mb-4" }, Blink.createElement("p", { "class":"text-xl bold" }, "DATE DE FIN"),Blink.createElement("p", {}, this.props.event.end_date ?? "Loading..")))))
        );
    }
}