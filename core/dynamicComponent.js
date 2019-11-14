import {getMergeOptions, getComponentOptions, getPublicComponentOption} from './dynamicMethods.js'

const publicMergeOptions = ["data", "lifecycle", "watch", "computed", "methods", "components"];
const dynamicComponent = function (options) {
    let dynamicComponentOptions = getPublicComponentOption();
    let {dynamics = [], ...parent} = options;
    parent.children = dynamics;
    let mergeData = getMergeOptions(publicMergeOptions, [parent]);
    let ComponentOptions = getComponentOptions(mergeData);
    dynamicComponentOptions.methods = Object.assign(dynamicComponentOptions.methods, ComponentOptions.methods);
    let {methods, ...segment} = ComponentOptions;
    return {...dynamicComponentOptions, ...segment}
}
export default dynamicComponent;