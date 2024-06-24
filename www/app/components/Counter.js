// CounterComponent.js
import Blink from "../../lib/composents/Blink.js";
import { validateProps, PropValidators } from "../../lib/utils/propValidation.js";

export default class CounterComponent extends Blink.Component {
    constructor(props) {
        super(props);

        const propTypes = {
            initialCount: PropValidators.number,
        };
        validateProps(props, propTypes);

        this.state = { count: props.initialCount || 0 };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        this.setState({ count: this.state.count + 1 });
    }

    decrement() {
        this.setState({ count: this.state.count - 1 });
    }

    render() {
        return (
            Blink.createElement("div",{}, Blink.createElement("h2",{}, `Counter: ${this.state.count}`),Blink.createElement("button",{"onClick":this.increment}, `Increment`),Blink.createElement("button",{"onClick":this.decrement}, `Decrement`))
        );
    }
}