'use strict';

const users = [
  {
    _id: '222222222222222222222200',
    firstName: 'Johnny',
    lastName: 'Salt',
    username: 'johnnysalt',
    password: '$2a$10$F3WxoCmNFelMJuUbFMTXWO.nrEhQg1GNfuwgItE3l6fb8Bfso0cLa'
  },
  {
    _id: '333333333333333333333300',
    firstName: 'Bob',
    lastName: 'User',
    username: 'bobuser',
    // hash digest for the string 'password'
    password: '$2a$10$0S5GdCkGJTDeaAH272/bmeZmmpC4rv6ItXIOZKwVQIfQOqSURhkhu'
  },
  {
    _id: '5c3f5ca9ec37422f44bdaa82',
    firstName: 'thejohnny',
    lastName: 'salt',
    username: 'thejohnnysalt',
    password: '$2a$10$hpBGDg4mlyzVM/7g4staJuA4fuaznzY64b6/s0SwkLWrblT7vEgDK'
  }
];

const games = [
  {
    'name': 'Candy Crush Saga',
    'igdbId': 5636,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/u9s7ap9gi5kestfxhxdf.jpg',
    'createdAt': '2019-03-26T21:11:55.508Z',
    'updatedAt': '2019-03-26T21:11:55.508Z',
    'id': '5c9a959ba5d0dd09e07f45a7'
  },
  {
    'name': 'Final Fantasy VII',
    'igdbId': 427,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/idzdf1alxvetz3ow2ugy.jpg',
    'createdAt': '2019-03-26T21:11:55.508Z',
    'updatedAt': '2019-03-26T21:11:55.508Z',
    'id': '5c9a959ba5d0dd09e07f45a4'
  },
  {
    'name': 'Halo: Combat Evolved',
    'igdbId': 740,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg',
    'createdAt': '2019-03-26T21:11:55.508Z',
    'updatedAt': '2019-03-26T21:11:55.508Z',
    'id': '5c9a959ba5d0dd09e07f45a2'
  },
  {
    'name': 'Mortal Kombat',
    'igdbId': 1618,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg',
    'createdAt': '2019-03-26T21:11:55.508Z',
    'updatedAt': '2019-03-26T21:11:55.508Z',
    'id': '5c9a959ba5d0dd09e07f45a0'
  },
  {
    'name': 'Street Fighter II',
    'igdbId': 3186,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg',
    'createdAt': '2019-03-26T21:11:55.508Z',
    'updatedAt': '2019-03-26T21:11:55.508Z',
    'id': '5c9a959ba5d0dd09e07f45a1'
  },
  {
    'name': 'Super Mario 64',
    'igdbId': 1074,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/scutr4p9gytl4txb2soy.jpg',
    'createdAt': '2019-03-26T21:11:55.506Z',
    'updatedAt': '2019-03-26T21:11:55.507Z',
    'id': '5c9a959ba5d0dd09e07f459e'
  },
  {
    'name': 'Super Smash Bros.',
    'igdbId': 1626,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/co1hzi.jpg',
    'createdAt': '2019-03-26T21:11:55.508Z',
    'updatedAt': '2019-03-26T21:11:55.508Z',
    'id': '5c9a959ba5d0dd09e07f45a6'
  },
  {
    'name': 'Superman',
    'igdbId': 3005,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/wej8g7hq46wb0ueyblin.jpg',
    'createdAt': '2019-03-26T21:11:55.508Z',
    'updatedAt': '2019-03-26T21:11:55.508Z',
    'id': '5c9a959ba5d0dd09e07f45a3'
  },
  {
    'name': 'The Legend of Zelda',
    'igdbId': 1022,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/bfeef9eun1ybhuwufqxm.jpg',
    'createdAt': '2019-03-26T21:11:55.507Z',
    'updatedAt': '2019-03-26T21:11:55.507Z',
    'id': '5c9a959ba5d0dd09e07f459f'
  },
  {
    'name': 'WWF No Mercy',
    'igdbId': 3644,
    'coverUrl': 'https://images.igdb.com/igdb/image/upload/t_720p/clajigg1q7mm9uxz14kx.jpg',
    'createdAt': '2019-03-26T21:11:55.508Z',
    'updatedAt': '2019-03-26T21:11:55.508Z',
    'id': '5c9a959ba5d0dd09e07f45a5'
  }
];

const histories = [
  {
    '_id': '222222222222222222222200',
    'userId': '333333333333333333333300',
    'gameOne': '5c9a959ba5d0dd09e07f45a5',
    'gameTwo': '5c9a959ba5d0dd09e07f459f',
    'choice': '5c9a959ba5d0dd09e07f459f'
  },
  {
    '_id': '222222222222222222222201',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'gameOne': '5c9a959ba5d0dd09e07f45a6',
    'gameTwo': '5c9a959ba5d0dd09e07f459e',
    'choice': '5c9a959ba5d0dd09e07f45a6'
  },
  {
    '_id': '222222222222222222222202',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'gameOne': '5c9a959ba5d0dd09e07f45a1',
    'gameTwo': '5c9a959ba5d0dd09e07f45a0',
    'choice': '5c9a959ba5d0dd09e07f45a0'
  }
];

module.exports = {
  games,
  users,
  histories
};
