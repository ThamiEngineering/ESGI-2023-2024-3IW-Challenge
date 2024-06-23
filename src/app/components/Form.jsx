import Blink from "../../lib/composents/Blink.js";

export default class Form extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <input type="text" name="login" placeholder="Login" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Valider</button>
            </form>
        );
    }
}