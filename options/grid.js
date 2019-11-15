import {setDynamicOption} from 'vue-dynamic-chg/tool'

/** el-row **/
export function elRow(args={}) {
    return setDynamicOption({type:'el-row',...args})
}
/** el-col **/
export function elCol(args={}) {
    return setDynamicOption({type:'el-col',...args})
}


