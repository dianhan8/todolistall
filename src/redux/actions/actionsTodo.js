import * as types from './../types'
import axios from 'axios'


export const handleGetTodo = () => ({
    type: types.GET_TODOS,
    payload: axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos'
    })
})

export const handleAddTodo = (params) => ({
    type: types.ADD_TODOS,
    payload: axios({
        method: 'post',
        url: '',
        data: {
            title: params.title,
            category: params.category
        }
    })
})

export const handleEditTodo = (params) => ({
    type: types.EDIT_TODOS,
    payload: axios({
        method: 'patch',
        url: '',
        data: {
            title: params.title,
            category: params.category
        }
    })
})

export const handleDeleteTodo = (params) => ({
    type: types.DELETE_TODO,
    payload: axios({
        method: 'delete',
        url: ''
    })
})

export const handleChecked = (done) => ({
    type: types.CHECKED,
    payload: axios({
        method: 'patch',
        url: '',
        data: {
            isDone: done
        }
    })
})