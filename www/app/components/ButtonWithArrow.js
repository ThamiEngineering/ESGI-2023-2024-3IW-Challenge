import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";

export default class ButtonWithArrow extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement(Link,{"path":"/events/spots"}, Blink.createElement("button",{"class":"bg-blue-500 text-white flex items-center rounded-full py-2 px-6"}, `${this.props.title}`,Blink.createElement("i",{"class":"fa-solid fa-arrow-right ml-2"})))
        )
    }
}