import dynamicComponent from '../../core/dynamicComponent';

export default {
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
