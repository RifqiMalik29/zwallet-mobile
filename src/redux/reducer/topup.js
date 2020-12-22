import { TOPUP, CHARGE_TOPUP_1, CHARGE_TOPUP_2, CHARGE_TOPUP_3 } from "../type/topup";

const initialState = {
    data: [],
    token20k: '',
    token50k: '',
    token100k: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOPUP:
            return {
                ...state,
                data: action.payload.data
            }
        case CHARGE_TOPUP_1:
            return {
                ...state,
                token20k: action.payload.token
            }
        case CHARGE_TOPUP_2:
            return {
                ...state,
                token50k: action.payload.token
            }
        case CHARGE_TOPUP_3:
            return {
                ...state,
                token100k: action.payload.token
            }
        default:
            return state
    }
}