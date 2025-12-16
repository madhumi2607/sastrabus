import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import mapboxgl from "mapbox-gl";
import busIcon from "../assets/bus.png";   // <-- BUS ICON

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FtaXJhajA0IiwiYSI6ImNtaWJmem1kdTExcnkyeHM0YmQya2t2bW4ifQ.bB_wZUZqezzQQe80NSzorw";

export default function TrackMyBus() {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [location, setLocation] = useState(null);

  // Protect route
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  // Init Mapbox Map
  useEffect(() => {
    if (mapRef.current) return; // prevent multiple init

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [78.7047, 10.7905],
      zoom: 13,
    });

    mapRef.current = map;

    // --- Custom Bus Marker ---
    const busElement = document.createElement("div");
    busElement.style.width = "40px";
    busElement.style.height = "40px";
    busElement.style.backgroundImage = `url(${busIcon})`;
    busElement.style.backgroundSize = "contain";
    busElement.style.backgroundRepeat = "no-repeat";

    markerRef.current = new mapboxgl.Marker({ element: busElement })
      .setLngLat([78.7047, 10.7905])
      .addTo(map);

  }, []);

  // Fetch GPS every 3 seconds
  useEffect(() => {
    if (!mapRef.current) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:5000/api/gps");
        const data = await res.json();

        if (data.success && data.location.lat) {
          const newPos = [data.location.lng, data.location.lat];
          setLocation(data.location);

          // Move marker
          markerRef.current.setLngLat(newPos);

          // Smooth camera follow
          mapRef.current.easeTo({
            center: newPos,
            duration: 1500,
          });
        }
      } catch (err) {
        console.log("GPS fetch error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="pt-20 pb-10">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Track My Bus
        </h1>

        <p className="text-center text-orange-500 mb-4">
          {location
            ? `Live Location: ${location.lat}, ${location.lng}`
            : "Fetching GPS..."}
        </p>

        <div
          ref={mapContainer}
          className="w-full max-w-6xl mx-auto rounded-xl shadow-xl border border-gray-700"
          style={{
            height: "600px",
            overflow: "hidden",
          }}
        ></div>
      </main>
    </div>
  );
}
