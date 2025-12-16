// server/simulator/gpsSimulator.js

import EventEmitter from "events";

class GPSSimulator extends EventEmitter {
  constructor() {
    super();

    // A mock bus route (Trichy → SASTRA)
    this.route = [
      { lat: 10.8340, lng: 78.6960 }, // Mambalasalai
      { lat: 10.8109, lng: 78.6850 }, // Palpannai
      { lat: 10.7749, lng: 78.7047 }, // Thiruverambur
      { lat: 10.7275, lng: 78.8200 }, // SASTRA University
    ];

    this.index = 0;
    this.interval = null;
  }

  start(intervalMs = 2000) {
    if (this.interval) return; // already running
    console.log("📡 GPS Simulation Started...");

    this.interval = setInterval(() => {
      const point = this.route[this.index];

      // Emit fake GPS location
      this.emit("locationUpdate", point);

      // Move to next point
      this.index = (this.index + 1) % this.route.length;
    }, intervalMs);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log("📡 GPS Simulation Stopped.");
    }
  }
}

export default GPSSimulator;
