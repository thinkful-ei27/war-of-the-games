const users = [
  {
    _id: "222222222222222222222200",
    firstName: "Johnny",
    lastName: "Salt",
    username: "johnnysalt",
    password: "$2a$10$F3WxoCmNFelMJuUbFMTXWO.nrEhQg1GNfuwgItE3l6fb8Bfso0cLa"
  },
  {
    _id: "333333333333333333333300",
    firstName: "Bob",
    lastName: "User",
    username: "bobuser",
    // hash digest for the string 'password'
    password: "$2a$10$0S5GdCkGJTDeaAH272/bmeZmmpC4rv6ItXIOZKwVQIfQOqSURhkhu"
  },
  {
    _id: "5c3f5ca9ec37422f44bdaa82",
    firstName: "thejohnny",
    lastName: "salt",
    username: "thejohnnysalt",
    password: "$2a$10$hpBGDg4mlyzVM/7g4staJuA4fuaznzY64b6/s0SwkLWrblT7vEgDK"
  }
];

const games = [
  {
    name: "Super Mario 64",
    igdbId: 1074
  },
  {
    name: "The Legend of Zelda",
    igdbId: 1022
  },
  {
    name: "Mortal Kombat",
    igdbId: 119
  },
  {
    name: "Street Fighter II",
    igdbId: 3186
  },
  {
    name: "Halo: Combat Evolved",
    igdbId: 740
  },
  {
    name: "Superman",
    igdbId: 3005
  },
  {
    name: "Final Fantasy VII",
    igdbId: 427
  },
  {
    name: "WWF No Mercy",
    igdbId: 3644
  },
  {
    name: "Super Smash Bros.",
    igdbId: 1626
  },
  {
    name: "Candy Crush Saga",
    igdbId: 5636
  }
];

module.exports = {
  games,
  users
};
