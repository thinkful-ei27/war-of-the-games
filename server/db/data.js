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
    igdbId: 1074,
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/scutr4p9gytl4txb2soy.jpg"
  },
  {
    name: "The Legend of Zelda",
    igdbId: 1022,
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bfeef9eun1ybhuwufqxm.jpg"
  },
  {
    name: "Mortal Kombat",
    igdbId: 1618,
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg"
  },
  {
    name: "Street Fighter II",
    igdbId: 3186,
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg"
  },
  {
    name: "Halo: Combat Evolved",
    igdbId: 740,
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg"
  },
  {
    name: "Superman",
    igdbId: 3005,
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/wej8g7hq46wb0ueyblin.jpg"
  },
  {
    name: "Final Fantasy VII",
    igdbId: 427,
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/idzdf1alxvetz3ow2ugy.jpg"
  },
  {
    name: "WWF No Mercy",
    igdbId: 3644,
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/clajigg1q7mm9uxz14kx.jpg"
  },
  {
    name: "Super Smash Bros.",
    igdbId: 1626,
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hzi.jpg"
  },
  {
    name: "Candy Crush Saga",
    igdbId: 5636,
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/u9s7ap9gi5kestfxhxdf.jpg"
  }
];

module.exports = {
  games,
  users
};
