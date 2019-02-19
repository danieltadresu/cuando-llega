import round from 'lodash/round'
import get from 'lodash/get'
import { stops } from 'transantiago-api-client'

const config = {
  baseURL: 'https://transantiago.herokuapp.com',
  timeout: 4500
}

export const distance = meters =>
  meters && (meters < 1000 ? `${meters}m` : `${round(meters / 1000, 2)}km`)

export const urlForStop = stopId =>
  `https://www.transantiago.cl/planifica?paradero=${stopId}&servicio=&section=cll`

export function fetchNextArrivals (stopId) {
  return stops
    .nextArrivals(stopId, config)
    .then(response => get(response, 'data.results', []))
}
