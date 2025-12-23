const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.render("index");
});
io.on('connection', (socket) => {
    socket.on('send-location', (data) => {
        io.emit('location-update', data);
        console.log('Location received:', {id: socket.id, ...data});
    });

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

