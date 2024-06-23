import Component from '../../lib/composents/Component.js';
import Blink from "../../lib/composents/Blink.js";

export default class Button extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("button",{}, this.props.text ?? "")
        );
    };
}