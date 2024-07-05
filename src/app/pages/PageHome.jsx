import Navbar from "../components/Navbar.js";
import Subtitle from "../components/Subtitle.js";
import SubtitleWithButton from "../components/SubtitleWithButton.js";
import TextHome from "../components/TextHome.jsx";
import Title from "../components/Title.js";
import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import Slider from "../components/Slider.js";
import Footer from "../components/Footer.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
    }

    sayHi() {
        alert('Hi !');
    }

    render() {
        return (
            <div class="bg-white">
                <Navbar />
                <div class="my-12">
                    <Title title="Jeux olympiques 2024" />
                    <div class="relative z-20 mx-[88px]">
                        <img src="../assets/images/Background.svg" alt="background" class="w-full h-auto" />
                    </div>
                </div>
                <div clas="my-12">
                    <Subtitle title="Informations" />
                    <div class="grid grid-cols-2 space-x-10 mx-[88px]">
                        <img src="../assets/images/Background.svg" alt="img" class="h-full w-auto object-cover" />
                        <TextHome title="Retrouvez le meilleur des JO de Paris 2024" />
                    </div>
                </div>
                <div class="my-12">
                    <SubtitleWithButton title="Événements à venir" />
                    <div class="flex mx-[88px] gap-10">
                        <CardEvents />
                        <CardEvents />
                        <CardEvents />
                    </div>
                </div>
                <div class="flex my-12">
                    <div>
                        <Subtitle title="Actualités" />
                    </div>
                    <Slider />
                </div>
                <Footer />
            </div>
        );
    }
}