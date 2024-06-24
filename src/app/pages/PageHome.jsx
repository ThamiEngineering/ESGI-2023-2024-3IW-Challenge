import Button from "../components/Button.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";
import Counter from "../components/Counter.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
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
                <Counter initialCount={10}/>
            </div>
        );
    }
}