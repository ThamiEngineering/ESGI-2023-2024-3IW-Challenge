import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import storage from "../../lib/utils/storage.js";

export default class ButtonSpots extends Blink.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        storage.setItem("spotDetails", this.props.spot);
    }

    render() {
        const path = `/spots/${this.props.spot.id}`;
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