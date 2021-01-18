'use strict';

var players = {};
var rooms = {};

rooms['randomId236512'] = { // add an example starter room
  id: 'randomId236512',
  // name: 'Happy Box House Room',
  players: new Set([]),
  host: "abcdsa",
  started: false
};

players['fake player'] = {
  room_id: 'fakeroom123',
  name: 'hobbiton',
  host: false
};

exports.rooms = rooms;
exports.players = players;