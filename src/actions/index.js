export const ADD_MESSAGE = Symbol("ADD_MESSAGE");
export const RELATE = Symbol("RELATE");
export const FL = Symbol("FL");
export const TLFC = Symbol("TLFC")
export const ADD_TULING =Symbol("ADD_TULING")
export const ADD_KSFL = Symbol("ADD_KSFL")
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