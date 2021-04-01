import { FETCH_ENDPOINT_DATA_SUCCESS, FETCH_ENDPOINT_DATA_ERROR, PUSH_ENDPOINT, UPDATE_PAGE, UPDATE_HOVER_ENDPOINT } from '../actions/actionTypes'

const initialState = {
	endpoint: {},
	hoverEndpoint: [],
	error: '',
	updatePageChecked: false
}

export default function inform(state = initialState, action) {

	switch (action.type) {

		case FETCH_ENDPOINT_DATA_SUCCESS:
			return {
				...state,
				endpoint: action.payload.endpoint === null ? [] : action.payload.endpoint
			}

		case FETCH_ENDPOINT_DATA_ERROR:
			return {
				...state, error: action.error
			}

		case PUSH_ENDPOINT:
			return {
				...state, hoverEndpoint: action.hoverEndpoint
			}

		case UPDATE_HOVER_ENDPOINT:
			return {
				...state, hoverEndpoint: action.hoverEndpoint
			}

		case UPDATE_PAGE:
			return {
				...state, updatePageChecked: !{ ...state }.updatePageChecked
			}

		default:
			return state
	}

}