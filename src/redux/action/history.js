import Axios from 'axios'
import { GET_HISTORY, GET_HISTORY_BY_WEEK, GET_HISTORY_BY_MONTH, GET_HISTORY_TODAY, GET_HISTORY_BY_FILTER } from '../type/history'
import { URI } from '../../utils'

export const getHistory = (token) => async dispatch => {
    const res = await Axios.get(`${URI}/transfer/history/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    dispatch({ type: GET_HISTORY, payload: res.data.data })
}

export const getHistoryByWeek = (token) => async dispatch => {
    const res = await Axios.get(`${URI}/transfer/history`, {
        params: {
            order: 'week'
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    
    dispatch({ type: GET_HISTORY_BY_WEEK, payload: res.data.data })
}

export const getHistoryByMonth = (token, page) => async dispatch => {
    const res = await Axios.get(`${URI}/transfer/history`, {
        params: {
            order: 'month',
            page
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    
    dispatch({ type: GET_HISTORY_BY_MONTH, payload: res.data.data })
}

export const getHistoryToday = ( token ) => async dispatch => {
    const res = await Axios.get(`${URI}/transfer/history/today`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    dispatch({ type: GET_HISTORY_TODAY, payload: res.data.data })
}

export const getHistoryByFilter = ( start, end, token ) => async dispatch => {
    const res = await Axios.get(`${URI}/transfer/history/filter`, {
        params: {
            start: start,
            end: end
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    dispatch({ type: GET_HISTORY_BY_FILTER, payload: res.data.data })
}