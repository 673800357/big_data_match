import {SET_INFO} from '../actions/index';
const initialState = {
    age:20,
    sex:'男',
    name:''
}
export function user(state = initialState, action) {
    switch (action.type) {
        case SET_INFO:
            return {
                ...action.data
            }
        default:
            return state
    }
}