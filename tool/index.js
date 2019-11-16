function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const typeofMap = {
    '[object Undefined]': 'Undefined',
    '[object Null]': 'Null',
    '[object Boolean]': 'Boolean',
    '[object Number]': 'Number',
    '[object String]': 'String',
    '[object Object]': 'Object',
    '[object Array]': 'Array',
    '[object Function]': 'Function',
    '[object Date]': 'Date',
    '[object RegExp]': 'RegExp',
    '[object Error]': 'Error',
    '[object Arguments]': 'Arguments',
}

export function getTypeof(value) {
    let type = Object.prototype.toString.call(value)
    return typeofMap[type]
}

const getParentFormat = publicConfig => {
    let len = publicConfig.length;
    let parentAll = {};
    let parentLast;
    publicConfig.reduce((newData, curr, index) => {
        let type = getTypeof(curr);
        let obj;
        switch (type) {
            case'Object':
                obj = {...curr};
                break;
            case'String':
                obj = {type: curr};
                break;
            default:
                break;
        }
        newData = Object.assign(newData, obj);
        if (index + 1 < len) {
            newData.children = [{}];
            return newData.children[0];
        } else {
            parentLast = newData;
            return newData;
        }
    }, parentAll);
    return {parentLast, parentAll}
}

export function formatComponent(publicConfig, children = []) {
    let {parentLast, parentAll} = getParentFormat(publicConfig);
    parentLast.children = [...children]
    return parentAll;
}

export function setDynamicOption(args = {}) {
    return {...args}
}

export function gethumpName(options = []) {
    return options.map(componentName => {
        switch (getTypeof(componentName)) {
            case'String':
                let nameArr = componentName.split('-');
                let humpName = componentName;
                if (nameArr.length > 0) {
                    humpName = nameArr.slice(1).reduce(function (prev, curr) {
                        prev += curr.charAt(0).toUpperCase() + curr.slice(1);
                        return prev;
                    }, nameArr[0]);
                }
                return humpName + 'Props'
                break;
            default:
                return componentName;
                break;
        }
    })
}

function copyArray(ori, type, copy = []) {
    for (const [index, value] of ori.entries()) {
        copy[index] = deepCopy(value);
    }
    return copy;
}

function copyObject(ori, type, copy = {}) {
    for (const [key, value] of Object.entries(ori)) {
        copy[key] = deepCopy(value);
    }
    return copy;
}

function copyFunction(ori, type, copy = () => {}) {
    const fun = eval(ori.toString());
    fun.prototype = ori.prototype
    return fun
}

export function deepCopy(ori) {
    const type = getTypeof(ori);
    let copy;
    switch (type) {
        case 'Array':
            return copyArray(ori, type, copy);
        case 'Object':
            return copyObject(ori, type, copy);
        case 'Function':
            return copyFunction(ori, type, copy);
        default:
            return ori;
    }
}
