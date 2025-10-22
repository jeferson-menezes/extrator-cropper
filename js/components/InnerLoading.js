export default {
    name: "InnerLoading",
    props: {
        active: { type: Boolean, default: false },
        color: { type: String, default: "primary" },
        text: { type: String, default: "Carregando..." },
    },
    template: `
    <transition name="fade">
      <div
        v-if="active"
        class="inner-loading d-flex flex-column align-center justify-center"
      >
        <v-progress-circular
          indeterminate
          :color="color"
          size="48"
          width="5"
        ></v-progress-circular>
        <div class="mt-3 text-body-2">{{ text }}</div>
      </div>
    </transition>
  `,
};