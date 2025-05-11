const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

// Stocke l'identifiant dans le socket pour chaque utilisateur
io.on('connection', (socket) => {
  socket.anonId = 'Anonyme-' + Math.floor(Math.random() * 10000);

  socket.on('message', (msg) => {
    // Envoie à tout le monde, y compris l'expéditeur
    io.emit('message', { user: socket.anonId, text: msg });
  });
});

http.listen(3000, () => {
  console.log('Serveur chat anonyme sur http://localhost:3000');
});
