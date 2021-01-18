"use strict";

// var io;
// var socket;
var io;
var data;

// initialize events for socket to listen
exports.initGame = function (sio, gameSocket, gameData) {
  io = sio;
  this.socket = gameSocket;
  console.log('game socket id');
  console.log(this.socket.id);
  data = gameData;

  this.socket.on("enter room", joinRoom);
  this.socket.on("chat message", displayMessage);
  this.socket.on("host game", hostGame);
};

var displayMessage = function displayMessage(msg) {
  console.log('displaying messages');
  io.to(data.players[undefined.socket.id].room_id).emit('new message', msg.message);
};

var hostGame = function hostGame(rm_id) {
  undefined.socket.join(rm_id);
  var newPlayer = {
    name: 'dummy player',
    room_id: rm_id,
    host: true
  };
  var newRoom = {
    id: rm_id,
    players: [undefined.socket.id],
    started: false
  };
  data.rooms[rm_id] = newRoom;
  data.players[undefined.socket.id] = newPlayer;
  console.log(JSON.stringify(data.rooms));
  console.log(JSON.stringify(data.players));
  io.emit('metadata', data.rooms, data.players);
};

var joinRoom = function joinRoom(rm_id) {
  console.log('joining a room');
  if (data.rooms[rm_id]) {
    // if (!data.rooms[rm_id].players[socket.id]) {
    console.log('newly joined existing room');
    var newPlayer = {
      name: 'dummy',
      room_id: rm_id,
      host: false
    };
    undefined.socket.join(rm_id);
    data.players[undefined.socket.id] = newPlayer;
    data.rooms[rm_id].players.push(undefined.socket.id);
  }
  // }
  console.log("print metadata");
  console.log(JSON.stringify(data.rooms));
  io.emit('metadata', data.rooms, data.players);
};