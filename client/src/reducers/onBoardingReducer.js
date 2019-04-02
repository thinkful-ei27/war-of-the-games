import {
  NEXT_TEST
} from '../actions/onboarding';

const initialState = {
  showing: [
    {
      name: "The Legend of Zelda: Ocarina of Time",
      id: "5c9bf3bb1eaffb2ce28273fd",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/gx4b9es5tn3pqhqnqeuu.jpg"
    },
    {
      name: "Final Fantasy VII",
      id: "5c9a959ba5d0dd09e07f45a3",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/idzdf1alxvetz3ow2ugy.jpg"
    }
  ],
  test2: [
    {
      name: "Batman: Arkham City",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/nemib0kgnbo6i0rmlavm.jpg",
      id: "5c9bfe40054d8f2e1010f132"
    },
    {
      name: "Assassin's Creed II",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hpb.jpg",
      id: "5c9bfcfd054d8f2e1010f127"
    }],
  test3: [
    {
      name: "Apex Legends",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1j3t.jpg",
      id: "5ca37c6fa9e9f200170c4e8c"
    },
    {
      name: "Fortnite",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1jrv.jpg",
      id: "5c9bd1913dcda61553d063d5"
    }],
  test4: [
    {
      name: "Resident Evil 4",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/yj6gl8pylzyvskqki3sy.jpg",
      id: "5c9bf8e6054d8f2e1010f109"
    },
    {
      name: "Gears of War",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/tlitpk2q2sixai0cv2qi.jpg",
      id: "5ca3879a8b14bd0017521ae7"
    }],
  test5: [
    {
      name: "Halo: Combat Evolved",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg",
      id: "5c9a959ba5d0dd09e07f45a1"
    },
    {
      name: "Call of Duty 4: Modern Warfare",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/okxplofk1uomxyrnlf2u.jpg",
      id: "5c9e92121293c21e824494af"
    }],
  test6: [
    {
      name: "World of Warcraft",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/osspygfgdohniipayzeu.jpg",
      id: "5ca2739a5ce0f90ebb413b03"
    },
    {
      name: "Guild Wars 2",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/q3bhlxeq4x1f92xanjvg.jpg",
      id: "5ca388668b14bd0017521aeb"
    }],
  test7: [
    {
      name: "Street Fighter II",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg",
      id: "5c9a959ba5d0dd09e07f45a0"
    },
    {
      name: "Mortal Kombat",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg",
      id: "5c9a959ba5d0dd09e07f45a9"
    }],
  test8: [
    {
      name: "Mario Kart 64",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hor.jpg",
      id: "5ca389c78b14bd0017521aee"
    },
    {
      name: "Crash Team Racing",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/dmxlu5lqejciuygelr4h.jpg",
      id: "5ca389de8b14bd0017521af5"
    }],
  test9: [
    {
      name: "Tony Hawk's Pro Skater",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/disoclir8rdecoj8sdxm.jpg",
      id: "5ca38ae68b14bd0017521af9"
    },
    {
      name: "Tony Hawk's Pro Skater 2",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/eksrjpbmz4kdlz6yxoqc.jpg",
      id: "5ca38af48b14bd0017521b00"
    }],
  test10: [
    {
      name: "The Last of Us",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/cceu88e8hf0gr5jpai4n.jpg",
      id: "5c9bf23a1eaffb2ce28273f3"
    },
    {
      name: "God of War",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/cintjlnx6o8qyqtcnajl.jpg",
      id: "5c9beff11eaffb2ce28273ee"
    }]
}
export default function reducer(state = initialState, action) {
  if (action.type === NEXT_TEST) {
    let next;
    next = action.payload
    return Object.assign({}, state, {
      showing: state[next]
    })
  }
  return state;
}