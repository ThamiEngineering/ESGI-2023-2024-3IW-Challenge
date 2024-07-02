import Blink from "../../lib/composents/Blink.js";
import Button from "./Button.js";

export default class Card extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{"class":"w-[848px] h-[760px] rounded-[10px] bg-white"}, Blink.createElement("img",{"src":this.props.img,"class":"h-[440px] w-[849px] rounded-[10px]"}),Blink.createElement("div",{"class":"h-[320px] w-[788.5] m-7 "}, Blink.createElement("h2",{"class":"text-[24px] h-[66px] font-semibold h-6 mb-7"}, `${this.props.title}`),Blink.createElement("p",{"class":"text-[20px] h-[90px] font-normal h-5 mb-7"}, `${this.props.content}`),Blink.createElement(Button,{"text":"En savoir plus"})))
        );
    }
}
