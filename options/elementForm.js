import {setDynamicOption,formatComponent} from 'vue-dynamic-chg/tool'

/**---------------------------- el-form ----------------------------**/
/** el-form **/
export function elForm(args={}) {
    return setDynamicOption({type:'el-form',...args})
}

/** el-form-item **/
export function elFormItem(args={}) {
    return setDynamicOption({type:'el-form-item',...args})
}


/**---------------------------- el-input ----------------------------**/
/** el-input **/
export function elInput(args={}) {
    return setDynamicOption({type:'el-input',...args})
}
/** el-form-item and el-input **/
export function elFormItem_elInput(args={}) {
    return formatComponent([
        elFormItem({renderOptions:args['elFormItem']}),
        elInput(args)
    ])
}


/**---------------------------- el-radio ----------------------------**/
/** el-radio **/
export function elRadio(args={}) {
    return setDynamicOption({type:'el-radio',...args})
}

/** el-form-item and el-radio **/
export function elFormItem_elRadio(args={}) {
    return formatComponent([
        elFormItem({renderOptions:args['elFormItem']}),
        elRadio(args)
    ])
}

/** el-radio-group **/
export function elRadioGroup(args={}) {
    return setDynamicOption({type:'el-radio-group',...args})
}

/** el-radio-group and el-radio **/
export function elRadioGroup_elRadio(args={},radioArr = []) {
    return formatComponent([
        elRadioGroup({
            ...args,
            vFor(h){
                return radioArr.map(function (item) {
                    return h('el-radio', {
                        props:{
                            label:item.value
                        }
                    },item.label)
                })
            }
        })
    ])
}

/** el-form-item and el-radio-group and el-radio **/
export function elFormItem_elRadioGroup_elRadio(args={},radioArr = []) {
    return formatComponent([
        elFormItem({renderOptions:args['elFormItem']}),
        elRadioGroup_elRadio(args,radioArr)
    ])
}


/**---------------------------- el-checkbox ----------------------------**/
/** el-checkbox **/
export function elCheckbox(args={}) {
    return setDynamicOption({type:'el-checkbox',...args})

}

/** el-form-item and el-checkbox **/
export function elFormItem_elCheckbox(args={}) {
    return formatComponent([
        elFormItem({renderOptions:args['elFormItem']}),
        elCheckbox(args)
    ])
}

/** el-checkbox-group **/
export function elCheckboxGroup(args={}) {
    return setDynamicOption({type:'el-checkbox-group',...args})
}

/** el-checkbox-group and el-checkbox **/
export function elRadioGroup_elCheckbox(args={},radioArr = []) {
    return formatComponent([
        elCheckboxGroup({
            ...args,
            vFor(h){
                return radioArr.map(function (item) {
                    return h('el-checkbox', {
                        props:{
                            label:item.value
                        }
                    },item.label)
                })
            }
        })
    ])
}

/** el-form-item and el-checkbox-group and el-checkbox **/
export function elFormItem_elCheckboxGroup_elCheckbox(args={},radioArr = []) {
    return formatComponent([
        elFormItem({renderOptions:args['elFormItem']}),
        elRadioGroup_elCheckbox(args,radioArr)
    ])
}

/**---------------------------- el-upload ----------------------------**/
/** el-upload **/
export function elUpload(args={}) {
    return setDynamicOption({type:'el-upload',...args})

}

/** el-form-item and el-upload **/
export function elFormItem_elUpload(args={}) {
    return formatComponent([
        elFormItem({renderOptions:args['elFormItem']}),
        elUpload(args)
    ])
}

/**---------------------------- el-button ----------------------------**/
/** el-button **/
export function elButton(args={},className) {
    return formatComponent([
        {
            type:'div',
            renderOptions() {
                return {
                    class:className
                }
            },
        },
        setDynamicOption({type:'el-button',...args})

    ])
}
