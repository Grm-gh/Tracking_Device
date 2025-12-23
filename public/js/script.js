const socket = io();

// Initialize map
const map = L.map("map").setView([20.5937, 78.9629], 5); // India

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Static Delhi marker
L.marker([28.6139, 77.2090])
  .addTo(map)
  .bindPopup("Delhi (Static Marker)");

// Dynamic markers
const markers = {};

// Live GPS
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (err) => console.error(err),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
  );
}

// Socket updates
socket.on("location-update", ({ id, latitude, longitude }) => {
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`User: ${id.slice(0, 5)}`);
  }
});
