import Button from "../components/Button.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";
import Counter from "../components/Counter.js";
import Card from "../components/Card.jsx";

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    sayHi() {
        alert('Hi !');
    }

    render() {
        return (
            <div class="bg-blue-500">
                <div style="display: flex; gap: 20px">
                    <Link path="/login" title="Go to login !" />
                    <Link path="/about">PageAboutttt</Link>
                </div>
                <h1>Je suis sur ma page Home</h1>
                <button onClick={this.sayHi}>Click me !</button>
                <Button>Simple button</Button>
                <Button text="Autre exemple"></Button>
                <Counter initialCount={10} />
                <Card title="Notre section pour les fans olympiques" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel lectus ornare, efficitur ex a, sollicitudin nisi. Aliquam at fringilla nibh, et cursus ligula. Suspendisse id diam sapien." img="https://img.freepik.com/photos-gratuite/jeune-femme-archer-tenant-son-arc-visant-cible-concept-sport-loisirs_181624-50254.jpg?t=st=1719938159~exp=1719941759~hmac=e5fc2d2189ce5444dd6427e5ea728326936efb3da769f7b04b59416a1059af00&w=996" />
                </div>
        );
    }
}