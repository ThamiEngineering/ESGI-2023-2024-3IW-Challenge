import Blink from "../../lib/composents/Blink.js";
import Navbar from "../components/Navbar.js";
import Title from "../components/Title.js";
import Subtitle from "../components/Subtitle.js";
import Footer from "../components/Footer.js";
import storage from "../../lib/utils/storage.js";
import SpotDetails from "../components/SpotDetails.jsx";

export default class PageSpotDetails extends Blink.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotDetails: {},
    };
    this.map = null;
    this.mapInitialized = false;
  }

  componentDidMount() {
    this.loadSpotData();
  }

  componentDidUpdate(prevProps, prevState) {
        this.initializeMap();
      
      this.addEventMarker(this.state.spotDetails);
    
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.mapInitialized = false;
    }
  }

  initializeMap() {
    let mapContainer = document.querySelector('#map');
    const { latitude, longitude } = this.state.spotDetails;
    if (mapContainer && latitude && longitude) {
      const lat = parseFloat(latitude.replace(',', '.'));
      const lon = parseFloat(longitude.replace(',', '.'));

      this.map = L.map(mapContainer).setView([lat, lon], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
      this.mapInitialized = true;
    } else {
      console.error('Map container or event coordinates not found');
    }
  }

  async loadSpotData() {
    const spotDetails = storage.getItem("spotDetails");
    this.setState({ spotDetails });
  }

  addEventMarker(spotDetails) {
    if (!this.map) {
      console.error('Map not initialized');
      return;
    }

    const { latitude, longitude, nom, adresse, description } = spotDetails;
    console.log("latitude: " + latitude + ", longitude: " + longitude);
    if (latitude && longitude) {
      const lat = parseFloat(latitude.replace(',', '.'));
      const lon = parseFloat(longitude.replace(',', '.'));

      const eventMarker = L.marker([lat, lon], {
        icon: L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })
      });

      eventMarker
        .addTo(this.map)
        .bindPopup(
          `<b>Nom</b><br>${nom}<br>
          <b>Adresse</b><br>${adresse}<br>
          <b>Description Site</b><br>${description}<br>
           <b>Latitude</b><br>${latitude}<br>
           <b>Longitude</b><br>${longitude}`
        );
    } else {
      console.warn('Missing coordinates for spot:', spotDetails);
    }
  }

  render() {
    const { spotDetails } = this.state;
    return (
      <div>
        <Navbar />
        <div class="my-12">
          <Title title="Carte des spots" />
          <div class="relative z-20 mx-[88px]">
            <div id="map" class="w-auto h-[508px]"></div>
          </div>
        </div>
        <div class="my-12">
          <Subtitle title="Spot" />
          <div class="min-[769px]:grid min-[769px]:grid-cols-2 space-x-10 mx-[88px]">
            <img
              src="../assets/images/Background.svg"
              alt="img"
              class="h-full w-auto object-cover"
            />
            <SpotDetails spot={spotDetails} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
