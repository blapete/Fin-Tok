import { ACCOUNT_STOCKS, CLEAR } from './types'
import { BACKEND } from '../config'

export const fetchAccounStocksData = ({
	endpoint,
	options,
	REQUEST_TYPE,
	ERROR_TYPE,
	SUCCESS_TYPE,
}) => (dispatch) => {
	dispatch({ type: REQUEST_TYPE })
	let url = new URL(`${BACKEND.ADDRESS}/fav/${endpoint}`)
	return fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			if (json.type === 'error') {
				return dispatch({ type: ERROR_TYPE, message: json.message })
			} else {
				let accountStocksArray
				// this if block is for removeFavorite & allFavorites action
				if (json.favorites) {
					// if the request is sent for account stocks & the user has none
					if (!json.favorites.length && json.message === 'success') {
						return { message: 'you have no favorites' }
					}
					// if the user removed the last account stock they have, clear yahoo store
					if (!json.favorites.length || json.message === 'removed item') {
						dispatch({
							type: CLEAR.YAHOO,
						})
					}
					// response account stocks is in json => parse
					accountStocksArray = json.favorites
					let parsedStocks = []
					for (let i = 0; i < accountStocksArray.length; i++) {
						let fixed = JSON.parse(accountStocksArray[i])
						parsedStocks.push(fixed)
					}
					let accountStocksData = {
						message: json.message,
						favorites: parsedStocks,
					}

					return dispatch({
						type: SUCCESS_TYPE,
						...accountStocksData,
					})
				}
				// this logic is for addFavorite action
				let accountStocksData = {
					message: json.message,
				}
				return dispatch({
					type: SUCCESS_TYPE,
					...accountStocksData,
				})
			}
		})
		.catch((error) => {
			console.error(error.message)
			console.log(Object.keys(error), error.response)
			return dispatch({
				type: ERROR_TYPE,
				message: error.message,
			})
		})
}

export const addFavorite = ({ flag, stockName, stockSymbol, username }) =>
	fetchAccounStocksData({
		endpoint: 'add',
		options: {
			method: 'POST',
			body: JSON.stringify({ flag, stockName, stockSymbol, username }),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: ACCOUNT_STOCKS.REQUEST,
		ERROR_TYPE: ACCOUNT_STOCKS.REQUEST_ERROR,
		SUCCESS_TYPE: ACCOUNT_STOCKS.REQUEST_ADD_SUCCESS,
	})

export const removeFavorite = ({ id, username }) => {
	let params = `${id}|${username}`
	return fetchAccounStocksData({
		endpoint: 'remove/' + params,
		options: {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: ACCOUNT_STOCKS.REQUEST,
		ERROR_TYPE: ACCOUNT_STOCKS.REQUEST_ERROR,
		SUCCESS_TYPE: ACCOUNT_STOCKS.REQUEST_DELETE_SUCCESS,
	})
}

export const allFavorites = ({ username }) =>
	fetchAccounStocksData({
		endpoint: 'all',
		options: {
			method: 'POST',
			body: JSON.stringify({ username }),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: ACCOUNT_STOCKS.REQUEST,
		ERROR_TYPE: ACCOUNT_STOCKS.REQUEST_ERROR,
		SUCCESS_TYPE: ACCOUNT_STOCKS.REQUEST_ALLSTOCKS_SUCCESS,
	})

export const reset = () => async (dispatch) => {
	dispatch({
		type: CLEAR.ACCOUNT_STOCKS,
	})
	dispatch({
		type: CLEAR.YAHOO,
	})
}
