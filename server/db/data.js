'use strict';

const users = [
  // Bob User is used for authentication during tests. Please do not alter him.
  {
    _id: '333333333333333333333300',
    firstName: 'Bob',
    lastName: 'User',
    username: 'bobuser',
    // hash digest for the string 'password'
    password: '$2a$10$0S5GdCkGJTDeaAH272/bmeZmmpC4rv6ItXIOZKwVQIfQOqSURhkhu'
  },
  {
    _id: '222222222222222222222200',
    firstName: 'Johnny',
    lastName: 'Salt',
    username: 'johnnysalt',
    password: '$2a$10$F3WxoCmNFelMJuUbFMTXWO.nrEhQg1GNfuwgItE3l6fb8Bfso0cLa'
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
    name: 'Super Mario 64',
    _id: '5c9a959ba5d0dd09e07f45a7',
    igdb: {
      id: 1074,
      slug: 'super-mario-64'
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
      'https://images.igdb.com/igdb/image/upload/t_720p/scutr4p9gytl4txb2soy.jpg'
  },
  {
    name: 'The Legend of Zelda',
    _id: '5c9a959ba5d0dd09e07f45a8',
    igdb: {
      id: 1022,
      slug: 'the-legend-of-zelda'
    },
    coverUrl:
      'https://images.igdb.com/igdb/image/upload/t_720p/bfeef9eun1ybhuwufqxm.jpg'
  },
  {
    name: 'Mortal Kombat',
    _id: '5c9a959ba5d0dd09e07f45a9',
    igdb: {
      id: 1618,
      slug: 'mortal-kombat--2'
    },
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg'
  },
  {
    name: 'Street Fighter II',
    _id: '5c9a959ba5d0dd09e07f45a0',
    igdb: {
      id: 3186,
      slug: 'street-fighter-ii'
    },
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg'
  },
  {
    name: 'Halo: Combat Evolved',
    _id: '5c9a959ba5d0dd09e07f45a1',
    igdb: {
      id: 740,
      slug: 'halo-combat-evolved'
    },
    coverUrl:
      'https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg'
  },
  {
    name: 'Superman',
    _id: '5c9a959ba5d0dd09e07f45a2',
    igdb: {
      id: 3005,
      slug: 'superman'
    },
    coverUrl:
      'https://images.igdb.com/igdb/image/upload/t_720p/wej8g7hq46wb0ueyblin.jpg'
  },
  {
    name: 'Final Fantasy VII',
    _id: '5c9a959ba5d0dd09e07f45a3',
    igdb: {
      id: 427,
      slug: 'final-fantasy-vii'
    },
    coverUrl:
      'https://images.igdb.com/igdb/image/upload/t_720p/idzdf1alxvetz3ow2ugy.jpg'
  },
  {
    name: 'WWF No Mercy',
    _id: '5c9a959ba5d0dd09e07f45a4',
    igdb: {
      id: 3644,
      slug: 'wwf-no-mercy'
    },
    coverUrl:
      'https://images.igdb.com/igdb/image/upload/t_720p/clajigg1q7mm9uxz14kx.jpg'
  },
  {
    name: 'Super Smash Bros.',
    _id: '5c9a959ba5d0dd09e07f45a5',
    igdb: {
      id: 1626,
      slug: 'super-smash-bros'
    },
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_720p/co1hzi.jpg'
  },
  {
    name: 'Candy Crush Saga',
    _id: '5c9a959ba5d0dd09e07f45a6',
    igdb: {
      id: 5636,
      slug: 'candy-crush-saga'
    },
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/u9s7ap9gi5kestfxhxdf.jpg"
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
    _id: '222222222222222222222200',
    userId: '333333333333333333333300',
    gameOne: '5c9a959ba5d0dd09e07f45a6',
    gameTwo: '5c9a959ba5d0dd09e07f45a5',
    choice: '5c9a959ba5d0dd09e07f45a6'
  },
  {
    _id: '222222222222222222222201',
    userId: '5c3f5ca9ec37422f44bdaa82',
    gameOne: '5c9a959ba5d0dd09e07f45a4',
    gameTwo: '5c9a959ba5d0dd09e07f45a3',
    choice: '5c9a959ba5d0dd09e07f45a4'
  },
  {
    _id: '222222222222222222222202',
    userId: '5c3f5ca9ec37422f44bdaa82',
    gameOne: '5c9a959ba5d0dd09e07f45a2',
    gameTwo: '5c9a959ba5d0dd09e07f45a1',
    choice: '5c9a959ba5d0dd09e07f45a1'
  }
];

const game = { id: 1074,
  age_ratings: [ 3897, 19927 ],
  aggregated_rating: 89,
  aggregated_rating_count: 1,
  alternative_names: [ 7694 ],
  category: 0,
  collection: 240,
  cover: 1060,
  created_at: 1339200000,
  external_games: [ 154339, 190048, 245191 ],
  first_release_date: 835488000,
  franchise: 24,
  franchises: [ 24 ],
  game_modes: [ 1 ],
  genres: [ 8, 31 ],
  hypes: 1,
  involved_companies: [ 2598, 2599 ],
  keywords:
   [ 296,
     535,
     1027,
     1057,
     1435,
     2049,
     3061,
     4263,
     4381,
     4480,
     4711,
     4907,
     4918,
     4940,
     5598,
     6130,
     6137,
     6138,
     6139,
     6140,
     6142,
     6143,
     6154,
     6159,
     6163,
     6178,
     6184,
     6192,
     6470,
     6522,
     6649,
     6777,
     6802,
     7230,
     7243,
     7552,
     8267,
     8867,
     9225,
     9429,
     11187,
     15091,
     15795 ],
  name: 'Super Mario 64',
  platforms: [ 4, 5, 41, 47 ],
  player_perspectives: [ 2 ],
  popularity: 19.8308610018247,
  pulse_count: 63,
  rating: 90.0102363116582,
  rating_count: 634,
  release_dates:
   [ 131774,
     131775,
     131776,
     131777,
     131778,
     131779,
     143741,
     143742,
     143743,
     143744,
     143745 ],
  screenshots: [ 14170, 14171, 14172, 14173, 14174 ],
  similar_games:
   [ 1068, 1077, 19150, 20342, 24426, 26226, 26758, 28309, 33269, 56033 ],
  slug: 'super-mario-64',
  summary:
   'Mario is invited by Princess Peach to her castle, but once he arrives he finds out that Bowser has kidnapped her. Mario has to overcome many challenges and collect Power Stars hidden in the castle\'s paintings and walls to defeat Bowser and rescue Peach in this seminal 3D platformer.',
  tags:
   [ 1,
     268435464,
     268435487,
     536871208,
     536871447,
     536871939,
     536871969,
     536872347,
     536872961,
     536873973,
     536875175,
     536875293,
     536875392,
     536875623,
     536875819,
     536875830,
     536875852,
     536876510,
     536877042,
     536877049,
     536877050,
     536877051,
     536877052,
     536877054,
     536877055,
     536877066,
     536877071,
     536877075,
     536877090,
     536877096,
     536877104,
     536877382,
     536877434,
     536877561,
     536877689,
     536877714,
     536878142,
     536878155,
     536878464,
     536879179,
     536879779,
     536880137,
     536880341,
     536882099,
     536886003,
     536886707 ],
  themes: [ 1 ],
  total_rating: 89.50511815582911,
  total_rating_count: 635,
  updated_at: 1553644800,
  url: 'https://www.igdb.com/games/super-mario-64',
  videos: [ 21802 ],
  websites: [ 15059, 15060 ] };

module.exports = {
  games,
  users,
  histories
};
