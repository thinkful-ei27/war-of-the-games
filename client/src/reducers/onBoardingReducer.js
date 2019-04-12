import {
  NEXT_TEST_SUCCESS,
  NEXT_TEST_REQUEST,
  SET_LOADING,
  CLEAR_LOADING
} from '../actions/onboarding';

const initialState = {
  showing: [{ name: 'test', coverUrl: 'test', id: 'test' }, { name: 'test', coverUrl: 'test', id: 'test' }],
  test1: [
    {
      name: "Super Smash Bros. Melee",
      id: "5c9bfa9f054d8f2e1010f115",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168707/5c9bfa9f054d8f2e1010f115.jpg"
    },
    {
      name: "Halo: Combat Evolved",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554169096/5c9a959ba5d0dd09e07f45a1.jpg",
      id: "5c9a959ba5d0dd09e07f45a1"
    }],
  test2: [
    {
      name: "Resident Evil 4",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554210751/5c9bf8e6054d8f2e1010f109.jpg",
      id: "5c9bf8e6054d8f2e1010f109"
    },
    {
      name: "DOOM",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554169097/5c9bfce1054d8f2e1010f126.jpg",
      id: "5c9bfce1054d8f2e1010f126"
    }],
  test3: [
    {
      name: "League of Legends",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554404321/5ca653e11989fe0017440ece.jpg",
      id: "5ca653e11989fe0017440ece"
    },
    {
      name: "World of Warcraft",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168897/5ca2739a5ce0f90ebb413b03.jpg",
      id: "5ca2739a5ce0f90ebb413b03"
    }],
  test4: [
    {
      name: "Counter-Strike: Global Offensive",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554404455/5ca654661989fe0017440ed3.jpg",
      id: "5ca654661989fe0017440ed3"
    },
    {
      name: "Guild Wars 2",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554231073/5ca388668b14bd0017521aeb.jpg",
      id: "5ca388668b14bd0017521aeb"
    }],
  test5: [
    {
      name: "Dark Souls",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554404635/5ca6551b1989fe0017440edc.jpg",
      id: "5ca6551b1989fe0017440edc"
    },
    {
      name: "StarCraft II: Wings of Liberty",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554169070/5c9bfb5d054d8f2e1010f118.jpg",
      id: "5c9bfb5d054d8f2e1010f118"
    }],
  test6: [
    {
      name: "Street Fighter II",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168904/5c9a959ba5d0dd09e07f45a0.jpg",
      id: "5c9a959ba5d0dd09e07f45a0"
    },
    {
      name: "Age of Empires II: The Age of Kings",
      id: "5c9bfe5d054d8f2e1010f133",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554518494/5ca811dc9cd89ef9c62588fb.jpg"
    }],
  test7: [
    {
      name: "Final Fantasy VII",
      id: "5c9a959ba5d0dd09e07f45a3",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554169125/5c9a959ba5d0dd09e07f45a3.jpg"
    },
    {
      name: "Diablo: II",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168737/5c9bfd5c054d8f2e1010f12a.jpg",
      id: "5c9bfd5c054d8f2e1010f12a"
    }],
  test8: [
    {
      name: "The Legend of Zelda: Ocarina of Time",
      id: "5c9bf3bb1eaffb2ce28273fd",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168956/5c9bf3bb1eaffb2ce28273fd.jpg"
    },
    {
      name: "Dota 2",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554405193/5ca657431989fe0017440ee9.jpg",
      id: "5ca657431989fe0017440ee9"
    }],
  test9: [
    {
      name: "The Elder Scrolls V: Skyrim",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168577/5c9bfbea054d8f2e1010f11e.jpg",
      id: "5c9bfbea054d8f2e1010f11e"
    },
    {
      name: "Animal Crossing",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554405388/5ca6580c1989fe0017440eef.jpg",
      id: "5ca6580c1989fe0017440eef"
    }],
  test10: [
    {
      name: "Metal Gear Solid 3: Snake Eater",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168673/5c9bf3411eaffb2ce28273f9.jpg",
      id: "5c9bf3411eaffb2ce28273f9"
    },
    {
      name: "Mass Effect 2",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554169042/5c9bf3801eaffb2ce28273fb.jpg",
      id: "5c9bf3801eaffb2ce28273fb"
    }],
  test11: [
    {
      name: "Fallout: New Vegas",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554210723/5c9bfd1e054d8f2e1010f128.jpg",
      id: "5c9bfd1e054d8f2e1010f128"
    },
    {
      name: "Kingdom Hearts 2",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554170111/5c9bf853054d8f2e1010f106.jpg",
      id: "5c9bf853054d8f2e1010f106"
    }],
  test12: [
    {
      name: "Star Wars: Knights of the Old Republic II - The Sith Lords",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554169099/5c9bfb47054d8f2e1010f117.jpg",
      id: "5c9bfb47054d8f2e1010f117"
    },
    {
      name: "Dragon Age: Origins",
      coverUrl: "https://res.cloudinary.com/hjihgo1pd/image/upload/v1554168735/5c9bfef9054d8f2e1010f139.jpg",
      id: "5c9bfef9054d8f2e1010f139"
    }
  ],
  loading: false
}
export default function reducer(state = initialState, action) {
  if (action.type === NEXT_TEST_SUCCESS) {
    let next;
    next = action.payload
    return Object.assign({}, state, {
      loading: false,
      showing: state[next]
    })
  }
  else if (action.type === NEXT_TEST_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    })
  }

  else if (action.type === CLEAR_LOADING) {
    return Object.assign({}, state, {
      loading: false
    })
  }

  else if (action.type === SET_LOADING) {
    return Object.assign({}, state, {
      loading: true
    })
  }
  return state;
}