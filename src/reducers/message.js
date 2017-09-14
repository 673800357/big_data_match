import { ADD_MESSAGE,RELATE ,FL,TLFC,ADD_TULING,ADD_KSFL} from '../actions/index';
import deep from 'deep'
const initialState = {
    messages:[{role:'doctor',message:'你好请问需要什么帮助吗'},
],
fl:{},
tlfc:[],
tuling:"",
ksfl:[]
}
export function message(state= initialState,action){
    let tmp = deep.clone(state);
    switch (action.type){
        case ADD_MESSAGE:
        return {
            ...state,
            messages:[...state.messages,action.data]
        }
        case RELATE:
        return {
            ...state,data:action.data
        }
        case FL://更新分类的问题

        tmp.fl = {}//将分类清空
        tmp.ksfl = []
        tmp.tlfc = []
        tmp.tuling = ""
        action.questions.forEach(item =>{
            if (tmp.fl[item.FL]===undefined){
                //新建分类
                tmp.fl[item.FL] ={}
            }
            if ( tmp.fl[item.FL][item.WT] === undefined){
                //新建问题
                tmp.fl[item.FL][item.WT] = [item.index]
            }
            tmp.fl[item.FL][item.WT].push(item.index)
        })
        return tmp
        case TLFC:
        return {
            ...state,tlfc:action.TLFCs
        }
        case ADD_TULING:
        return {
            ...state,tuling:action.express
        }
        case ADD_KSFL:
        return {
            ...state,ksfl:action.KSFL
        }
        default:
            return state
    }
}