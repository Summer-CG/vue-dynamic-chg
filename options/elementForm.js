import {setDynamicOption, setSubordinate,formatComponent,getTypeof} from 'vue-dynamic-chg/tool'

/**---------------------------- el-form ----------------------------**/
/** el-form **/
export function elForm(args={}) {
    return setDynamicOption({type:'el-form',...args})
}

/** el-form-item **/
let elFormItem_subordinate = setSubordinate(['el-form-item'])
export function elFormItem(args={}) {
    return elFormItem_subordinate(args);
}


/**---------------------------- el-input ----------------------------**/
/** el-input **/
let elInput_subordinate = setSubordinate(['el-input'])
export function elInput(args={}) {
    return elInput_subordinate(args);
}
/** el-form-item and el-input **/
export function elFormItem_elInput(args={}) {
  let{ elFormItemProps={},renderOptions={}} = args;

  let placeholder = {placeholder:elFormItemProps.label}

  let {attrs={}} = renderOptions
  renderOptions.attrs = {...placeholder,...attrs};
  args.renderOptions = renderOptions;
  return formatComponent([
      elFormItem({elFormItemProps:args['elFormItemProps']}),
      elInput(args)
  ])
}


/**---------------------------- el-radio ----------------------------**/
/** el-radio **/
let elRadio_subordinate = setSubordinate(['el-radio'])
export function elRadio(args={}) {
    return elRadio_subordinate(args)
}

/** el-form-item and el-radio **/
export function elFormItem_elRadio(args={}) {
    return formatComponent([
        elFormItem({elFormItemProps:args['elFormItemProps']}),
        elRadio(args)
    ])
}

/** el-radio-group **/
let elRadioGroup_subordinate = setSubordinate(['el-radio-group'])
export function elRadioGroup(args={}) {
    return elRadioGroup_subordinate(args)
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
        elFormItem({elFormItemProps:args['elFormItemProps']}),
        elRadioGroup_elRadio(args,radioArr)
    ])
}


/**---------------------------- el-checkbox ----------------------------**/
/** el-checkbox **/
let elCheckbox_subordinate = setSubordinate(['el-checkbox'])
export function elCheckbox(args={}) {
    return elCheckbox_subordinate(args)
}

/** el-form-item and el-checkbox **/
export function elFormItem_elCheckbox(args={}) {
    return formatComponent([
        elFormItem({elFormItemProps:args['elFormItemProps']}),
        elCheckbox(args)
    ])
}

/** el-checkbox-group **/
let elCheckboxGroup_subordinate = setSubordinate(['el-checkbox-group'])
export function elCheckboxGroup(args={}) {
    return elCheckboxGroup_subordinate(args)
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
        elFormItem({elFormItemProps:args['elFormItemProps']}),
        elRadioGroup_elCheckbox(args,radioArr)
    ])
}

/**---------------------------- el-upload ----------------------------**/
/** el-upload **/
let elUpload_subordinate = setSubordinate(['el-upload'])
export function elUpload(args={}) {
  return elUpload_subordinate(args);
}

/** el-form-item and el-upload **/
export function elFormItem_elUpload(args={}) {
  return formatComponent([
    elFormItem({elFormItemProps:args['elFormItemProps']}),
    elUpload(args)
  ])
}

/**---------------------------- el-button ----------------------------**/
/** el-button **/
let elButton_subordinate = setSubordinate(['el-button'])
export function elButton(args={},className) {
  return formatComponent([
    {
      type:'div',
      renderOptions: {
        class:className
      },
    },
    elButton_subordinate(args)
  ])
}
