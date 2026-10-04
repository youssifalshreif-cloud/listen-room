const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static('public'));

const rooms = {}; // code -> sender socket id

io.on('connection', (s) => {
  s.on('create', (cb) => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    rooms[code] = s.id; s.data.code = code; s.join(code);
    cb(code);
  });
  s.on('join', (code, cb) => {
    const sender = rooms[code];
    if (!sender) return cb({ ok: false });
    s.join(code);
    io.to(sender).emit('request', s.id); // sender must approve
    cb({ ok: true });
  });
  s.on('approve', (id) => io.to(id).emit('approved'));
  s.on('deny', (id) => io.to(id).emit('denied'));
  s.on('signal', ({ to, data }) => io.to(to).emit('signal', { from: s.id, data }));
  s.on('disconnect', () => {
    const c = s.data.code;
    if (c && rooms[c] === s.id) { io.to(c).emit('ended'); delete rooms[c]; }
  });
});

server.listen(process.env.PORT || 3000, () => console.log('Running on http://localhost:3000'));
