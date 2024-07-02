import Button from "../components/Button.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";
import Counter from "../components/Counter.js";
import Card from "../components/Card.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    sayHi() {
        alert('Hi !');
    }

    render() {
        return (
            Blink.createElement("div",{"class":"bg-blue-500"}, Blink.createElement("div",{"style":"display: flex; gap: 20px"}, Blink.createElement(Link,{"path":"/login","title":"Go to login !"}),Blink.createElement(Link,{"path":"/about"}, `PageAboutttt`)),Blink.createElement("h1",{}, `Je suis sur ma page Home`),Blink.createElement("button",{"onClick":this.sayHi}, `Click me !`),Blink.createElement(Button,{}, `Simple button`),Blink.createElement(Button,{"text":"Autre exemple"}),Blink.createElement(Counter,{"initialCount":10}),Blink.createElement(Card,{"title":"Notre section pour les fans olympiques","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel lectus ornare, efficitur ex a, sollicitudin nisi. Aliquam at fringilla nibh, et cursus ligula. Suspendisse id diam sapien.","img":"https://img.freepik.com/photos-gratuite/jeune-femme-archer-tenant-son-arc-visant-cible-concept-sport-loisirs_181624-50254.jpg?t"}))
        );
    }
}