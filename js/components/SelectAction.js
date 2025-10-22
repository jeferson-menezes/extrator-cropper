import { NascimentoService } from "../service/NascimentoService.js";
import InnerLoading from "./InnerLoading.js"

const service = new NascimentoService();

export default {
  components: { InnerLoading },
  props: ['imagem'],
  emits: ['trocarTela', 'set-dados', 'set-texto', 'set-imagem'],
  data() {
    return {
      loading: false,
    };
  },
  template: `
<v-container>

    <v-row justify="justify-end" class="my-4">
        <v-btn color="red-lighten-1" prepend-icon="mdi-arrow-left" @click="$emit('trocarTela', 'UploadVue')">
            Voltar
        </v-btn>
    </v-row>

    <v-card border class="relative">
    <inner-loading color='purple-darken-1' :active="loading" text="Processando arquivo..." />
        
        <v-toolbar color="primary" title="Selecione uma Ação"></v-toolbar>
        
        <v-btn class="position-absolute" color="orange-darken-1" size="large" icon="mdi-box-cutter" location="bottom right"
            @click="editarImagem" offset>
        </v-btn> 

        <v-card-text   class="text-center">
            <v-img v-if="imagem" :src="imagem" max-height="600px" contain class="mb-4"></v-img>
        </v-card-text>

        <v-card-actions>
            <v-row align="center" justify="center" class="gap-4">
                <v-btn prepend-icon="mdi-feather" size="large" color="pink-darken-1" @click="extrairDeOpenNlp"
                    variant="tonal">
                    Extrair de OpenNLP
                </v-btn>
                <v-btn prepend-icon="mdi-octagram" size="large" color="secondary" @click="extrairDeOpenia"
                    variant="tonal">
                    Extrair de OpenIA
                </v-btn>
                <v-btn prepend-icon="mdi-ocr" size="large" color="primary" @click="extrairDeOcr" variant="tonal">
                    Extrair OCR
                </v-btn>
            </v-row>
        </v-card-actions>
    </v-card>

</v-container>
  `,
  methods: {

    async extrairDeOcr() {

      try {
        this.loading = true
        const file = await this.converterBase64ParaFile(this.imagem, "imagem.png");
        const data = new FormData();
        data.append("file", file);
        const res = await service.extrairDeOCR(data);
        this.$emit('set-texto', res.texto);
        this.$emit('trocarTela', 'TextOcr');
      } catch (err) {

      } finally {
        this.loading = false
      }
    },

    async extrairDeOpenia() {

      try {
        this.loading = true
        const file = await this.converterBase64ParaFile(this.imagem, "imagem.png");
        const data = new FormData();
        data.append("file", file);
        const res = await service.extrairDeOpenIa(data);
        this.$emit('set-dados', res);
        this.$emit('trocarTela', 'ExtractData');
      } catch (err) {

      } finally {
        this.loading = false
      }
    },

    async extrairDeOpenNlp() {

      try {
        this.loading = true
        const file = await this.converterBase64ParaFile(this.imagem, "imagem.png");
        const data = new FormData();
        data.append("file", file);
        const res = await service.extrairDeOpenNlp(data);
        this.$emit('set-dados', res);
        this.$emit('trocarTela', 'ExtractData');
      } catch (err) {

      } finally {
        this.loading = false
      }
    },

    editarImagem() {
      this.$emit('set-imagem', this.imagem);
      this.$emit('trocarTela', 'EditImage');
    },

    async converterBase64ParaFile(dataUrl, filename) {
      const { base64ToFile } = await import('../helpers/FileHelper.js');
      return base64ToFile(dataUrl, filename);
    }
  }
};
