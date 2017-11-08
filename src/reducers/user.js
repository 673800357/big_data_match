import {SET_INFO,SET_USER,SET_HISTORY,SET_DOCTOR} from '../actions/index';
import deep from 'deep';
const initialState = {
    age:20,
    sex:'男',
    name:'',
    user:'游客',
    history:'login',
    doctor:{}
}
export function user(state = initialState, action) {
    console.log(action)
    let tmp = deep.clone(state);
    switch (action.type) {
        case SET_INFO:
            return {
                ...tmp,...action.data
            }
        case SET_USER:
            return {
               ...tmp, ...action.data
            }
        case SET_HISTORY:
        return {
            ...tmp,history:action.history
        }
        case SET_DOCTOR:
        return {
            ...tmp,doctor:{
                ...action.info
            }
        }
        default:
            return state
    }
}