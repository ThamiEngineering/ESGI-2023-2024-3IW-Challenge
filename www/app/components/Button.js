import Blink from "../../lib/composents/Blink.js";

export default class Button extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("button",{"class":"bg-blue-500 rounded-full w-[150px] h-[39px] text-white"}, this.props.text ?? "...")
        );
    };
}