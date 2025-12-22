const socket = io();
console.log('Client-side script loaded');


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        function(position){
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            socket.emit('send-location', { latitude, longitude });
        },
        (error)=>{
            alert('Error obtaining location. Make sure location services are enabled.');
            console.error('Error obtaining location:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
}


const map = L.map("map").setView([0, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
