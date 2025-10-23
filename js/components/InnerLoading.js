export default {
    name: "InnerLoading",
    props: {
        active: { type: Boolean, default: false },
        color: { type: String, default: "pink" },
        text: { type: String, default: "Carregando..." },
    },
    template: `
    <transition name="fade">
        <div v-if="active" class="inner-loading d-flex flex-column align-center justify-center">
            <v-progress-circular indeterminate :color="color" size="80" width="7"></v-progress-circular>
            <div class="mt-3 text-xl font-medium">{{ text }}</div>
        </div>
    </transition>
  `,
};