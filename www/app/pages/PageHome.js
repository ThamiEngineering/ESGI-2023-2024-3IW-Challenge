import Button from "../components/Button.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
        const [name, setName] = this.useState('Compteur Blink');
        const [count, setCount] = this.useState(0);
        this.state = { name, setName, count, setCount };
    }

    incrementCount = () => {
        this.setCount(this.count + 1);
    }

    sayHi() {
        alert('Hi !');
    }

    render() {
        return (
            Blink.createElement("div",{}, Blink.createElement("div",{"style":"display: flex; gap: 20px"}, Blink.createElement(Link,{"path":"/login","title":"Go to login !"}),Blink.createElement(Link,{"path":"/about"}, "PageAbout")),Blink.createElement("h1",{}, "Je suis sur ma page Home"),Blink.createElement("button",{"onClick":this.sayHi}, "Click me !"),Blink.createElement(Button,{}, "Simple button"),Blink.createElement(Button,{"text":"Autre exemple"}),Blink.createElement("div",{}, Blink.createElement("p",{}, this.name),Blink.createElement("p",{}, this.count),Blink.createElement("button",{"onClick":this.incrementCount}, "Incrémenter")))
        );
    }
}