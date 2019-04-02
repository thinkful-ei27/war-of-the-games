import {
  NEXT_TEST
} from '../actions/onboarding';

const initialState = {
  showing: [
    {
      name: 'god of war 2',
      id: "5c9bfc61054d8f2e1010f122",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/f3mwxy3opbrbmcyguhly.jpg"
    },
    {
      name: 'tetris',
      id: "5c9bf9df054d8f2e1010f111",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hvk.jpg"
    }
  ],
  test2: [
    {
      name: "Resident Evil 4",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/yj6gl8pylzyvskqki3sy.jpg",
      id: "5c9bf8e6054d8f2e1010f109"
    },
    {
      name: "Final Fantasy VIII",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/w2yteagrractpjc47zey.jpg",
      id: "14253642354"
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