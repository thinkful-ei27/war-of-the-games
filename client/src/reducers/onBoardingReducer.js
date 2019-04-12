import {
  NEXT_TEST_SUCCESS, NEXT_TEST_REQUEST
} from '../actions/onboarding';

const initialState = {
  showing: [{ name: 'test', coverUrl: 'test', id: 'test' }, { name: 'test', coverUrl: 'test', id: 'test' }],
  test1: [
    {
      name: "Super Smash Bros. Melee",
      id: "5c9bfa9f054d8f2e1010f115",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/ebp44j3cgyonjxyoa5gp.jpg"
    },
    {
      name: "Halo: Combat Evolved",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg",
      id: "5c9a959ba5d0dd09e07f45a1"
    }],
  test2: [
    {
      name: "Resident Evil 4",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/yj6gl8pylzyvskqki3sy.jpg",
      id: "5c9bf8e6054d8f2e1010f109"
    },
    {
      name: "DOOM",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/exjg5qwydaz7mzyrfvxn.jpg",
      id: "5c9bfce1054d8f2e1010f126"
    }],
  test3: [
    {
      name: "League of Legends",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/lxoumgqbbj3erxgq6a6l.jpg",
      id: "5ca653e11989fe0017440ece"
    },
    {
      name: "World of Warcraft",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/osspygfgdohniipayzeu.jpg",
      id: "5ca2739a5ce0f90ebb413b03"
    }],
  test4: [
    {
      name: "Counter-Strike: Global Offensive",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/tjavlrx5y8lkol7uql40.jpg",
      id: "5ca654661989fe0017440ed3"
    },
    {
      name: "Guild Wars 2",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/q3bhlxeq4x1f92xanjvg.jpg",
      id: "5ca388668b14bd0017521aeb"
    }],
  test5: [
    {
      name: "Dark Souls",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/e57qvevkjfapzizl3qhn.jpg",
      id: "5ca6551b1989fe0017440edc"
    },
    {
      name: "StarCraft II: Wings of Liberty",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/bgn7cqukcnskka73rwse.jpg",
      id: "5c9bfb5d054d8f2e1010f118"
    }],
  test6: [
    {
      name: "Street Fighter II",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg",
      id: "5c9a959ba5d0dd09e07f45a0"
    },
    {
      name: "Age of Empires II: The Age of Kings",
      id: "5c9bfe5d054d8f2e1010f133",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/yoqdjsssreh8sjs9nvtv.jpg"
    }],
  test7: [
    {
      name: "Final Fantasy VII",
      id: "5c9a959ba5d0dd09e07f45a3",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/idzdf1alxvetz3ow2ugy.jpg"
    },
    {
      name: "Diablo: II",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/rdxf2fdxiutxiw0dumto.jpg",
      id: "5c9bfd5c054d8f2e1010f12a"
    }],
  test8: [
    {
      name: "The Legend of Zelda: Ocarina of Time",
      id: "5c9bf3bb1eaffb2ce28273fd",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/gx4b9es5tn3pqhqnqeuu.jpg"
    },
    {
      name: "Dota 2",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/qcx7vedma0pvf0hzisxc.jpg",
      id: "5ca657431989fe0017440ee9"
    }],
  test9: [
    {
      name: "The Elder Scrolls V: Skyrim",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/yakiwtuy29tu0atooopm.jpg",
      id: "5c9bfbea054d8f2e1010f11e"
    },
    {
      name: "Animal Crossing",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/vflxe2qwxcwenvc3p6ly.jpg",
      id: "5ca6580c1989fe0017440eef"
    }],
  test10: [
    {
      name: "Metal Gear Solid 3: Snake Eater",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/v06oxn5nwwrrjoxgnlhk.jpg",
      id: "5c9bf3411eaffb2ce28273f9"
    },
    {
      name: "Mass Effect 2",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/q8shkfzxblrn22o9dvra.jpg",
      id: "5c9bf3801eaffb2ce28273fb"
    }],
  test11: [
    {
      name: "Fallout: New Vegas",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/rkldlhsginkkabox1hk6.jpg",
      id: "5c9bfd1e054d8f2e1010f128"
    },
    {
      name: "Kingdom Hearts 2",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/kawgvnfqvcmjixnnr53i.jpg",
      id: "5c9bf853054d8f2e1010f106"
    }],
  test12: [
    {
      name: "Star Wars: Knights of the Old Republic II - The Sith Lords",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/ijautdkdisocs3mgs8rx.jpg",
      id: "5c9bfb47054d8f2e1010f117"
    },
    {
      name: "Dragon Age: Origins",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/ytpegencacspsudxpgyx.jpg",
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
  return state;
}