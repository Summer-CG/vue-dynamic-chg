import Vue from 'vue';
import {getTypeof} from "../tool/index.js";

export function getStringData(scope = {}, keyTemplate) {
    let identifying = '.';
    if (keyTemplate.indexOf(identifying) > 0) {
        let relationshipArr = keyTemplate.split(identifying);
        let maxIndex = relationshipArr.length;
        let prev = scope;
        for (let [index, key]of relationshipArr.entries()) {
            if (index + 2 >= maxIndex) {
                return {parent: prev[key], child: relationshipArr[maxIndex - 1]}
            } else {
                prev = prev[key];
            }
        }
    } else {
        return {parent: scope, child: keyTemplate}
    }
}

export function formatData(scope = {}, sourceData, keyTemplate) {
    let identifying = '.';
    if (keyTemplate.indexOf(identifying) > 0) {
        let relationshipArr = keyTemplate.split(identifying);
        let maxIndex = relationshipArr.length;
        return relationshipArr.reduce(function (prev, key, index) {
            if (!prev[key]) prev[key] = {};
            if (index + 1 >= maxIndex) {
                return prev[key] = sourceData[keyTemplate]
            } else {
                return prev[key];
            }
        }, scope)
    } else {
        return scope[keyTemplate] = sourceData[keyTemplate]
    }
}

export function getMergeOptions(MergeOptions, OptionsData, value = {}) {
    for (let item of OptionsData) {
        let {children} = item;
        for (let cell of MergeOptions) {
            if (!item[cell]) continue;
            switch (cell) {
                case'lifecycle':
                    if (!value[cell]) {
                        value[cell] = {};
                    }
                    if (getTypeof(item[cell]) === 'Object') {
                        for (let lifecycleName of Object.keys(item[cell])) {
                            if (!value[cell][lifecycleName]) value[cell][lifecycleName] = [];
                            value[cell][lifecycleName].push(item[cell][lifecycleName])
                        }
                    }
                    break;
                case'data':
                    if (!value[cell]) {
                        value[cell] = {};
                    }
                    for (let key of Object.keys(item[cell])) {
                        formatData(value[cell], item[cell], key)
                    }
                    break;
                default:
                    value[cell] = Object.assign(value[cell] || {}, item[cell])
                    break;
            }
        }
        if (Array.isArray(children) && children.length > 0) {
            getMergeOptions(MergeOptions, children, value);
        }
    }
    return value;
}

export function getComponentOptions(mergeOptions) {
    let data = {};
    for (let [key, value]of Object.entries(mergeOptions)) {
        switch (key) {
            case'lifecycle':
                for (let [lifecycleName, lifecycleArr]of Object.entries(value)) {
                    data[lifecycleName] = function () {
                        for (let lifecycleItem of lifecycleArr) {
                            lifecycleItem.call(this);
                        }
                    }
                }
                break;
            case'data':
                data[key] = function () {
                    return JSON.parse(JSON.stringify(value));
                }
                break;
            default:
                data[key] = value;
                break;
        }
    }
    return data;
}

export function getPublicComponentOption() {
    return {
        name: "dynamicComponent", render: function (...args) {
            let h = args[0];
            let vNode = this.createComponent(h, this.options);
            if(this.options.length===1){
                return vNode
            }
            else{
                return h('div', vNode)
            }
        }, props: {
            options: {
                type: Array, default() {
                    return [];
                }
            }
        }, methods: {
            compile(template) {
                return Vue.compile(template)
            }, getStaticHtml(staticHtml, h) {
                let staticHtmlType = getTypeof(staticHtml);
                switch (staticHtmlType) {
                    case'Function':
                        let children = staticHtml.call(this, h);
                        if (Array.isArray(children) && children.length > 0) {
                            return children;
                        } else {
                            return false;
                        }
                        break;
                    case'Array':
                        if (Array.isArray(staticHtml) && staticHtml > 0) {
                            return staticHtml;
                        } else {
                            return false;
                        }
                        break;
                    default:
                        return false;
                        break;
                }
            }, bindThis(scope, type, value) {
                switch (type) {
                    case'Object':
                        let data = {};
                        Object.keys(value).forEach(key => {
                            getTypeof(value[key]) === 'Function' ? (data[key] = value[key].bind(this)) : data[key] = value[key]
                        });
                        return data;
                        break;
                    case'Array':
                        value.forEach(item => getTypeof(item) === 'Function' ? (item.bind(this)) : item);
                        return [...value];
                        break;
                    default:
                        return value;
                        break;
                }
            }, getTypeofValue(value, h) {
                let type = getTypeof(value);
                switch (type) {
                    case'Function':
                        return value.call(this, h);
                        break;
                    case'Object':
                        return this.bindThis(this, 'Object', value);
                        break;
                    case'Array':
                        return this.bindThis(this, 'Array', value);
                        break;
                    default:
                        return value;
                        break;
                }
            }, getOptionData(h, renderOptions = ()=>{}) {
                let options = renderOptions.call(this,h)
                return {refInFor: true, ...options};
            }, getChildren(h, componentOption) {
                let {children} = componentOption;
                if (Array.isArray(children) && children.length > 0) {
                    return this.createComponent(h, children);
                } else {
                    return [];
                }
            }, createComponent(h, componentOptions) {
                return componentOptions.map((item) => {
                    let {type='div', template} = item;
                    if (!template) {
                        let children = this.getStaticHtml(item.staticHtml, h);
                        if (!children) {
                            children = this.getChildren(h, item);
                        }
                        let optionData = this.getOptionData(h, item.renderOptions);
                        if (item.vIf && item.vIf.call(this)) {
                            return [];
                        }
                        if (getTypeof(item.vModel) === 'String') {
                            let obj = getStringData(this, item.vModel);
                            if (!optionData.props) {
                                optionData.props = {value: obj.parent[obj.child]}
                            } else {
                                optionData.props = {...optionData.props, value: obj.parent[obj.child]}
                            }
                            if (!optionData.on) {
                                optionData.on = {
                                    input(value) {
                                        obj.parent[obj.child] = value;
                                    },
                                }
                            } else {
                                optionData.on = {
                                    ...optionData.on, input(value) {
                                        obj.parent[obj.child] = value;
                                    },
                                }
                            }
                        }
                        if (getTypeof(item.vFor) === 'Function') {
                            return h(type, optionData, item.vFor.call(this, h))
                        }
                        return h(type, optionData, [...children]);
                    } else {
                        return this.compile(template).render.call(this, h)
                    }
                });
            }
        },
    }
}