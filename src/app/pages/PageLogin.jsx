import Form from '../components/Form.js';
import Blink from "../../lib/composents/Blink.js";
import { HistoryLink as Link } from '../../lib/router/HistoryRouter.js';

export default class LoginPage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Vous êtes sur la page Login</h1>
                <Form />
                <Link path="/" title="PageHome" />
            </div>
        );
    }
}