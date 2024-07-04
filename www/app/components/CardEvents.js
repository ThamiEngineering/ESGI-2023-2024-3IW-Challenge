import Blink from "../../lib/composents/Blink.js";

export default class CardEvents extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{"class":"card bg-base-100 shadow-md rounded-[10px]"}, Blink.createElement("figure",{}, Blink.createElement("img",{"src":"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg","alt":"Shoes"})),Blink.createElement("div",{"class":"card-body"}, Blink.createElement("h2",{"class":"card-title"}, `Shoes!`)))
        )
    }
}