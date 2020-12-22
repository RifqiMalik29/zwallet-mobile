import Axios from 'axios'
import { SEARCH, SEARCH_BY_NAME, GET_USER_TRANSFER } from '../type/search'
import { URI } from '../../utils'

export const search = token => async dispatch => {
    const res = await Axios.get(`${URI}/users/search`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    dispatch({ type: SEARCH, payload: res.data })
}

export const searchByName = (token, query) => async dispatch => {
    const res = await Axios.get(`${URI}/users/search/query`, {
        params: {
            q: query
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    dispatch({ type: SEARCH_BY_NAME, payload: res.data })
}

export const getUserTransfer = (token, phone) => async dispatch => {
    const res = await Axios.get(`${URI}/users/search/receiver`, {
        params: {
            phone
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    dispatch({ type: GET_USER_TRANSFER, payload: res.data })
}