export default {
  props: ['texto'],
  emits: ['trocarTela'],
  template: `
  <v-container>
    <h3>Texto extraído do OCR</h3>
    <v-textarea label="Texto OCR" v-model="textoLocal" auto-grow></v-textarea>
    <v-btn class="mt-3" @click="$emit('trocarTela', 'UploadVue')">Voltar</v-btn>
  </v-container>
  `,

  data() {
    return { textoLocal: this.texto };
  },

  mounted() {

  }
};
