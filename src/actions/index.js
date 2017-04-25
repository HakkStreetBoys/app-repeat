import axios from 'axios';

// export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_DRINKS = 'FETCH_DRINKS';
export const FETCH_FOOD = 'FETCH_FOOD';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_RELATED = 'FETCH_POST_RELATED';
export const POST_DATA_UPDATED = 'POST_DATA_UPDATED';

export const FETCH_FOOD_OFFER_PROMO = 'FETCH_FOOD_OFFER_PROMO';
export const FETCH_DRINK_OFFER_PROMO = 'FETCH_DRINK_OFFER_PROMO';

const ROOT_URL = 'http://pebbleplates.com/repeat-menu/wp-json/wp/v2/menu';
const FOOD_URL = '?menu_cat=8';
const DRINK_URL = '?menu_cat=9';

const OFFER_PROMO = 'http://pebbleplates.com/repeat-menu/wp-json/acf/v2/options';
const FOOD_OFFER_PROMO = 'food_promo';
const DRINK_OFFER_PROMO = 'drink_promo';

export function fetchDrinks() {
  const request = axios.get(`${ROOT_URL}${DRINK_URL}`);

  return {
    type: FETCH_DRINKS,
    payload: request,
  };
}

export function fetchFood() {
  const request = axios.get(`${ROOT_URL}${FOOD_URL}`);

  return {
    type: FETCH_FOOD,
    payload: request
  };
}

// export function fetchPost(id) {
//
//   return (dispatch, getState) => {
//
//     dispatch({
//       type: POST_DATA_UPDATED,
//       payload: {
//         isLoading: true
//       }
//     })
//     dispatch({
//       type: POST_DATA_UPDATED,
//       payload: {
//         isLoadingRelated: true
//       }
//     })
//
//     axios.get(`${ROOT_URL}/${id}`).then(post => {
//       return dispatch({
//         type: FETCH_POST,
//         payload: post
//       })
//     }).catch((error)=>{
//       return dispatch({
//         type: FETCH_POST_FAILED,
//         payload: post
//       })
//     })
//
//     axios.get(`${ROOT_URL}/${related.ID}`).then(related => {
//       return dispatch({
//         type: FETCH_POST_RELATED,
//         payload: related
//       })
//     })
//   }
// }

export function fetchPost(id) {
  return async (dispatch, getState) => {

    try{
      const { data } = await axios.get(`${ROOT_URL}/${id}`);
      // console.log(post);

      const related = await Promise.all(data.acf.menu_related.map(({ID}) => {
        return axios.get(`${ROOT_URL}/${ID}`)
      }))

      return dispatch({
        type: POST_DATA_UPDATED,
        payload: { post: data, isLoading: false, related: related }
      })
    }catch(e){
      console.error(e)
    }
  }
}


// export function fetchRelated(related) {
//   const request = axios.get(`${ROOT_URL}/${related.ID}`);
//
//   return {
//     type: FETCH_RELATED,
//     payload: request
//   };
// }

export function fetchFoodPromo() {
  const request = axios.get(`${OFFER_PROMO}/${FOOD_OFFER_PROMO}`);

  return {
    type: FETCH_FOOD_OFFER_PROMO,
    payload: request
  };
}

export function fetchDrinkPromo() {
  const request = axios.get(`${OFFER_PROMO}/${DRINK_OFFER_PROMO}`);

  return {
    type: FETCH_DRINK_OFFER_PROMO,
    payload: request
  };
}
