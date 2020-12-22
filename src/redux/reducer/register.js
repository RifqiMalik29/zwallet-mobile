import { FORM_FILLED, PIN_FILLED, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, EMAIL_CHECK } from '../type/register'

const initialState = {
    data: {
        name: '',
        email: '',
        password: '',
        pin: ''
    },
    loading: false,
    isFormFilled: false,
    isPinFilled: false,
    isSuccess: false,
    message: '',
    emailChecked: false,
    messageEmail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FORM_FILLED:
            return {
                ...state,
                data : {
                    ...state.data,
                    ...action.payload
                },
                isFormFilled: true
            }
        case EMAIL_CHECK:
            return {
                ...state,
                messageEmail: action.payload
            }
        case PIN_FILLED:
            return {
                ...state,
                data: {
                    ...state.data,
                    pin: action.payload
                },
                isPinFilled: true
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                message: action.payload
            }
        case REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                isSuccess: false,
                message: action.payload
            }
        default:
            return {
                ...state,
                isFormFilled: false
            }
    }
}