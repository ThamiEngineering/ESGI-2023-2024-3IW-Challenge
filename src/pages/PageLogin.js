import { Form } from '../components/Form.js';

export default function PageLogin() {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Vous êtes sur la page Login"));
    div.appendChild(h1);

    const form = new Form();
    div.appendChild(form.render());

    return div;
}