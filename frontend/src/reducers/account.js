import requestStates from './request'
import { ACCOUNT } from '../actions/types'

const DEFAULT_ACCOUNT_DATA = { loggedIn: false }

const account = (state = DEFAULT_ACCOUNT_DATA, action) => {
	switch (action.type) {
		case ACCOUNT.REQUEST:
			return { ...state, status: requestStates.requesting }
		case ACCOUNT.REQUEST_ERROR:
			return { ...state, status: requestStates.error, message: action.message }
		case ACCOUNT.REQUEST_LOGIN_SUCCESS:
			return {
				...state,
				status: requestStates.success,
				message: action.message,
				username: action.username,
				loggedIn: true,
			}
		case ACCOUNT.REQUEST_SIGNUP_SUCCESS:
			return {
				...state,
				status: requestStates.success,
				message: action.message,
			}
		case ACCOUNT.REQUEST_LOGOUT_SUCCESS:
			return {
				...state,
				status: requestStates.success,
				message: action.message,
				loggedIn: false,
			}
		case ACCOUNT.REQUEST_AUTHENTICATED_SUCCESS:
			return {
				...state,
				status: requestStates.success,
				username: action.username,
				loggedIn: action.authenticated,
			}
		default:
			return state
	}
}

export default account
