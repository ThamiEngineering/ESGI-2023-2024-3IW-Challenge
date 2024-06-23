import Form from '../components/Form.js';
import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from '../../lib/router/HistoryRouter.js';

export default class LoginPage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("div",{}, Blink.createElement("h1",{}, `Vous êtes sur la page Login`),Blink.createElement(Form,{}),Blink.createElement(Link,{"path":"/","title":"PageHome"}))
        );
    }
}