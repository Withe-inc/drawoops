const crypto = require('crypto');

export default class Game {

  constructor(sio, gameSocket, game_data) {
    this._io = sio;
    this._socket = gameSocket;
    this._data = game_data;
  }

  genHash() {
    var id = crypto.randomBytes(4).toString('hex');
    while (this._data.rooms[id]) {
      id = this.genHash()
    }
    return id
  }

  displayMessage(msg) {
    this._io.to(this._data.players[this._socket.id].room_id).emit('new message',
      msg.message);
  }

  hostGame() {
    var rm_id = this.genHash();

    this._socket.join(rm_id);
    var newPlayer = {
      name: 'dummy player',
      room_id: rm_id,
      host: true
    };

    var newRoom = {
      id: rm_id,
      players: new Set([this._socket.id]),
      started: false
    }

    this._data.rooms[rm_id] = newRoom;
    this._data.players[this._socket.id] = newPlayer;
    this._io.emit('meta_data', this._data.rooms, this._data.players);
    this._socket.emit('new room id', rm_id);
  }


  joinRoom(id) {
    let rm_id = id.substring(1,);
    if (this._data.rooms[rm_id]) {
      console.log('newly joined existing room')
      var newPlayer = {
        name: 'dummy',
        room_id: rm_id,
        host: false
      };
      this._socket.join(rm_id);
      this._data.players[this._socket.id] = newPlayer;
      console.log('adding a new player')
      this._data.rooms[rm_id].players.add(this._socket.id);
      // console.log(this._data.rooms[rm_id].players);
    }
    console.log("print meta_data")
    console.log(JSON.stringify(this._data.rooms))
    this._io.emit('meta_data', this._data.rooms, this._data.players)
  }

  gameListeners() {
    this._socket.on("enter room", this.joinRoom.bind(this));
    this._socket.on("chat message", this.displayMessage.bind(this));
    this._socket.on("host game", this.hostGame.bind(this));
  }


}

