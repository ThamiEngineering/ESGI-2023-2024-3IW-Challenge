import Blink from "../../lib/composents/Blink.js";

export default class Form extends Blink.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            Blink.createElement("form",{}, Blink.createElement("input",{"type":"text","name":"login","placeholder":"Login"}),Blink.createElement("input",{"type":"password","name":"password","placeholder":"Password"}),Blink.createElement("button",{"type":"submit"}, `Valider`))
        );
    }
}