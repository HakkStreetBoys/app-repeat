import axios from 'axios';

// export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_DRINKS = 'FETCH_DRINKS';
export const FETCH_FOOD = 'FETCH_FOOD';
export const FETCH_POST = 'FETCH_POST';

const ROOT_URL = 'http://pebbleplates.com/repeat-menu/wp-json/wp/v2/menu';
const FOOD_URL = '?menu_cat=8';
const DRINK_URL = '?menu_cat=9';

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
