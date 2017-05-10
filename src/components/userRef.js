
import firebase from './firebase'

/**
 * Ná Firebase tengingu
 */
export default function (user) {
  return firebase.database().ref('users').child(user.uid)
}
