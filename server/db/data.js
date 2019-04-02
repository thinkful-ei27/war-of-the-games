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
    _id: "5c9a959ba5d0dd09e07f45a7",
    igdb: {
      id: 1074,
      slug: "super-mario-64"
    },
    summary:
      "Mario is invited by Princess Peach to her castle, but once he arrives he finds out that Bowser has kidnapped her. Mario has to overcome many challenges and collect Power Stars hidden in the castle's paintings and walls to defeat Bowser and rescue Peach in this seminal 3D platformer.",
    similar_games: [
      1068,
      1077,
      19150,
      20342,
      24426,
      26226,
      26758,
      28309,
      33269,
      56033
    ],
    genres: [
      {
        id: 8,
        name: "Platform"
      },
      {
        id: 31,
        name: "Adventure"
      }
    ],
    platforms: [
      {
        id: 4,
        name: "Nintendo 64"
      },
      {
        id: 5,
        name: "Wii"
      },
      {
        id: 41,
        name: "Wii U"
      },
      {
        id: 47,
        name: "Virtual Console (Nintendo)"
      }
    ],
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/scutr4p9gytl4txb2soy.jpg"
  },
  // Kept intentionally sparse for testing purposes
  {
    name: "The Legend of Zelda",
    _id: "5c9a959ba5d0dd09e07f45a8",
    igdb: {
      id: 1022,
      slug: "the-legend-of-zelda"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bfeef9eun1ybhuwufqxm.jpg"
  },
  {
    name: "Mortal Kombat",
    _id: "5c9a959ba5d0dd09e07f45a9",
    igdb: {
      id: 1618,
      slug: "mortal-kombat--2"
    },
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg"
  },
  {
    name: "Street Fighter II",
    _id: "5c9a959ba5d0dd09e07f45a0",
    igdb: {
      id: 3186,
      slug: "street-fighter-ii"
    },
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg"
  },
  {
    name: "Halo: Combat Evolved",
    _id: "5c9a959ba5d0dd09e07f45a1",
    igdb: {
      id: 740,
      slug: "halo-combat-evolved"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg"
  },
  {
    name: "Superman",
    _id: "5c9a959ba5d0dd09e07f45a2",
    igdb: {
      id: 3005,
      slug: "superman"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/wej8g7hq46wb0ueyblin.jpg"
  },
  {
    name: "Final Fantasy VII",
    _id: "5c9a959ba5d0dd09e07f45a3",
    igdb: {
      id: 427,
      slug: "final-fantasy-vii"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/idzdf1alxvetz3ow2ugy.jpg"
  },
  {
    name: "WWF No Mercy",
    _id: "5c9a959ba5d0dd09e07f45a4",
    igdb: {
      id: 3644,
      slug: "wwf-no-mercy"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/clajigg1q7mm9uxz14kx.jpg"
  },
  {
    name: "Super Smash Bros.",
    _id: "5c9a959ba5d0dd09e07f45a5",
    igdb: {
      id: 1626,
      slug: "super-smash-bros"
    },
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hzi.jpg"
  },
  {
    name: "Candy Crush Saga",
    _id: "5c9a959ba5d0dd09e07f45a6",
    igdb: {
      id: 5636,
      slug: "candy-crush-saga"
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/u9s7ap9gi5kestfxhxdf.jpg"
  },
  {
    igdb: {
      id: 551,
      slug: "god-of-war-ii"
    },
    similar_games: [112, 127, 136, 499, 549, 550, 552, 1029, 1128, 6958],
    name: "God of War II",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/f3mwxy3opbrbmcyguhly.jpg",
    createdAt: "2019-03-27T22:42:41.704Z",
    updatedAt: "2019-03-29T16:45:09.232Z",
    genres: [
      {
        _id: "5c9e4b955d82370e546f5d1a",
        id: 8,
        name: "Platform"
      },
      {
        _id: "5c9e4b955d82370e546f5d19",
        id: 25,
        name: "Hack and slash/Beat 'em up"
      },
      {
        _id: "5c9e4b955d82370e546f5d18",
        id: 31,
        name: "Adventure"
      }
    ],
    platforms: [
      {
        _id: "5c9e4b955d82370e546f5d1c",
        id: 8,
        name: "PlayStation 2"
      },
      {
        _id: "5c9e4b955d82370e546f5d1b",
        id: 9,
        name: "PlayStation 3"
      }
    ],
    summary:
      "Kratos is now the God of War, having defeated the Olympian god Ares. Shunned by the other gods and still haunted by nightmares from his past, Kratos decides to join an army of Spartans in an attack on the city of Rhodes. Kratos also ignores a warning from the goddess Athena that his lust for revenge is alienating the other gods.",
    id: "5c9bfc61054d8f2e1010f122"
  },
  {
    name: "Super Mario Bros. 3",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/u9s7ap9gi5kestfxhxdf.jpg",
    igdb: {
      id: 1068,
      slug: "super-mario-bros-3"
    },
    summary:
      "Super Mario Bros. 3 is a platform video game for the Nintendo Entertainment System (NES) video game console. Mario and Luigi embark on a quest to save Princess Toadstool and the rulers of seven different kingdoms from the antagonist Bowser and his children, the Koopalings. The player, as Mario or Luigi, is able to defeat enemies by stomping them or using items that bestow magical powers. Mario and Luigi are given a wider range of abilities than in previous Super Mario games, including flying or sliding down slopes. In addition, Super Mario Bros. 3 introduces numerous elements, such as new enemy characters and the use of a world map to transition between levels, that have reappeared in or have influenced subsequent Mario games.",
    similar_games: [358, 1067, 1074, 1077, 1078, 1079, 2180, 3340, 3349, 22301],
    genres: [
      {
        id: 8,
        name: "Platform"
      },
      {
        id: 31,
        name: "Adventure"
      }
    ],
    platforms: [
      {
        id: 5,
        name: "Wii"
      },
      {
        id: 18,
        name: "Nintendo Entertainment System (NES)"
      },
      {
        id: 19,
        name: "Super Nintendo Entertainment System (SNES)"
      },
      {
        id: 24,
        name: "Game Boy Advance"
      },
      {
        id: 37,
        name: "Nintendo 3DS"
      },
      {
        id: 41,
        name: "Wii U"
      },
      {
        id: 47,
        name: "Virtual Console (Nintendo)"
      }
    ]
  }
];

const histories = [
  {
    _id: "222222222222222222222200",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a6",
    gameTwo: "5c9a959ba5d0dd09e07f45a5",
    choice: "5c9a959ba5d0dd09e07f45a6"
  },
  {
    _id: "222222222222222222222201",
    userId: "5c3f5ca9ec37422f44bdaa82",
    gameOne: "5c9a959ba5d0dd09e07f45a4",
    gameTwo: "5c9a959ba5d0dd09e07f45a3",
    choice: "5c9a959ba5d0dd09e07f45a4"
  },
  {
    _id: "222222222222222222222202",
    userId: "5c3f5ca9ec37422f44bdaa82",
    gameOne: "5c9a959ba5d0dd09e07f45a2",
    gameTwo: "5c9a959ba5d0dd09e07f45a1",
    choice: "5c9a959ba5d0dd09e07f45a1"
  },
  {
    _id: "222222222222222222222203",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a6",
    gameTwo: "5c9a959ba5d0dd09e07f45a7",
    choice: "5c9a959ba5d0dd09e07f45a6"
  },
  {
    _id: "222222222222222222222204",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a6",
    gameTwo: "5c9a959ba5d0dd09e07f45a8",
    choice: "5c9a959ba5d0dd09e07f45a8"
  },
  {
    _id: "222222222222222222222205",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a8",
    gameTwo: "5c9a959ba5d0dd09e07f45a7",
    choice: "5c9a959ba5d0dd09e07f45a7"
  },
  {
    _id: "222222222222222222222206",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a6",
    gameTwo: "5c9a959ba5d0dd09e07f45a3",
    choice: "5c9a959ba5d0dd09e07f45a6"
  },
  {
    _id: "222222222222222222222207",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a6",
    gameTwo: "5c9a959ba5d0dd09e07f45a1",
    choice: "5c9a959ba5d0dd09e07f45a6"
  },
  {
    _id: "222222222222222222222208",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a6",
    gameTwo: "5c9a959ba5d0dd09e07f45a2",
    choice: "5c9a959ba5d0dd09e07f45a6"
  },
  {
    _id: "222222222222222222222209",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a6",
    gameTwo: "5c9a959ba5d0dd09e07f45a4",
    choice: "5c9a959ba5d0dd09e07f45a6"
  },
  {
    _id: "222222222222222222222210",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a1",
    gameTwo: "5c9a959ba5d0dd09e07f45a7",
    choice: "5c9a959ba5d0dd09e07f45a7"
  },
  {
    _id: "222222222222222222222211",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a2",
    gameTwo: "5c9a959ba5d0dd09e07f45a7",
    choice: "5c9a959ba5d0dd09e07f45a7"
  },
  {
    _id: "222222222222222222222212",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a3",
    gameTwo: "5c9a959ba5d0dd09e07f45a7",
    choice: "5c9a959ba5d0dd09e07f45a7"
  },
  {
    _id: "222222222222222222222213",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a4",
    gameTwo: "5c9a959ba5d0dd09e07f45a7",
    choice: "5c9a959ba5d0dd09e07f45a7"
  },
  {
    _id: "222222222222222222222214",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a1",
    gameTwo: "5c9a959ba5d0dd09e07f45a8",
    choice: "5c9a959ba5d0dd09e07f45a8"
  },
  {
    _id: "222222222222222222222215",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a4",
    gameTwo: "5c9a959ba5d0dd09e07f45a1",
    choice: "5c9a959ba5d0dd09e07f45a4"
  },
  {
    _id: "222222222222222222222216",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a3",
    gameTwo: "5c9a959ba5d0dd09e07f45a1",
    choice: "5c9a959ba5d0dd09e07f45a3"
  }
];

module.exports = {
  games,
  users,
  histories
};
