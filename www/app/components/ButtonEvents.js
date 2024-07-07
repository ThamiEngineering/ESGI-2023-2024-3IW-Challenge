import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class ButtonEvents extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const path = `/events/${this.props.id}`;
        console.log("Generated path:", path);
        return (
            Blink.createElement(Link,{"path":path}, Blink.createElement("button",{"class":"bg-blue-500 text-white flex items-center rounded-full py-2 px-6"}, `${this.props.title}`,Blink.createElement("i",{"class":"fa-solid fa-arrow-right ml-2"})))
        )
    }
}