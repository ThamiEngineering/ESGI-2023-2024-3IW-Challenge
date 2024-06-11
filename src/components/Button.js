import Component from '../lib/composents/Component.js';

export class Button extends Component {
    render() {
        const button = document.createElement('button');
        button.textContent = 'Cliquez ici';
        return button;
    }
}