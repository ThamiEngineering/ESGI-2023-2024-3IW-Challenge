import Button from "../components/Button.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";
import { useState } from "../../lib/utils/state.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
    super(props);

    const [name, setName] = useState('Compteur Blink');
    const [count, setCount] = useState(0);

    this.name = name;
    this.setName = setName;
    this.count = count;
    this.setCount = setCount;
    }

    incrementCount = () => {
        this.setCount(this.count + 1);
    }

    sayHi() {
        alert('Hi !');
    }

    render() {
        return (
            <div>
                <div style="display: flex; gap: 20px">
                    <Link path="/login" title="Go to login !" />
                    <Link path="/about">PageAbout</Link>
                </div>
                <h1>Je suis sur ma page Home</h1>
                <button onClick={this.sayHi}>Click me !</button>
                <Button>Simple button</Button>
                <Button text="Autre exemple"></Button>
                <div>
                    <p>{this.name}</p>
                    <p>{this.count}</p>
                    <button onClick={this.incrementCount}>Incrémenter</button>
                </div>
            </div>
        );
    }
}