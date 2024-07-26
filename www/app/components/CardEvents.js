import Blink from "../../lib/composents/Blink.js";

export default class CardEvents extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div", { "class":"card bg-base-100 shadow-md rounded-[10px]" }, Blink.createElement("figure", {}, Blink.createElement("img", { "src":this.props.image})),Blink.createElement("div", { "class":"card-body" }, Blink.createElement("h2", { "class":"card-title" }, this.props.title ?? "Chargement...")))
        )
    }
}