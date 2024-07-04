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
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Shoes!</h2>
                </div>
            </div>
        )
    }
}