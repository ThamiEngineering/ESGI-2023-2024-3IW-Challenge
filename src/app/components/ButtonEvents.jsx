import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import storage from "../../lib/utils/storage.js";

export default class ButtonEvents extends Blink.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        storage.setItem("eventDetails", this.props.event);
    }

    render() {
        console.log(this.props);
        const path = `/events/${this.props.event.id}`;
        console.log("Generated path:", path);
        return (
            <Link path={path}>
                <button onClick={this.handleClick} class="bg-blue-500 text-white flex items-center rounded-full py-2 px-6">
                    {this.props.title}
                    <i class="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </Link>
        )
    }
}