import {FETCH_USER_DATA} from '../actions/index'

export default function urserReducer(state = {}, action){
  console.log("the action type is:", action.type)
  if(action.type === FETCH_USER_DATA){
    return action.user
  }
  return state;

}
