import { ACCOUNT } from './types'
import { BACKEND } from '../config'

export const fetchAccountData = ({
	endpoint,
	options,
	REQUEST_TYPE,
	ERROR_TYPE,
	SUCCESS_TYPE,
}) => (dispatch) => {
	dispatch({ type: REQUEST_TYPE })
	let url = new URL(`${BACKEND.ADDRESS}/account/${endpoint}`)
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
			//   console.error(error.message);
			//   console.log(Object.keys(error), error.response);
			return dispatch({
				type: ERROR_TYPE,
				message: error.response.data.message,
			})
		})
}

export const login = ({ username, password }) =>
	fetchAccountData({
		endpoint: 'login',
		options: {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: ACCOUNT.REQUEST,
		ERROR_TYPE: ACCOUNT.REQUEST_ERROR,
		SUCCESS_TYPE: ACCOUNT.REQUEST_LOGIN_SUCCESS,
	})

export const signup = ({ username, email, password, confirmPassword }) =>
	fetchAccountData({
		endpoint: 'signup',
		options: {
			method: 'POST',
			body: JSON.stringify({ username, email, password, confirmPassword }),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: ACCOUNT.REQUEST,
		ERROR_TYPE: ACCOUNT.REQUEST_ERROR,
		SUCCESS_TYPE: ACCOUNT.REQUEST_SIGNUP_SUCCESS,
	})

export const logoutAction = () =>
	fetchAccountData({
		endpoint: 'logout',
		options: {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: ACCOUNT.REQUEST,
		ERROR_TYPE: ACCOUNT.REQUEST_ERROR,
		SUCCESS_TYPE: ACCOUNT.REQUEST_LOGOUT_SUCCESS,
	})

export const getAuthenticated = () =>
	fetchAccountData({
		endpoint: 'auth',
		options: {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		},
		REQUEST_TYPE: ACCOUNT.REQUEST,
		ERROR_TYPE: ACCOUNT.REQUEST_ERROR,
		SUCCESS_TYPE: ACCOUNT.REQUEST_AUTHENTICATED_SUCCESS,
	})
