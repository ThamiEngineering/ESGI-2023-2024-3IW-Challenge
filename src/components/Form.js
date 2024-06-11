import Component from '../lib/composents/Component.js';

export class Form extends Component {
    render() {
        const form = document.createElement('form');

        const loginInput = document.createElement('input');
        loginInput.type = 'text';
        loginInput.name = 'login';
        loginInput.placeholder = 'Login';

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.name = 'password';
        passwordInput.placeholder = 'Password';

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Valider';

        form.appendChild(loginInput);
        form.appendChild(passwordInput);
        form.appendChild(submitButton);

        return form;
    }
}