export class Component {
    constructor(props = {}) {
        this.props = props;
    }

    // Cette méthode sera surchargée par les sous-classes
    render() {
        throw new Error('Les sous-classes doivent implémenter la méthode render');
    }

    // Cette méthode compare les nouvelles props avec les anciennes
    shouldUpdate(newProps) {
        return JSON.stringify(this.props) !== JSON.stringify(newProps);
    }

    // Cette méthode met à jour les props si nécessaire et appelle render
    display(newProps) {
        if (this.shouldUpdate(newProps)) {
            this.props = newProps;
            return this.render();
        }
    }
}