// Actions that have to do with fetching informatino from the wordpress server such as what courses/drinks are on the menu and what is on offer
import axios from 'axios'
import {FETCH_DRINKS, FETCH_FOOD, POST_DATA_UPDATED, FETCH_FOOD_OFFER_PROMO, FETCH_DRINK_OFFER_PROMO} from './index'


const ROOT_URL = 'http://pebbleplates.com/repeat-menu/wp-json/wp/v2/menu'
const FOOD_URL = '?menu_cat=8'
const DRINK_URL = '?menu_cat=9&per_page=30'

const OFFER_PROMO = 'http://pebbleplates.com/repeat-menu/wp-json/acf/v2/options'
const FOOD_OFFER_PROMO = 'food_promo'
const DRINK_OFFER_PROMO = 'drink_promo'

export function fetchDrinks () {
  const request = axios.get(`${ROOT_URL}${DRINK_URL}`)

  return {
    type: FETCH_DRINKS,
    payload: request
  }
}

export function fetchFood () {
  const request = axios.get(`${ROOT_URL}${FOOD_URL}`)

  return {
    type: FETCH_FOOD,
    payload: request
  }
}

export function fetchPost (id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${ROOT_URL}/${id}`)

      const related = await Promise.all(data.acf.menu_related.map(({ID}) => {
        return axios.get(`${ROOT_URL}/${ID}`)
      }))

      return dispatch({
        type: POST_DATA_UPDATED,
        payload: { post: data, isLoading: false, related: related }
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export function fetchFoodPromo () {
  const request = axios.get(`${OFFER_PROMO}/${FOOD_OFFER_PROMO}`)

  return {
    type: FETCH_FOOD_OFFER_PROMO,
    payload: request
  }
}

export function fetchDrinkPromo () {
  const request = axios.get(`${OFFER_PROMO}/${DRINK_OFFER_PROMO}`)

  return {
    type: FETCH_DRINK_OFFER_PROMO,
    payload: request
  }
}
