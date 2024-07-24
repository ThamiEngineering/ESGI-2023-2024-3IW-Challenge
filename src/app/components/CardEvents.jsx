import Blink from "../../lib/composents/Blink.js";

export default class CardEvents extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="card bg-base-100 shadow-md rounded-[10px]">
                <figure>
                    <img
                    src={this.props.image}
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{this.props.title ?? "Loading.."}</h2>
                </div>
            </div>
        )
    }
}