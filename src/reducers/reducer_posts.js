// import { FETCH_POSTS } from '../actions/index';
import { FETCH_DRINKS } from '../actions'
import { FETCH_FOOD } from '../actions'
import { FETCH_FOOD_OFFER_PROMO } from '../actions'
import { FETCH_DRINK_OFFER_PROMO } from '../actions'
import { POST_DATA_UPDATED } from '../actions'

const INITIAL_STATE = { all: [], post: null, offer: null, related: null, isLoading: true }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_DATA_UPDATED:
      return { ...state, ...action.payload }
    // case FETCH_POST:
    //   return { ...state, post: action.payload.data };
    // case FETCH_POST_RELATED:
    //   return { ...state, post: action.payload.post};
    case FETCH_DRINKS:
      return { ...state, all: action.payload.data }
    case FETCH_FOOD:
      return { ...state, all: action.payload.data }
    case FETCH_FOOD_OFFER_PROMO:
      return { ...state, offer: action.payload.data }
    case FETCH_DRINK_OFFER_PROMO:
      return { ...state, offer: action.payload.data }
    default:
      return state
  }
}
