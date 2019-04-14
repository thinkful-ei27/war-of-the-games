const users = [
  // Bob User is used for authentication during tests. Please do not alter him.
  {
    _id: "333333333333333333333300",
    firstName: "Bob",
    lastName: "User",
    username: "bobuser",
    // hash digest for the string 'password'
    password: "$2a$10$0S5GdCkGJTDeaAH272/bmeZmmpC4rv6ItXIOZKwVQIfQOqSURhkhu",
    aboutMe:
      "Bacon ipsum dolor amet pork loin pork tenderloin doner ham tongue sausage short loin brisket boudin meatloaf venison flank chuck. Fatback chicken alcatra corned beef kevin picanha ham cow. Turkey doner pig turducken swine venison bacon short loin tenderloin. Chuck tongue swine chicken, spare ribs venison ham tail pork chop.",
    profilePic: "nes-kirby",
    wishList: [24426, 14362, 62151, 1020, 9061, 10148, 9630, 9730, 3025, 56033]
  },
  {
    _id: "333333333333333333333301",
    firstName: "Adam",
    lastName: "Admin",
    username: "adamadmin",
    // hash digest for the string 'baseball'
    password: "$2a$10$LQz6cN6wv0umXxrAM.vXdu8H.Gt4k2iSAsMGSN/9DvlZa2VUjwg66",
    admin: true
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
    motivations: [],
    subMotivations: [],
    firstReleaseDate: 835488000,
    core: true,
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
      3644,
      1626
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
    motivations: [],
    subMotivations: [],
    firstReleaseDate: 509328000,
    core: false,
    igdb: {
      id: 1022,
      slug: "the-legend-of-zelda"
    },
    similar_games: [
      24426,
      47823,
      54775,
      55199,
      76882,
      80916,
      81249,
      3644,
      1626,
      1074
    ],
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bfeef9eun1ybhuwufqxm.jpg"
  },
  {
    name: "Mortal Kombat",
    _id: "5c9a959ba5d0dd09e07f45a9",
    motivations: [],
    subMotivations: [],
    firstReleaseDate: 712713600,
    core: true,
    igdb: {
      id: 1618,
      slug: "mortal-kombat--2"
    },
    similar_games: [119, 1242, 1243, 1244, 1613, 1620, 1621, 1622, 6710, 3644],
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg"
  },
  {
    name: "Street Fighter II",
    _id: "5c9a959ba5d0dd09e07f45a0",
    motivations: [],
    subMotivations: [],
    firstReleaseDate: 665798400,
    core: false,
    igdb: {
      id: 3186,
      slug: "street-fighter-ii"
    },
    similar_games: [
      1103,
      1714,
      1717,
      7386,
      8652,
      9061,
      9806,
      12597,
      13677,
      3644
    ],
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg"
  },
  {
    name: "Halo: Combat Evolved",
    _id: "5c9a959ba5d0dd09e07f45a1",
    firstReleaseDate: 1005782400,
    motivations: [],
    subMotivations: [],
    core: true,
    igdb: {
      id: 740,
      slug: "halo-combat-evolved"
    },
    similar_games: [37, 74, 231, 241, 355, 356, 571, 623, 989, 3644],
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg"
  },
  {
    name: "Superman",
    _id: "5c9a959ba5d0dd09e07f45a2",
    firstReleaseDate: 928108800,
    motivations: [],
    subMotivations: [],
    core: false,
    igdb: {
      id: 3005,
      slug: "superman"
    },
    similar_games: [111, 231, 1103, 1268, 1886, 4225, 5503, 3644, 1626, 1074],
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/wej8g7hq46wb0ueyblin.jpg"
  },
  {
    name: "Final Fantasy VII",
    _id: "5c9a959ba5d0dd09e07f45a3",
    motivations: [],
    subMotivations: [],
    firstReleaseDate: 854668800,
    core: true,
    igdb: {
      id: 427,
      slug: "final-fantasy-vii"
    },
    similar_games: [398, 411, 413, 421, 425, 426, 428, 1802, 7194, 3644],
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/idzdf1alxvetz3ow2ugy.jpg"
  },
  {
    name: "WWF No Mercy",
    _id: "5c9a959ba5d0dd09e07f45a4",
    firstReleaseDate: 974419200,
    motivations: [],
    subMotivations: [],
    core: false,
    igdb: {
      id: 3644,
      slug: "wwf-no-mercy"
    },
    similar_games: [2265, 3632, 3636, 3643, 3645, 3646, 5298, 6442, 6444, 6445],
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/clajigg1q7mm9uxz14kx.jpg",
    summary:
      'THQ\'s second WWF and fifth wrestling game for the N64 will feature enhanced customization options, a whopping 80 snarling gladiators and Transfer Pak links with two GBC-only WWF games.\n\nAssociate producer Mike Sparks boasts of a "guest referee" mode, in which any wrestler can ajudicate the action or start whacking away at the rivals at any time, and a novel "Smackdown Mall." Points earned by mastering the still-unnamed GBC Paks will be needed to buy costume items, unlock wrestlers and get other goodies.'
  },
  {
    name: "Super Smash Bros.",
    _id: "5c9a959ba5d0dd09e07f45a5",
    motivations: [],
    subMotivations: [],
    firstReleaseDate: 916876800,
    core: true,
    igdb: {
      id: 1626,
      slug: "super-smash-bros"
    },
    similar_games: [
      1070,
      10039,
      59858,
      76253,
      103269,
      103316,
      109277,
      109460,
      3644,
      1074
    ],
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hzi.jpg",
    summary:
      "It's a Bumpin', Bruisin', Brawlin' Bash! The many worlds of Nintendo collide in the ultimate showdown of strength and skill! Up to four players can choose their favorite characters - complete with signature attacks - and go at it in Team Battles and Free-For-Alls. Or venture out on your own to conquer the 14 stages in single-player mode. Either way, Super Smash Bros. is a no-holds-barred action-fest that will keep you coming back for more!"
  },
  {
    name: "Candy Crush Saga",
    _id: "5c9a959ba5d0dd09e07f45a6",
    motivations: [],
    subMotivations: [],
    firstReleaseDate: 1334188800,
    core: false,
    igdb: {
      id: 5636,
      slug: "candy-crush-saga"
    },
    similar_games: [
      20329,
      25222,
      26223,
      55173,
      55190,
      56033,
      60044,
      64599,
      3644,
      1626
    ],
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/u9s7ap9gi5kestfxhxdf.jpg"
  },
  {
    name: "God of War II",
    igdb: {
      id: 551,
      slug: "god-of-war-ii"
    },
    similar_games: [112, 127, 136, 499, 549, 550, 552, 1029, 1128, 3644],
    firstReleaseDate: 1173744000,
    motivations: [],
    subMotivations: [],
    core: true,
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
    firstReleaseDate: 591840000,
    motivations: [],
    subMotivations: [],
    core: false,
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/u9s7ap9gi5kestfxhxdf.jpg",
    igdb: {
      id: 1068,
      slug: "super-mario-bros-3"
    },
    summary:
      "Super Mario Bros. 3 is a platform video game for the Nintendo Entertainment System (NES) video game console. Mario and Luigi embark on a quest to save Princess Toadstool and the rulers of seven different kingdoms from the antagonist Bowser and his children, the Koopalings. The player, as Mario or Luigi, is able to defeat enemies by stomping them or using items that bestow magical powers. Mario and Luigi are given a wider range of abilities than in previous Super Mario games, including flying or sliding down slopes. In addition, Super Mario Bros. 3 introduces numerous elements, such as new enemy characters and the use of a world map to transition between levels, that have reappeared in or have influenced subsequent Mario games.",
    similar_games: [358, 1067, 1074, 1077, 1078, 1079, 2180, 3340, 3349, 3644],
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
  },
  {
    igdb: {
      id: 1352,
      slug: "journey"
    },
    similar_games: [
      17548,
      19150,
      22387,
      24426,
      26226,
      28309,
      36198,
      55190,
      56033,
      80916
    ],
    motivations: ["immersion"],
    subMotivations: ["fantasy"],
    core: true,
    name: "Journey",
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hwe.jpg",
    summary:
      "In Journey the player controls a robed figure in a vast desert, traveling towards a mountain in the distance. Other players on the same journey can be discovered, and two players can meet and assist each other, but they cannot communicate via speech or text and cannot see each other's names. The only form of communication between the two is a musical chime. This chime also transforms dull, stiff pieces of cloth found throughout the levels into vibrant red, affecting the game world and allowing the player to progress through the levels. The robed figure wears a trailing scarf, which when charged by approaching floating pieces of cloth, briefly allows the player to float through the air.\n\nThe developers sought to evoke in the player a sense of smallness and wonder, and to forge an emotional connection between them and the anonymous players they meet along the way. The music, composed by Austin Wintory, dynamically responds to the player's actions, building a single theme to represent the game's emotional arc throughout the story. Reviewers of the game praised the visual and auditory art as well as the sense of companionship created by playing with a stranger, calling it a moving and emotional experience. Journey won several \"game of the year\" awards and received several other awards and nominations, including a Best Score Soundtrack for Visual Media nomination for the 2013 Grammy Awards.",
    genres: [
      {
        _id: "5ca811db9cd89ef9c6258440",
        id: 7,
        name: "Music"
      },
      {
        _id: "5ca811db9cd89ef9c625843f",
        id: 8,
        name: "Platform"
      },
      {
        _id: "5ca811db9cd89ef9c625843e",
        id: 12,
        name: "Role-playing (RPG)"
      },
      {
        _id: "5ca811db9cd89ef9c625843d",
        id: 31,
        name: "Adventure"
      },
      {
        _id: "5ca811db9cd89ef9c625843c",
        id: 32,
        name: "Indie"
      }
    ],
    platforms: [
      {
        _id: "5ca811db9cd89ef9c6258444",
        id: 6,
        name: "PC (Microsoft Windows)"
      },
      {
        _id: "5ca811db9cd89ef9c6258443",
        id: 9,
        name: "PlayStation 3"
      },
      {
        _id: "5ca811db9cd89ef9c6258442",
        id: 45,
        name: "PlayStation Network"
      },
      {
        _id: "5ca811db9cd89ef9c6258441",
        id: 48,
        name: "PlayStation 4"
      }
    ],
    firstReleaseDate: 1331596800,
    createdAt: "2019-04-06T02:41:31.566Z",
    updatedAt: "2019-04-06T02:47:35.191Z",
    cloudImage:
      "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554518494/5ca811db9cd89ef9c625843b.jpg",
    id: "5ca811db9cd89ef9c625843b"
  },
  {
    igdb: {
      id: 1318,
      slug: "xcom-enemy-unknown"
    },
    similar_games: [20, 533, 538, 1020, 1254, 1377, 2031, 9498, 9727, 10919],
    motivations: ["mastery"],
    subMotivations: ["strategy"],
    core: true,
    name: "XCOM: Enemy Unknown",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/hazhjs0yzk80vmifcmrg.jpg",
    summary:
      "XCOM: Enemy Unknown will place you in control of a secret paramilitary organization called XCOM. As the XCOM commander, you will defend against a terrifying global alien invasion by managing resources, advancing technologies, and overseeing combat strategies and individual unit tactics. \nThe original XCOM is widely regarded as one of the best games ever made and has now been re-imagined by the strategy experts at Firaxis Games. XCOM: Enemy Unknown will expand on that legacy with an entirely new invasion story, enemies and technologies to fight aliens and defend Earth. \nYou will control the fate of the human race through researching alien technologies, creating and managing a fully operational base, planning combat missions and controlling soldier movement in battle.",
    genres: [
      {
        _id: "5ca811df9cd89ef9c6259043",
        id: 11,
        name: "Real Time Strategy (RTS)"
      },
      {
        _id: "5ca811df9cd89ef9c6259042",
        id: 12,
        name: "Role-playing (RPG)"
      },
      {
        _id: "5ca811df9cd89ef9c6259041",
        id: 15,
        name: "Strategy"
      },
      {
        _id: "5ca811df9cd89ef9c6259040",
        id: 16,
        name: "Turn-based strategy (TBS)"
      },
      {
        _id: "5ca811df9cd89ef9c625903f",
        id: 24,
        name: "Tactical"
      }
    ],
    platforms: [
      {
        _id: "5ca811df9cd89ef9c6259048",
        id: 3,
        name: "Linux"
      },
      {
        _id: "5ca811df9cd89ef9c6259047",
        id: 6,
        name: "PC (Microsoft Windows)"
      },
      {
        _id: "5ca811df9cd89ef9c6259046",
        id: 9,
        name: "PlayStation 3"
      },
      {
        _id: "5ca811df9cd89ef9c6259045",
        id: 12,
        name: "Xbox 360"
      },
      {
        _id: "5ca811df9cd89ef9c6259044",
        id: 14,
        name: "Mac"
      }
    ],
    firstReleaseDate: 1349740800,
    createdAt: "2019-04-06T02:41:35.214Z",
    updatedAt: "2019-04-06T02:47:35.191Z",
    cloudImage:
      "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554518495/5ca811df9cd89ef9c625903e.jpg",
    id: "5ca811df9cd89ef9c625903e"
  },
  {
    igdb: {
      id: 239,
      slug: "starcraft-ii-wings-of-liberty"
    },
    similar_games: [
      457,
      8773,
      9789,
      11205,
      13200,
      30229,
      34269,
      34823,
      55029,
      78550
    ],
    motivations: ["social", "mastery"],
    subMotivations: ["competition", "strategy"],
    core: true,
    name: "StarCraft II: Wings of Liberty",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/bgn7cqukcnskka73rwse.jpg",
    createdAt: "2019-03-27T22:38:21.905Z",
    updatedAt: "2019-04-06T02:47:35.195Z",
    genres: [
      {
        _id: "5ca6718f1a96641ab77ed417",
        id: 11,
        name: "Real Time Strategy (RTS)"
      },
      {
        _id: "5ca6718f1a96641ab77ed416",
        id: 15,
        name: "Strategy"
      }
    ],
    platforms: [
      {
        _id: "5ca6718f1a96641ab77ed419",
        id: 6,
        name: "PC (Microsoft Windows)"
      },
      {
        _id: "5ca6718f1a96641ab77ed418",
        id: 14,
        name: "Mac"
      }
    ],
    summary:
      "In the distant future, in the darkest reaches of space, the ghosts of the past whisper your name. You are Jim Raynor, a marshal-turned-rebel on a vigilante crusade to bring down the Dominion and its nefarious leader, Arcturus Mengsk. Haunted by betrayal and remorse, some believe you may have given up the fight. But you have promises to keep… and a need for vengeance that’s long overdue.",
    cloudImage:
      "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554169070/5c9bfb5d054d8f2e1010f118.jpg",
    firstReleaseDate: 1280188800,
    id: "5c9bfb5d054d8f2e1010f118"
  },
  {
    igdb: {
      id: 1511,
      slug: "pokemon-blue"
    },
    similar_games: [
      427,
      1512,
      1514,
      1517,
      1558,
      2286,
      2287,
      3222,
      22387,
      55092
    ],
    motivations: ["achievement"],
    subMotivations: ["completion"],
    core: true,
    name: "Pokémon Blue",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/dhsdbh50wrvoe6xmzx3i.jpg",
    summary:
      "You've finally been granted your Pokémon Trainer's license. Now, it's time to head out to become the world's greatest Pokémon Trainer. It's going to take all you've got to collect 150 Pokémon in this enormous world. Catch and train monsters like the shockingly-cute Pikachu. Face off against Blastoise's torrential water cannons. Stand strong when facing Pidgeot's stormy Gust. Trade with friends and watch your Pokémon evolve. Important—no single Pokémon can win at all. Can you develop the ultimate Pokémon strategy to defeat the eight Gym Leaders and become the greatest Pokémon Master of all time?",
    genres: [
      {
        _id: "5ca811db9cd89ef9c62583b8",
        id: 12,
        name: "Role-playing (RPG)"
      },
      {
        _id: "5ca811db9cd89ef9c62583b7",
        id: 31,
        name: "Adventure"
      }
    ],
    platforms: [
      {
        _id: "5ca811db9cd89ef9c62583bb",
        id: 33,
        name: "Game Boy"
      },
      {
        _id: "5ca811db9cd89ef9c62583ba",
        id: 37,
        name: "Nintendo 3DS"
      },
      {
        _id: "5ca811db9cd89ef9c62583b9",
        id: 47,
        name: "Virtual Console (Nintendo)"
      }
    ],
    firstReleaseDate: 831686400,
    createdAt: "2019-04-06T02:41:31.484Z",
    updatedAt: "2019-04-06T02:47:35.191Z",
    cloudImage:
      "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554518492/5ca811db9cd89ef9c62583b6.jpg",
    id: "5ca811db9cd89ef9c62583b6"
  },
  {
    igdb: {
      id: 128,
      slug: "assassin-s-creed"
    },
    similar_games: [113, 127, 537, 1266, 1970, 5606, 7570, 8263, 9243, 19249],
    motivations: ["achievement"],
    subMotivations: ["completion"],
    core: true,
    name: "Assassin's Creed",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/p73nqxuc20nf8upc22lx.jpg",
    summary:
      "Assassin’s Creed is the next-gen game developed by Ubisoft Montreal that will redefine the action genre. While other games claim to be next-gen with impressive graphics and physics, Assassin’s Creed merges technology, game design, theme, and emotions into a world where you instigate chaos and become a vulnerable, yet powerful, agent of change.",
    genres: [
      {
        _id: "5ca67b311a96641ab77ed627",
        id: 8,
        name: "Platform"
      },
      {
        _id: "5ca67b311a96641ab77ed626",
        id: 31,
        name: "Adventure"
      }
    ],
    platforms: [
      {
        _id: "5ca67b311a96641ab77ed62a",
        id: 6,
        name: "PC (Microsoft Windows)"
      },
      {
        _id: "5ca67b311a96641ab77ed629",
        id: 9,
        name: "PlayStation 3"
      },
      {
        _id: "5ca67b311a96641ab77ed628",
        id: 12,
        name: "Xbox 360"
      }
    ],
    createdAt: "2019-04-02T21:02:11.015Z",
    updatedAt: "2019-04-06T02:47:35.191Z",
    cloudImage:
      "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554239031/5ca3cdd309691b1d2a883189.jpg",
    firstReleaseDate: 1194912000,
    id: "5ca3cdd309691b1d2a883189"
  },
  {
    igdb: {
      id: 421,
      slug: "final-fantasy-ix"
    },
    similar_games: [398, 411, 413, 425, 426, 427, 1219, 8456, 11292, 16474],
    motivations: ["achievement", "immersion"],
    subMotivations: ["completion", "story", "fantasy"],
    core: true,
    name: "Final Fantasy IX",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/xk2z8col2eam01gaytkh.jpg",
    createdAt: "2019-03-27T22:39:52.625Z",
    updatedAt: "2019-04-06T02:47:35.193Z",
    cloudImage:
      "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168879/5c9bfbb8054d8f2e1010f11c.jpg",
    firstReleaseDate: 962928000,
    genres: [
      {
        _id: "5ca664e12d78e018f095d314",
        id: 12,
        name: "Role-playing (RPG)"
      },
      {
        _id: "5ca664e12d78e018f095d313",
        id: 16,
        name: "Turn-based strategy (TBS)"
      },
      {
        _id: "5ca664e12d78e018f095d312",
        id: 31,
        name: "Adventure"
      }
    ],
    platforms: [
      {
        _id: "5ca664e12d78e018f095d31a",
        id: 6,
        name: "PC (Microsoft Windows)"
      },
      {
        _id: "5ca664e12d78e018f095d319",
        id: 7,
        name: "PlayStation"
      },
      {
        _id: "5ca664e12d78e018f095d318",
        id: 45,
        name: "PlayStation Network"
      },
      {
        _id: "5ca664e12d78e018f095d317",
        id: 48,
        name: "PlayStation 4"
      },
      {
        _id: "5ca664e12d78e018f095d316",
        id: 49,
        name: "Xbox One"
      },
      {
        _id: "5ca664e12d78e018f095d315",
        id: 130,
        name: "Nintendo Switch"
      }
    ],
    summary:
      "The ninth installment in the long-running RPG series and the final for the original PlayStation, Final Fantasy IX gives fans of the franchise the nostalgic thrill of re-experiencing the visual style, gameplay elements and overall spirit of the 16-bit Final Fantasy games of the 8/16 bit eras. The main story centers on Zidane Tribal, a young thief who quickly becomes engaged in a quest to save the world, along with Vivi Ornitier, a young black mage, and Princess Garnet, heir to the throne of Alexandria. The game features detailed polygonal character models and lush pre-rendered backgrounds. They all combine for an unforgettable adventure!",
    id: "5c9bfbb8054d8f2e1010f11c"
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
  },
  {
    _id: "222222222222222222222217",
    userId: "333333333333333333333300",
    gameOne: "5c9a959ba5d0dd09e07f45a2",
    gameTwo: "5c9a959ba5d0dd09e07f45a1",
    choice: "5c9a959ba5d0dd09e07f45a2"
  }
];

module.exports = {
  games,
  users,
  histories
};
