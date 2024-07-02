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
            Blink.createElement("div",{"class":"bg-teal-500"}, Blink.createElement("div",{"style":"display: flex; gap: 20px"}, Blink.createElement(Link,{"path":"/login","title":"Go to login !"}),Blink.createElement(Link,{"path":"/about"}, `PageAbout`)),Blink.createElement("h1",{}, `Je suis sur ma page Home`),Blink.createElement("button",{"onClick":this.sayHi}, `Click me !`),Blink.createElement(Button,{}, `Simple button`),Blink.createElement(Button,{"text":"Autre exemple"}),Blink.createElement(Counter,{"initialCount":10}))
        );
    }
}