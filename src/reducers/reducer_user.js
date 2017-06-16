import firebase from 'firebase'
import {FETCH_USER_DATA} from '../actions/index'

export default function urserReducer(state = {}, action){
  if(action.type === FETCH_USER_DATA){
    return {...state, ...action.user}
  }
  return state;

}
