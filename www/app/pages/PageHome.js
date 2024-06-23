import Button from "../components/Button.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";
import { useState } from "../../lib/composents/state.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
    super(props);

    const [name, setName] = useState('Utilisateur Blink');
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
            Blink.createElement("div",{}, Blink.createElement("div",{"style":"display: flex; gap: 20px"}, Blink.createElement(Link,{"path":"/login","title":"Go to login !"}),Blink.createElement(Link,{"path":"/about"}, "PageAbout")),Blink.createElement("h1",{}, "Je suis sur ma page Home"),Blink.createElement("button",{"onClick":this.sayHi}, "Click me !"),Blink.createElement(Button,{}, "Simple button"),Blink.createElement(Button,{"text":"Autre exemple"}),Blink.createElement("div",{}, Blink.createElement("p",{}, this.name),Blink.createElement("p",{}, this.count),Blink.createElement("button",{"onClick":this.incrementCount}, "Incrémenter")))
        );
    }
}