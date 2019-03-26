'use strict';

const users = [
  {  '_id': '222222222222222222222200',
    'firstName': 'Johnny',
    'lastName': 'Salt',
    'username': 'johnnysalt',
    'password': '$2a$10$F3WxoCmNFelMJuUbFMTXWO.nrEhQg1GNfuwgItE3l6fb8Bfso0cLa'
  },
  {
    '_id': '333333333333333333333300',
    'firstName': 'Bob',
    'lastName': 'User',
    'username': 'bobuser',
    // hash digest for the string 'password'
    'password': '$2a$10$0S5GdCkGJTDeaAH272/bmeZmmpC4rv6ItXIOZKwVQIfQOqSURhkhu'
  },
  {
    '_id' : '5c3f5ca9ec37422f44bdaa82',
    'firstName': 'thejohnny',
    'lastName': 'salt',
    'username' : 'thejohnnysalt',
    'password' : '$2a$10$hpBGDg4mlyzVM/7g4staJuA4fuaznzY64b6/s0SwkLWrblT7vEgDK'
  }
];

const histories = [
  {
    '_id': '222222222222222222222200',
    'userId': '333333333333333333333300',
    'gameOne': 'The Legend of Zelda: Ocarina of Time',
    'gameTwo': 'Super Mario Bros',
    'choice': 'The Legend of Zelda: Ocarina of Time'
  },
  {
    '_id': '222222222222222222222201',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'gameOne': 'The Legend of Zelda: Ocarina of Time',
    'gameTwo': 'Gears of War',
    'choice': 'The Legend of Zelda: Ocarina of Time'
  },
  {
    '_id': '222222222222222222222202',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'gameOne': 'Metal Gear Solid',
    'gameTwo': 'Super Mario Bros',
    'choice': 'Metal Gear Solid'
  },
  {
    '_id': '222222222222222222222203',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'gameOne': 'Metal Gear Solid',
    'gameTwo': 'World of Warcraft',
    'choice': 'World of Warcraft'
  },
  {
    '_id': '222222222222222222222204',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'gameOne': 'Super Mario 64',
    'gameTwo': 'Super Mario Bros',
    'choice': 'Super Mario 64'
  },
  {
    '_id': '222222222222222222222205',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'gameOne': 'The Legend of Zelda: Link\'s Awakening',
    'gameTwo': 'Super Mario Bros',
    'choice': 'Super Mario Bros'
  },
];

module.exports = {
  users,
  histories
};