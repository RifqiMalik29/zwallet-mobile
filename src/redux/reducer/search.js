import { SEARCH, SEARCH_BY_NAME, GET_USER_TRANSFER } from '../type/search'

const initialState = {
    data: [],
    userTransfer: {
        name: '',
        photo: '',
        phone: null,
        balance: 0
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                data: action.payload.data
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                data: action.payload.data
            }
        case GET_USER_TRANSFER:
            return {
                ...state,
                userTransfer: action.payload.data[0]
            }
        default:
            return state;
    }
}