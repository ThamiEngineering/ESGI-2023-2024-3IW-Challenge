export default class Component {
    constructor(props = {}) {
        this.props = props;
    }

    render() {
        throw new Error("You have to implement the method render!");
    }

    update() {
        throw new Error("You have to implement the method update!");
    }
}