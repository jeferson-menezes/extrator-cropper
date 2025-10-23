export default {
  props: ['texto'],
  emits: ['trocarTela'],
  template: `
    <v-container>
        <v-row justify="justify-end" class="my-4">
            <v-btn color="red-lighten-1" prepend-icon="mdi-arrow-left" @click="$emit('trocarTela', 'SelectAction')">
                Voltar
            </v-btn>
        </v-row>

        <v-card border class="relative">
            <v-toolbar color="primary" title="Texto Extraido de OCR"></v-toolbar>

            <v-card-text class="text-center">
                <v-textarea max-height="600px" label="Texto OCR" v-model="textoLocal" auto-grow></v-textarea>
            </v-card-text>
        </v-card>

    </v-container>
  `,

  data() {
    return { textoLocal: this.texto };
  },

  mounted() {

  }
};
