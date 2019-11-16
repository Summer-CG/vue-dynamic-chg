import dynamicComponent from '../../core/dynamicComponent';

 const dynamic = {
    name: "dynamic",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    render(h) {
        return h(
            dynamicComponent(this.options),
            {
                props: {
                    options: [this.options],
                }
            }
        )
    },
};
dynamic.install = function(Vue) {
    Vue.component(dynamic.name,dynamic);
};
export default dynamic