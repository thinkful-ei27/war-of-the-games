import {
  CLEAR_LOADING,
  NEXT_TEST_SUCCESS,
  UDPATE_VOTE_COUNT
} from "../actions/onboarding";

import ssbm from "../assets/onboard-pics/ssbm.jpg";
import re4 from "../assets/onboard-pics/re4.jpg";
import halo from "../assets/onboard-pics/halo.jpg";
import doom from "../assets/onboard-pics/doom.jpg";
import lol from "../assets/onboard-pics/lol.jpg";
import wow from "../assets/onboard-pics/wow.jpg";
import csgo from "../assets/onboard-pics/csgo.jpg";
import gw2 from "../assets/onboard-pics/gw2.jpg";
import ds from "../assets/onboard-pics/ds.jpg";
import sc2 from "../assets/onboard-pics/sc2.jpg";
import sf2 from "../assets/onboard-pics/sf2.jpg";
import aoe from "../assets/onboard-pics/aoe.jpg";
import ff7 from "../assets/onboard-pics/ff7.jpg";
import d2 from "../assets/onboard-pics/d2.jpg";
import oot from "../assets/onboard-pics/oot.jpg";
import dota2 from "../assets/onboard-pics/dota2.jpg";
import tes5 from "../assets/onboard-pics/tes5.jpg";
import animal from "../assets/onboard-pics/animal.jpg";
import mgs3 from "../assets/onboard-pics/mgs3.jpg";
import me2 from "../assets/onboard-pics/me2.jpg";
import fnv from "../assets/onboard-pics/fnv.jpg";
import kh2 from "../assets/onboard-pics/kh2.jpg";
import kotor2 from "../assets/onboard-pics/kotor2.jpg";
import dao from "../assets/onboard-pics/dao.jpg";

const initialState = {
  showing: [
    { name: "test", coverUrl: "test", id: "test" },
    { name: "test", coverUrl: "test", id: "test" }
  ],
  test1: [
    {
      name: "Super Smash Bros. Melee",
      id: "5c9bfa9f054d8f2e1010f115",
      coverUrl: ssbm
    },
    {
      name: "Halo: Combat Evolved",
      coverUrl: halo,
      id: "5c9a959ba5d0dd09e07f45a1"
    }
  ],
  test2: [
    {
      name: "Resident Evil 4",
      coverUrl: re4,
      id: "5c9bf8e6054d8f2e1010f109"
    },
    {
      name: "DOOM",
      coverUrl: doom,
      id: "5c9bfce1054d8f2e1010f126"
    }
  ],
  test3: [
    {
      name: "League of Legends",
      coverUrl: lol,
      id: "5ca653e11989fe0017440ece"
    },
    {
      name: "World of Warcraft",
      coverUrl: wow,
      id: "5ca2739a5ce0f90ebb413b03"
    }
  ],
  test4: [
    {
      name: "Counter-Strike: Global Offensive",
      coverUrl: csgo,
      id: "5ca654661989fe0017440ed3"
    },
    {
      name: "Guild Wars 2",
      coverUrl: gw2,
      id: "5ca388668b14bd0017521aeb"
    }
  ],
  test5: [
    {
      name: "Dark Souls",
      coverUrl: ds,
      id: "5ca6551b1989fe0017440edc"
    },
    {
      name: "StarCraft II: Wings of Liberty",
      coverUrl: sc2,
      id: "5c9bfb5d054d8f2e1010f118"
    }
  ],
  test6: [
    {
      name: "Street Fighter II",
      coverUrl: sf2,
      id: "5c9a959ba5d0dd09e07f45a0"
    },
    {
      name: "Age of Empires II: The Age of Kings",
      id: "5c9bfe5d054d8f2e1010f133",
      coverUrl: aoe
    }
  ],
  test7: [
    {
      name: "Final Fantasy VII",
      id: "5c9a959ba5d0dd09e07f45a3",
      coverUrl: ff7
    },
    {
      name: "Diablo: II",
      coverUrl: d2,
      id: "5c9bfd5c054d8f2e1010f12a"
    }
  ],
  test8: [
    {
      name: "The Legend of Zelda: Ocarina of Time",
      id: "5c9bf3bb1eaffb2ce28273fd",
      coverUrl: oot
    },
    {
      name: "Dota 2",
      coverUrl: dota2,
      id: "5ca657431989fe0017440ee9"
    }
  ],
  test9: [
    {
      name: "The Elder Scrolls V: Skyrim",
      coverUrl: tes5,
      id: "5c9bfbea054d8f2e1010f11e"
    },
    {
      name: "Animal Crossing",
      coverUrl: animal,
      id: "5ca6580c1989fe0017440eef"
    }
  ],
  test10: [
    {
      name: "Metal Gear Solid 3: Snake Eater",
      coverUrl: mgs3,
      id: "5c9bf3411eaffb2ce28273f9"
    },
    {
      name: "Mass Effect 2",
      coverUrl: me2,
      id: "5c9bf3801eaffb2ce28273fb"
    }
  ],
  test11: [
    {
      name: "Fallout: New Vegas",
      coverUrl: fnv,
      id: "5c9bfd1e054d8f2e1010f128"
    },
    {
      name: "Kingdom Hearts 2",
      coverUrl: kh2,
      id: "5c9bf853054d8f2e1010f106"
    }
  ],
  test12: [
    {
      name: "Star Wars: Knights of the Old Republic II - The Sith Lords",
      coverUrl: kotor2,
      id: "5c9bfb47054d8f2e1010f117"
    },
    {
      name: "Dragon Age: Origins",
      coverUrl: dao,
      id: "5c9bfef9054d8f2e1010f139"
    }
  ],
  voteCount: 1
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_LOADING:
      return Object.assign({}, state, {
        loading: false
      });
    case NEXT_TEST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        showing: state[action.payload]
      });
    case UDPATE_VOTE_COUNT:
      return Object.assign({}, state, {
        voteCount: action.count
      });
    default:
      return state;
  }
}
