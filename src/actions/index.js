import axios from 'axios';

// export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_DRINKS = 'FETCH_DRINKS';
export const FETCH_FOOD = 'FETCH_FOOD';
export const FETCH_POST = 'FETCH_POST';

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

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/${id}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

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
