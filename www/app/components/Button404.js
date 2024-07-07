import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class Button404 extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement(Link, { "path":"/" }, Blink.createElement("button", { "class":"bg-blue-500 text-white flex items-center rounded-full py-2 px-6 ml-[32px] mt-8" }, Blink.createElement("i", { "class":"fa-solid fa-arrow-left mr-2" }),                    this.props.title))
        )
    }
}