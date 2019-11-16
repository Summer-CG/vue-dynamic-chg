import {getMergeOptions, getComponentOptions, getPublicComponentOption} from './dynamicMethods.js'

const publicMergeOptions = ["data", "lifecycle", "watch", "computed", "methods", "components"];
const dynamicComponent = function (options) {
    let dynamicComponentOptions = getPublicComponentOption();
    let mergeData = getMergeOptions(publicMergeOptions, [options]);
    let ComponentOptions = getComponentOptions(mergeData);
    dynamicComponentOptions.methods = Object.assign(dynamicComponentOptions.methods, ComponentOptions.methods);
    let {methods, ...segment} = ComponentOptions;
    return {...dynamicComponentOptions, ...segment}
}
export default dynamicComponent;