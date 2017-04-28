import React from 'react'
import {Button} from 'reactstrap'
import firebase from 'firebase'

const DeleteOrder = props => {
  return (
    <Button
      color='danger'
      onClick={() =>
        firebase
          .database()
          .ref('users')
          .child('3548477288')
          .child('orders/-Ki0WpCOa_-i7nkRfTXu')
          .remove()
      // .then((snap) => {
      //   const key = snap.key
      // })
      }
    >
      Delete
    </Button>
  )
}

export default DeleteOrder
