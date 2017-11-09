export const ADD_MESSAGE = Symbol("ADD_MESSAGE");
export const CLEAN_MESSAGE = Symbol("CLEAN_MESSAGE");
export const RELATE = Symbol("RELATE");
export const FL = Symbol("FL");
export const TLFC = Symbol("TLFC")
export const ADD_TULING =Symbol("ADD_TULING")
export const ADD_KSFL = Symbol("ADD_KSFL");
export const SET_USER = Symbol("SET_USER");
export const SET_INFO = Symbol("SET_INFO");
export const SET_HISTORY = Symbol("SET_HISTORY");
export const SET_DOCTOR = Symbol("SET_DOCTOR");
export function addMessage(data){
    return {type:ADD_MESSAGE,data}
}
export function relate(data){
    return {type:RELATE,data}
}
export function addFL(questions){
    return {type:FL,questions}
}
export function addTLFC(TLFCs){
    return {type:TLFC,TLFCs}
}
export function addTULING(express){
    return {type:ADD_TULING,express}
}
export function addKSFL(KSFL){
    return {type:ADD_KSFL,KSFL}
}
export function setInfo(data){
    return {type:SET_INFO,data}
}
export function setUser(data){
    return {type:SET_USER,data}
}
export function setHistory(history){
    return {type:SET_HISTORY,history}
}
export function setDoctor(info){
    return {type:SET_DOCTOR,info}
}
export function cleanMessage(){
    return {type:CLEAN_MESSAGE}
}