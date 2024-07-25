import Navbar from "../components/Navbar.js";
import Subtitle from "../components/Subtitle.js";
import SubtitleWithButton from "../components/SubtitleWithButton.js";
import TextHome from "../components/TextHome.js";
import Title from "../components/Title.js";
import Blink from "../../lib/composents/Blink.js";
import CardEvents from "../components/CardEvents.js";
import Footer from "../components/Footer.js";
import articlesScraper from '../scraper/news_scraper.js';

export default class HomePage extends Blink.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleEvents: [{}, {}, {}],
            currentIndex: 0,
            upcomingArticles: [],
            visibleArticles: [{}, {}, {}],
            currentIndexArticles: 0,
        }
        setTimeout(() => {
            this.handleNextArticle();
            this.handlePrevArticle();
        }, 1000);
    }

    async componentDidMount() {
        const images = await this.fetchImages();
        this.loadEventData(images);
        articlesScraper()
            .then(articles => {
                this.setState({ upcomingArticles: articles });
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    }

    async fetchImages() {
        try {
            const response = await fetch('https://olympics.com/fr/paris-2024/sites');
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const imageElements = doc.querySelectorAll('.CardItem-styles__ImageWrapper-sc-216dce93-1 img');
            const images = {};

            imageElements.forEach(element => {
                const venueName = element.closest('.CardItem-styles__Wrapper-sc-216dce93-20').querySelector('.sc-bdnyFh.card-title').innerText.trim();
                const imageUrl = element.src;
                images[venueName] = imageUrl;
            });

            return images;
        } catch (error) {
            console.error('Erreur lors de la récupération des images:', error);
            return {};
        }
    }

    simplifyName(name) {
        return name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
    }

    getImageForVenue(images, venueName) {
        const simplifiedVenueName = this.simplifyName(venueName);
        const keys = Object.keys(images);
        for (let key of keys) {
            if (simplifiedVenueName.includes(this.simplifyName(key)) || this.simplifyName(key).includes(simplifiedVenueName)) {
                return images[key];
            }

            if (simplifiedVenueName.includes('escalade') && simplifiedVenueName.includes('bourget')) {
                return images[keys.find(key => this.simplifyName(key).includes('escalade') && this.simplifyName(key).includes('bourget'))];
            }
            if (simplifiedVenueName.includes('tahiti') || simplifiedVenueName.includes('teahupo')) {
                return images[keys.find(key => this.simplifyName(key).includes('tahiti') || this.simplifyName(key).includes('teahupo'))];
            }
        }
        return '';
    }

    loadEventData(images) {
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
                    record.image = this.getImageForVenue(images, record.nom_site) || '../assets/images/Background.svg';
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

    handleNextEvents = () => {
        const { currentIndex, upcomingEvents } = this.state;
        if (currentIndex + 3 < upcomingEvents.length) {
            const newIndex = currentIndex + 3;
            const visibleEvents = upcomingEvents.slice(newIndex, newIndex + 3);
            this.setState({ currentIndex: newIndex, visibleEvents });
        }
    }

    handlePrevEvents = () => {
        const { currentIndex, upcomingEvents } = this.state;
        if (currentIndex - 3 >= 0) {
            const newIndex = currentIndex - 3;
            const visibleEvents = upcomingEvents.slice(newIndex, newIndex + 3);
            this.setState({ currentIndex: newIndex, visibleEvents });
        }
    }

    handleNextArticle = () => {
        const { currentIndexArticles, upcomingArticles } = this.state;
        if (currentIndexArticles + 3 < upcomingArticles.length) {
            const newIndex = currentIndexArticles + 3;
            const visibleArticles = upcomingArticles.slice(newIndex, newIndex + 3);
            this.setState({ currentIndexArticles: newIndex, visibleArticles });
        }
    }

    handlePrevArticle = () => {
        const { currentIndexArticles, upcomingArticles } = this.state;
        if (currentIndexArticles - 3 >= 0) {
            const newIndex = currentIndexArticles - 3;
            const visibleArticles = upcomingArticles.slice(newIndex, newIndex + 3);
            this.setState({ currentIndexArticles: newIndex, visibleArticles });
        }
    }

    render() {
        const { visibleEvents } = this.state;
        return (
            Blink.createElement("div", { "class":"bg-white w-full" }, Blink.createElement(Navbar, {}),Blink.createElement("div", { "class":"mt-2" }, Blink.createElement(Title, { "title":"Jeux olympiques 2024" }),Blink.createElement("div", { "class":"relative z-20 md:mx-[88px] mx-5 mt-12" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"background" , "class":"w-full h-auto" }))),Blink.createElement("div", { "class":"mt-10 lg:mt-40" }, Blink.createElement("div", {}, Blink.createElement(Subtitle, { "title":"Informations" })),Blink.createElement("div", { "class":"grid md:grid-cols-2 grid-cols-1 md:space-x-10 md:mx-[88px] mx-5" }, Blink.createElement("img", { "src":"../assets/images/Background.svg" , "alt":"img" , "class":"h-full w-auto object-cover mb-8" }),Blink.createElement(TextHome, { "title":"Retrouvez le meilleur des JO de Paris 2024" }))),Blink.createElement("div", { "class":"mt-10 lg:mt-40" }, Blink.createElement(SubtitleWithButton, { "title":"Événements à venir" }),Blink.createElement("div", { "class":"flex md:mx-[88px] mx-5 gap-10 grid grid-cols-1 md:grid-cols-3" },                                                     ...Array.from(                                { length: 3 },                                (_, index) => (                                    Blink.createElement(CardEvents, { title: visibleEvents[index].sports, image: visibleEvents[index].image })                                )                            )                        ),Blink.createElement("div", { "class":"flex gap-2 md:mx-[88px] mx-5 mt-4" }, Blink.createElement("button", { "onClick":this.handlePrevEvents, "class":"w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" }, Blink.createElement("i", { "class":"fa fa-chevron-left text-white" })),Blink.createElement("button", { "onClick":this.handleNextEvents, "class":"w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" }, Blink.createElement("i", { "class":"fa fa-chevron-right text-white" })))),Blink.createElement("div", { "class":"mt-10 lg:mt-40" }, Blink.createElement("div", { "class":"grid grid-cols-1 2xl:grid-cols-2 flex justify-between" }, Blink.createElement("div", {}, Blink.createElement(Subtitle, { "title":"Actualités" })),Blink.createElement("div", { "class":"flex flex-col" }, Blink.createElement("div", { "class":"grid grid-cols-1 md:grid-cols-3 flex-row gap-10 mx-5 md:mx-[88px]" },                                                                     ...Array.from(                                        { length: 3 },                                        (_, index) => (                                            Blink.createElement(CardEvents, { title: this.state.visibleArticles[index].title, image: this.state.visibleArticles[index].image })                                        )                                    )                                ),Blink.createElement("div", { "class":"flex gap-2 md:mx-[88px] mx-5 mt-4" }, Blink.createElement("button", { "onClick":this.handlePrevArticle, "class":"w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" }, Blink.createElement("i", { "class":"fa fa-chevron-left text-white" })),Blink.createElement("button", { "onClick":this.handleNextArticle, "class":"w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center" }, Blink.createElement("i", { "class":"fa fa-chevron-right text-white" })))))),Blink.createElement(Footer, {}))
        );
    }
}