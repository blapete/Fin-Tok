import { YAHOO } from './types'
import { BACKEND } from '../config'

export const fetchYahooData = ({
	endpoint,
	options,
	data,
	REQUEST_TYPE,
	ERROR_TYPE,
	SUCCESS_TYPE,
}) => (dispatch) => {
	dispatch({ type: REQUEST_TYPE })
	let url = new URL(`${BACKEND.ADDRESS}/stock/${endpoint}`)
	if (data) {
		let params = { data }
		Object.keys(params).forEach((key) =>
			url.searchParams.append(key, params[key])
		)
	}
	return fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			if (json.type === 'error') {
				return dispatch({ type: ERROR_TYPE, message: json.message })
			} else {
				return dispatch({
					type: SUCCESS_TYPE,
					...json,
				})
			}
		})
		.catch((error) => {
			// console.error(error);
			// console.log(Object.keys(error), error.response);
			return dispatch({
				type: ERROR_TYPE,
				message: error.message,
			})
		})
}

export const quote = ({ data }) =>
	fetchYahooData({
		endpoint: 'quote',
		data,
		options: {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: YAHOO.REQUEST,
		ERROR_TYPE: YAHOO.REQUEST_ERROR,
		SUCCESS_TYPE: YAHOO.REQUEST_QUOTE_SUCCESS,
	})

export const topWatched = () =>
	fetchYahooData({
		endpoint: 'topstocks',
		data: undefined,
		options: {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: YAHOO.REQUEST,
		ERROR_TYPE: YAHOO.REQUEST_ERROR,
		SUCCESS_TYPE: YAHOO.REQUEST_TOPGAINERS_SUCCESS,
	})
