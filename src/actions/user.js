import firebase from '../components/firebase';
import { FETCH_USER_DATA } from './index'
//All actions related to users them selves such as orders and login info (firebase stuff)
export function getUserInfo() {
  return dispatch => {
    return firebase.auth().onAuthStateChanged(user => {
      dispatch({ type: FETCH_USER_DATA, user });
    })
  }
}
