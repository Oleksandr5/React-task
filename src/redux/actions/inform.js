import { FETCH_ENDPOINT_DATA_SUCCESS, FETCH_ENDPOINT_DATA_ERROR, PUSH_ENDPOINT, UPDATE_PAGE, UPDATE_HOVER_ENDPOINT } from './actionTypes'
import axios from 'axios'

export function fetchEndpointData() {
	return async dispatch => {

		try {

			const responseEndpoint = await axios.get("https://demo1030918.mockable.io/")
			const endpointData = responseEndpoint.data

			dispatch(fetchEndpointDataSuccess(endpointData))

		} catch (e) {
			dispatch(fetchEndpointDataError(e))
		}
	}
}

export function fetchEndpointDataSuccess(endpoint) {
	return {
		type: FETCH_ENDPOINT_DATA_SUCCESS,
		payload: { endpoint }
	}
}

export function fetchEndpointDataError(e) {
	return {
		type: FETCH_ENDPOINT_DATA_ERROR,
		error: e
	}
}

export function hoverEndpoint({ point }) {
	return (dispatch, getState) => {

		let hoverEndpoint = getState().inform.hoverEndpoint

		hoverEndpoint.unshift(point)

		dispatch(fetchEndpointDataError(hoverEndpoint))

	}
}

export function pushEndpoint(hoverEndpoint) {
	return {
		type: PUSH_ENDPOINT,
		hoverEndpoint
	}
}

export function updatePage() {
	return {
		type: UPDATE_PAGE
	}
}

export function updateHoverEndpoint({ hoverEndpoint }) {
	return {
		type: UPDATE_HOVER_ENDPOINT,
		hoverEndpoint
	}
}