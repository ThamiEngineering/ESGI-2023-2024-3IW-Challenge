import Blink from "../../lib/composents/Blink.js";

export default class Slider extends Blink.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            visibleItems: 3,
        };
    }

    goNext = () => {
        if (this.state.currentIndex < this.props.children.length - this.state.visibleItems) {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
        }
    };

    goPrev = () => {
        if (this.state.currentIndex > 0) {
            this.setState({ currentIndex: this.state.currentIndex - 1 });
        }
    };

    render() {
        // Calculer les articles à afficher
        const visibleChildren = this.props.children.slice(this.state.currentIndex, this.state.currentIndex + this.state.visibleItems);

        return (
            Blink.createElement("div",{}, Blink.createElement("div",{"class":"carousel rounded-box grid grid-cols-3 flex-row gap-10 mr-[88px] ml-[200px]"}, `
                    ${Array.from({ length: 6 }).map((_, index) => (
                        `,Blink.createElement("div",{"key":index,"class":"carousel-item card bg-base-100 shadow-md rounded-[10px]"}, Blink.createElement("figure",{}, Blink.createElement("img",{"src":"https://www.visiterlyon.com/var/site/storage/images/1/7/5/7/887571-1-fre-FR/2d31a632ff4b-Clbration-athltes-Club-2024-1-.webp","alt":"Shoes"})),Blink.createElement("div",{"class":"card-body"}, Blink.createElement("h2",{"class":"card-title"}, `Titre de l'article!`))),`
                    ))}
                `),Blink.createElement("div",{"class":"mr-[88px] ml-[200px]"}, Blink.createElement("button",{"onClick":this.goPrev,"class":"btn btn-circle","disabled":"{this.state.currentIndex "}, `❮`),Blink.createElement("button",{"onClick":this.goNext,"class":"btn btn-circle"}, `= this.props.children.length - this.state.visibleItems}>❯`)))
        );
    }
}