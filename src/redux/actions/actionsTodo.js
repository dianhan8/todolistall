import * as types from './../types'
import axios from 'axios'


export const handleGetTodo = () => ({
    type: types.GET_TODOS,
    payload: axios({
        method: 'get',
        url: 'https://apitodoslist.herokuapp.com/todos'
    })
})

export const handleAddTodo = (params) => ({
    type: types.ADD_TODOS,
    payload: axios({
        method: 'post',
        url: 'https://apitodoslist.herokuapp.com/todos',
        data: {
            title: params.title,
            category: params.category,
            isDone: false
        }
    })
})

export const handleEditTodo = (params) => ({
    type: types.EDIT_TODOS,
    payload: axios({
        method: 'patch',
        url: `https://apitodoslist.herokuapp.com/todo/${params.id}`,
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
        url: `https://apitodoslist.herokuapp.com/todo/${params.id}`
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