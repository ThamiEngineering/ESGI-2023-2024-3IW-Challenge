import Navbar from "../components/Navbar.js";
import Subtitle from "../components/Subtitle.js";
import SubtitleWithButton from "../components/SubtitleWithButton.js";
import TextHome from "../components/TextHome.jsx";
import Title from "../components/Title.js";
import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import Footer from "../components/Footer.js";

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleEvents: [{}, {}, {}],
            currentIndex: 0
        }
    }

    componentDidMount() {
        this.loadEventData();
    }

    loadEventData() {
        const fetchAllPages = async () => {
            let allRecords = [];
            let page = 1;
            let pageSize = 10;
            let totalRecords = 0;
            let idCounter = 0;

            do {
                const response = await fetch(`https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
                const data = await response.json();
                console.log(`Fetched data for page ${page}:`, data);

                data.results.forEach(record => {
                    record.id = idCounter++;
                });

                allRecords = allRecords.concat(data.results);
                totalRecords = data.total_count;
                page++;
            } while (allRecords.length < totalRecords);

            return allRecords;
        };

        fetchAllPages().then(records => {
            console.log('All fetched records:', records);

            let upcomingEvents = records.filter(record => {
                const now = new Date();
                const startDate = new Date(record.start_date);
                return startDate >= now;
            });

            let nextEvent = upcomingEvents.reduce((closest, event) => {
                const eventDate = new Date(event.start_date);
                return (closest === null || eventDate < new Date(closest.start_date)) ? event : closest;
            }, null);

            const visibleEvents = upcomingEvents.slice(0, 3);

            console.log('Upcoming events:', upcomingEvents);
            console.log('Next event:', nextEvent);
            console.log('Visible events:', visibleEvents)

            this.setState({ nextEvent, upcomingEvents, visibleEvents });

        }).catch(error => console.error('Erreur lors du chargement des données:', error));
    }

    handleNext = () => {
        const { currentIndex, upcomingEvents } = this.state;
        if (currentIndex + 3 < upcomingEvents.length) {
            const newIndex = currentIndex + 3;
            const visibleEvents = upcomingEvents.slice(newIndex, newIndex + 3);
            this.setState({ currentIndex: newIndex, visibleEvents });
        }
    }

    handlePrev = () => {
        const { currentIndex, upcomingEvents } = this.state;
        if (currentIndex - 3 >= 0) {
            const newIndex = currentIndex - 3;
            const visibleEvents = upcomingEvents.slice(newIndex, newIndex + 3);
            this.setState({ currentIndex: newIndex, visibleEvents });
        }
    }

    render() {
        const { visibleEvents } = this.state;
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
                    <div class=" min-[769px]:grid min-[769px]:grid-cols-2 space-x-10 mx-[88px]">
                        <img src="../assets/images/Background.svg" alt="img" class="h-full w-auto object-cover mb-8 " />
                        <TextHome title="Retrouvez le meilleur des JO de Paris 2024" />
                    </div>
                </div>
                <div class="my-12">
                    <SubtitleWithButton title="Événements à venir" />
                    <div class="flex mx-[88px] gap-10 grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1">
                        {
                            ...Array.from(
                                { length: 3 },
                                (_, index) => (
                                    createElement(CardEvents, { title: visibleEvents[index].sports })
                                )
                            )
                        }
                    </div>
                    <div class="flex gap-2 mx-[88px] mt-4">
                    <button onClick={this.handlePrev} class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <i class="fa fa-chevron-left text-white"></i>
                        </button>
                        <button onClick={this.handleNext} class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <i class="fa fa-chevron-right text-white"></i>
                        </button>
                    </div>
                </div>
                <div class="min-[769px]:flex my-12">
                    <div>
                        <Subtitle title="Actualités" />
                    </div>
                    <div class="grid grid-cols-3 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1 flex-row gap-10 mr-[88px] ml-[200px] max-[768px]:mx-[88px]">
                        <CardEvents />
                        <CardEvents />
                        <CardEvents />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}