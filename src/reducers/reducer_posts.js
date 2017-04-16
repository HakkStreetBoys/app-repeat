// import { FETCH_POSTS } from '../actions/index';
import { FETCH_DRINKS } from '../actions/index';
import { FETCH_FOOD } from '../actions/index';
import { FETCH_POST } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload.data };
    case FETCH_DRINKS:
      return { ...state, all: action.payload.data };
    case FETCH_FOOD:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
