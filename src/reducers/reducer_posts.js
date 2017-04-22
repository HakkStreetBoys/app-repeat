// import { FETCH_POSTS } from '../actions/index';
import { FETCH_DRINKS } from '../actions';
import { FETCH_FOOD } from '../actions';
import { FETCH_POST } from '../actions';
import { FETCH_FOOD_OFFER_PROMO } from '../actions';
import { FETCH_DRINK_OFFER_PROMO } from '../actions';

const INITIAL_STATE = { all: [], post: null, offer: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload.data };
    case FETCH_DRINKS:
      return { ...state, all: action.payload.data };
    case FETCH_FOOD:
      return { ...state, all: action.payload.data };
    case FETCH_FOOD_OFFER_PROMO:
      return { ...state, offer: action.payload.data };
    case FETCH_DRINK_OFFER_PROMO:
      return { ...state, offer: action.payload.data };
    default:
      return state;
  }
}
