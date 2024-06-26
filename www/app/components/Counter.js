// CounterComponent.js
import Blink from "../../lib/composents/Blink.js";

export default class CounterComponent extends Blink.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
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