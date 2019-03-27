const users = [
  // Bob User is used for authentication during tests. Please do not alter him.
  {
    _id: "333333333333333333333300",
    firstName: "Bob",
    lastName: "User",
    username: "bobuser",
    // hash digest for the string 'password'
    password: "$2a$10$0S5GdCkGJTDeaAH272/bmeZmmpC4rv6ItXIOZKwVQIfQOqSURhkhu"
  },
  {
    _id: "222222222222222222222200",
    firstName: "Johnny",
    lastName: "Salt",
    username: "johnnysalt",
    password: "$2a$10$F3WxoCmNFelMJuUbFMTXWO.nrEhQg1GNfuwgItE3l6fb8Bfso0cLa"
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
    igdb: {
      id: 1074,
      slug: "super-mario-64"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/scutr4p9gytl4txb2soy.jpg"
  },
  {
    name: "The Legend of Zelda",
    igdb: {
      id: 1022,
      slug: "the-legend-of-zelda"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bfeef9eun1ybhuwufqxm.jpg"
  },
  {
    name: "Mortal Kombat",
    igdb: {
      id: 1618,
      slug: "mortal-kombat--2"
    },
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg"
  },
  {
    name: "Street Fighter II",
    igdb: {
      id: 3186,
      slug: "street-fighter-ii"
    },
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg"
  },
  {
    name: "Halo: Combat Evolved",
    igdb: {
      id: 740,
      slug: "halo-combat-evolved"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg"
  },
  {
    name: "Superman",
    igdb: {
      id: 3005,
      slug: "superman"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/wej8g7hq46wb0ueyblin.jpg"
  },
  {
    name: "Final Fantasy VII",
    igdb: {
      id: 427,
      slug: "final-fantasy-vii"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/idzdf1alxvetz3ow2ugy.jpg"
  },
  {
    name: "WWF No Mercy",
    igdb: {
      id: 3644,
      slug: "wwf-no-mercy"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/clajigg1q7mm9uxz14kx.jpg"
  },
  {
    name: "Super Smash Bros.",
    igdb: {
      id: 1626,
      slug: "super-smash-bros"
    },
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hzi.jpg"
  },
  {
    name: "Candy Crush Saga",
    igdb: {
      id: 5636,
      slug: "candy-crush-saga"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/u9s7ap9gi5kestfxhxdf.jpg"
  }
];

const histories = [
  {
    _id: "222222222222222222222200",
    userId: "333333333333333333333300",
    gameOne: "The Legend of Zelda: Ocarina of Time",
    gameTwo: "Super Mario Bros",
    choice: "The Legend of Zelda: Ocarina of Time"
  },
  {
    _id: "222222222222222222222201",
    userId: "5c3f5ca9ec37422f44bdaa82",
    gameOne: "The Legend of Zelda: Ocarina of Time",
    gameTwo: "Gears of War",
    choice: "The Legend of Zelda: Ocarina of Time"
  },
  {
    _id: "222222222222222222222202",
    userId: "5c3f5ca9ec37422f44bdaa82",
    gameOne: "Metal Gear Solid",
    gameTwo: "Super Mario Bros",
    choice: "Metal Gear Solid"
  },
  {
    _id: "222222222222222222222203",
    userId: "5c3f5ca9ec37422f44bdaa82",
    gameOne: "Metal Gear Solid",
    gameTwo: "World of Warcraft",
    choice: "World of Warcraft"
  },
  {
    _id: "222222222222222222222204",
    userId: "5c3f5ca9ec37422f44bdaa82",
    gameOne: "Super Mario 64",
    gameTwo: "Super Mario Bros",
    choice: "Super Mario 64"
  },
  {
    _id: "222222222222222222222205",
    userId: "5c3f5ca9ec37422f44bdaa82",
    gameOne: "The Legend of Zelda: Link's Awakening",
    gameTwo: "Super Mario Bros",
    choice: "Super Mario Bros"
  }
];

module.exports = {
  games,
  users,
  histories
};
