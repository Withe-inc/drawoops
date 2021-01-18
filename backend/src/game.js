
// var io;
// var socket;
var io;
var data;

// initialize events for socket to listen
exports.initGame = function (sio, gameSocket, gameData) {
  io = sio;
  this.socket = gameSocket;
  console.log('game socket id')
  console.log(this.socket.id)
  data = gameData;

  this.socket.on("enter room", joinRoom);
  this.socket.on("chat message", displayMessage);
  this.socket.on("host game", hostGame);
}

const displayMessage = (msg) => {
  console.log('displaying messages')
  io.to(data.players[this.socket.id].room_id).emit('new message', msg.message);
}

const hostGame = (rm_id) => {
  this.socket.join(rm_id);
  var newPlayer = {
    name: 'dummy player',
    room_id: rm_id,
    host: true
  };
  var newRoom = {
    id: rm_id,
    players: [this.socket.id],
    started: false
  }
  data.rooms[rm_id] = newRoom;
  data.players[this.socket.id] = newPlayer;
  console.log(JSON.stringify(data.rooms))
  console.log(JSON.stringify(data.players))
  io.emit('metadata', data.rooms, data.players);
}

const joinRoom = (rm_id) => {
  console.log('joining a room')
  if (data.rooms[rm_id]) {
    // if (!data.rooms[rm_id].players[socket.id]) {
    console.log('newly joined existing room')
    var newPlayer = {
      name: 'dummy',
      room_id: rm_id,
      host: false
    };
    this.socket.join(rm_id);
    data.players[this.socket.id] = newPlayer;
    data.rooms[rm_id].players.push(this.socket.id);
  }
  // }
  console.log("print metadata")
  console.log(JSON.stringify(data.rooms))
  io.emit('metadata', data.rooms, data.players)
}

