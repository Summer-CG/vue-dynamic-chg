<script>
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
      let {dynamics} = this.options;
      return h(
        dynamicComponent(this.options),
        {
          props: {
            options: dynamics,
          }
        }
      )
    },

  };
</script>
