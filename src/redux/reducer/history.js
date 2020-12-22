import { GET_HISTORY_BY_MONTH, GET_HISTORY_BY_WEEK, GET_HISTORY, GET_HISTORY_TODAY, GET_HISTORY_BY_FILTER } from '../type/history'

const initialState = {
    dataAll: [],
    dataWeek: [],
    dataMonth: [],
    dataToday: [],
    dataFilter: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_HISTORY:
            return {
                ...state,
                dataAll: action.payload
            }
        case GET_HISTORY_BY_WEEK:
            return {
                ...state,
                dataWeek: action.payload
            }
        case GET_HISTORY_BY_MONTH:
            return {
                ...state,
                dataMonth: action.payload
            }
        case GET_HISTORY_TODAY:
            return {
                ...state,
                dataToday: action.payload
            }
        case GET_HISTORY_BY_FILTER:
            return {
                ...state,
                dataFilter: action.payload
            }
        default:
            return {
                ...state
            }
    }
}