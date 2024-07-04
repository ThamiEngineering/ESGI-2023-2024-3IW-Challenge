import Button from "../components/Button.js";
import Navbar from "../components/Navbar.js";
import Subtitle from "../components/Subtitle.js";
import SubtitleWithButton from "../components/SubtitleWithButton.js";
import Text from "../components/Text.js";
import Title from "../components/Title.js";
import { HistoryLink as Link } from "../../lib/router/HistoryRouter.js";
import Blink from "../../lib/composents/Blink.js";
import Counter from "../components/Counter.js";
import CardEvents from "../components/CardEvents.jsx";

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
                    <div class="grid grid-cols-2 mx-[88px] gap-12">
                        <img src="../assets/images/Background.svg" alt="img" />
                        <Text title="Retrouvez le meilleur des JO de Paris 2024" />
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
                <div class="flex mt-10">
                    <div>
                        <Subtitle title="Actualités" />
                    </div>
                    <div class="grid grid-cols-3 flex-row gap-10 mr-[88px] ml-[200px]">
                        <CardEvents />
                        <CardEvents />
                        <CardEvents />
                    </div>
                </div>
                <div style="display: flex; gap: 20px">
                    <Link path="/login" title="Go to login !" />
                    <Link path="/about">PageAbout</Link>
                </div>
                <h1>Je suis sur ma page Home</h1>
                <button onClick={this.sayHi}>Click me !</button>
                <Button>Simple button</Button>
                <Button text="Autre exemple"></Button>
                <Counter initialCount={10} />
            </div>
        );
    }
}