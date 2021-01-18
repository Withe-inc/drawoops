'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var crypto = require('crypto');

var Game = function () {
  function Game(sio, gameSocket, game_data) {
    _classCallCheck(this, Game);

    this._io = sio;
    this._socket = gameSocket;
    this._data = game_data;
  }

  _createClass(Game, [{
    key: 'genHash',
    value: function genHash() {
      var id = crypto.randomBytes(4).toString('hex');
      while (this._data.rooms[id]) {
        id = this.genHash();
      }
      return id;
    }
  }, {
    key: 'displayMessage',
    value: function displayMessage(msg) {
      this._io.to(this._data.players[this._socket.id].room_id).emit('new message', msg.message);
    }
  }, {
    key: 'hostGame',
    value: function hostGame() {
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
      };

      this._data.rooms[rm_id] = newRoom;
      this._data.players[this._socket.id] = newPlayer;
      this._io.emit('meta_data', this._data.rooms, this._data.players);
      this._socket.emit('new room id', rm_id);
    }
  }, {
    key: 'joinRoom',
    value: function joinRoom(id) {
      var rm_id = id.substring(1);
      if (this._data.rooms[rm_id]) {
        console.log('newly joined existing room');
        var newPlayer = {
          name: 'dummy',
          room_id: rm_id,
          host: false
        };
        this._socket.join(rm_id);
        this._data.players[this._socket.id] = newPlayer;
        console.log('adding a new player');
        this._data.rooms[rm_id].players.add(this._socket.id);
        // console.log(this._data.rooms[rm_id].players);
      }
      console.log("print meta_data");
      console.log(JSON.stringify(this._data.rooms));
      this._io.emit('meta_data', this._data.rooms, this._data.players);
    }
  }, {
    key: 'gameListeners',
    value: function gameListeners() {
      this._socket.on("enter room", this.joinRoom.bind(this));
      this._socket.on("chat message", this.displayMessage.bind(this));
      this._socket.on("host game", this.hostGame.bind(this));
    }
  }]);

  return Game;
}();

exports.default = Game;