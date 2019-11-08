import * as types from './../types'

const initialState = {
    isLoading: true,
    isSuccess: false,
    isError: false,
    todo: [],
    message: ''
}

export default function reducersTodo(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_TODOS}_PENDING`:
            return {
                isLoading: true
            }
        case `${types.GET_TODOS}_FULFILLED`:
            return {
                isLoading: false,
                isSuccess: true,
                todo: action.payload.data
            }
        case `${types.GET_TODOS}_REJECTED`:
            return {
                isLoading: false,
                isError: true
            }
        case `${types.ADD_TODOS}_PENDING`:
            return {
                isLoading: true
            }
        case `${types.ADD_TODOS}_FULFILLED`:
            return {
                isLoading: false,
                isSuccess: true,
                message: action.payload.data
            }
        case `${types.ADD_TODOS}_REJECTED`:
            return {
                isLoading: false,
                isError: true
            }
        case `${types.EDIT_TODOS}_PENDING`:
            return {
                isLoading: true,
            }

        case `${types.EDIT_TODOS}_FULFILLED`:
            return {
                isLoading: false,
                isSuccess: true,
                message: action.payload.data
            }

        case `${types.EDIT_TODOS}_REJECTED`:
            return {
                isLoading: false,
                isError: true
            }
        case `${types.DELETE_TODO}_PENDING`:
            return {
                isLoading: true,
            }

        case `${types.DELETE_TODO}_FULFILLED`:
            return {
                isLoading: false,
                isSuccess: true,
                message: action.payload.data
            }

        case `${types.DELETE_TODO}_REJECTED`:
            return {
                isLoading: false,
            }
        default:
            return state
    }
}