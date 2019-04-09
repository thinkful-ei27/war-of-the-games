const motivations = {
  action: {
    destruction: [
      "Super Smash Bros. Melee",
      "Battlefield 3",
      "Counter-Strike",
      "Call of Duty",
      "God of War",
      "Destiny",
      "Kingdom Hearts 2",
      "Resident Evil",
      "League of Legends"
    ],
    excitement: [
      "Grand Theft Auto V",
      "Battlefield 3",
      "Destiny",
      "Call of Duty",
      "Gears of War",
      "Halo",
      "Borderlands 2",
      "Doom",
      "God of War",
      "Counter-Strike"
    ]
  },
  social: {
    competition: [
      "Counter-Strike: Global Offensive",
      "Super Smash Bros. Melee",
      "Dota 2",
      "League of Legends",
      "Street Fighter 2",
      "Heroes of the Storm",
      "Starcraft 2",
      "Call of Duty",
      "Battlefield 3",
      "FIFA 17"
    ],
    community: [
      "Final Fantasy XIV",
      "Battlefield 4",
      "Destiny",
      "Guild Wars 2",
      "EverQuest",
      "League of Legends",
      "Monster Hunter",
      "World of Warcraft",
      "Counter-Strike",
      "Dota 2"
    ]
  },
  mastery: {
    challenge: [
      "Super Smash Bros. Melee",
      "Devil May Cry 3",
      "World of Warcraft",
      "Dark Souls",
      "Counter-Strike",
      "Street Fighter 2",
      "Monster Hunter",
      "Dota 2",
      "Starcraft 2",
      "Warcraft III: Reign of Chaos"
    ],
    strategy: [
      "Europa Universalis IV",
      "Crusader Kings II",
      "Sid Meier's Civilization V",
      "XCOM: Enemy Unknown",
      "StarCraft",
      "Fire Emblem",
      "Age of Empires II: The Age of Kings",
      "Warcraft III: Reign of Chaos",
      "Kerbal Space Program"
    ]
  },
  achievement: {
    completion: [
      "Final Fantasy IX",
      "Assassin's Creed",
      "The Legend of Zelda",
      "God of War",
      "Animal Crossing",
      "The Elder Scrolls V: Skyrim",
      "Destiny",
      "Pokémon Blue",
      "Guild Wars 2",
      "Fire Emblem"
    ],
    power: [
      "World of Warcraft",
      "Diablo 2",
      "Dota 2",
      "Runescape",
      "Destiny",
      "Call of Duty",
      "League of Legends",
      "Counter-Strike",
      "God of War",
      "Resident Evil 2"
    ]
  },
  creativity: {
    discovery: [
      "The Elder Scrolls V: Skyrim",
      "Fallout 3",
      "Fable",
      "The Legend of Zelda: Ocarina of Time",
      "Grand Theft Auto V",
      "Minecraft",
      "Earthbound",
      "Kerbal Space Program",
      "Metal Gear Solid 3: Snake Eater",
      "Metroid Prime"
    ],
    design: [
      "The Sims",
      "City of Heroes",
      "Animal Crossing",
      "Guild Wars 2",
      "Final Fantasy XIV",
      "Dragon Age: Origins",
      "Mass Effect 2",
      "Monster Hunter",
      "Pokémon Blue",
      "The Elder Scrolls V: Skyrim"
    ]
  },
  immersion: {
    fantasy: [
      "Dragon Age: Origins",
      "The Elder Scrolls III: Morrowind",
      "Dishonored",
      "Mass Effect 2",
      "The Elder Scrolls V: Skyrim",
      "Fable",
      "Fallout: New Vegas",
      "Star Wars: Knights of the Old Republic",
      "Journey",
      "The Legend of Zelda"
    ],
    story: [
      "Dragon Age: Origins",
      "Mass Effect 2",
      "Persona 4",
      "Tales of Symphonia",
      "Xenogears",
      "Final Fantasy VIII",
      "Final Fantasy IX",
      "Final Fantasy X",
      "Star Wars: Knights of the Old Republic",
      "Fire Emblem",
      "Kingdom Hearts 2",
      "Planescape: Torment"
    ]
  }
};

const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

const allMotivationGames = motivations => {
  const games = [];
  const motivationKeys = Object.keys(motivations);

  motivationKeys.forEach(motiv => {
    const motivKeys = Object.keys(motivations[motiv]);
    motivKeys.forEach(subKey => {
      motivations[motiv][subKey].forEach(sub =>
        games.push({ game: sub, motivation: motiv, subMotivation: subKey })
      );
    });
  });

  // const uniqueArray = filterNonUniqueBy(games, (a, b) => a.game == b.game);

  return games;
};

const util = require("util");
