import { NascimentoService } from "../service/NascimentoService.js";
import { FileHelper } from "../helper/FileHelper.js"

const service = new NascimentoService();

export default {
    props: ['imagem'],
    emits: ['trocarTela', 'setImagem'],

    data() {
        return {
            preview: this.imagem || null,
            loading: false,
        };
    },
    watch: {
        imagem(nova) {
            console.log("Nova imagem recebida:", nova);
            this.preview = nova;
        }
    },
    methods: {

        async onFileChange(e) {

            const file = e.target.files[0];
            if (!file) return;

            this.loading = true;

            try {
                const dataUrl = await FileHelper.fileToDataUrl(file)
                this.preview = dataUrl
                this.$emit('set-imagem', dataUrl);

            } catch (err) {
                console.error("Erro ao converter arquivo:", err);
                alert("Erro ao converter arquivo. Verifique o formato.");
            } finally {
                this.loading = false;
            }
        },

        recortarImagem() {
            this.$emit('set-imagem', this.preview)
            this.$emit('trocar-tela', 'EditImage')
        },

        async extrairDeOcr() {
            const file = FileHelper.dataUrlToFile(this.preview, 'imagem_ocr.png');
            const data = new FormData();
            data.append("file", file);

            const res = await service.extrairDeOCR(data);
            this.$emit('set-texto', res.texto);
            this.$emit('trocar-tela', 'TextOcr');
        },

        async extrairDeOpenia() {
            const file = FileHelper.dataUrlToFile(this.preview, 'imagem_openia.png');
            const data = new FormData();
            data.append("file", file);

            const res = await service.extrairDeOpenIa(data);
            this.$emit('set-dados', res);
            this.$emit('trocar-tela', 'ExtractData');
        },

        async extrairDeOpenNlp() {
            const file = FileHelper.dataUrlToFile(this.preview, 'imagem_nlp.png');
            const data = new FormData();
            data.append("file", file);

            const res = await service.extrairDeOpenNlp(data);
            this.$emit('set-dados', res);
            this.$emit('trocar-tela', 'ExtractData');
        },

    },

    template: `
<v-container max-width="1200px">

    <h3>Carregar Imagem</h3>

    <v-card class="demo-panel-relative" border>
        <v-card-text>
            <v-file-input label="Selecione uma imagem" @change="onFileChange" accept="image/*"></v-file-input>
            <v-btn absolute color="primary" size="large" icon="mdi-plus" location="top right" @click="recortarImagem"></v-btn>
        </v-card-text>
    </v-card>

    <v-card class="demo-panel-relative" border> <v-card-text>
            <v-row align="center" align-content="center" justify="center" class="gap-6">
                <v-btn size="large" color="pink-darken-1" class="mt-3" @click="extrairDeOpenNlp">Extrair de
                    OpenNLP</v-btn>
                <v-btn size="large" color="secondary" class="mt-3" @click="extrairDeOpenia">Extrair de
                    OpenIA</v-btn>
                <v-btn size="large" color="primary" class="mt-3" @click="extrairDeOcr">Extrair OCR</v-btn>
            </v-row> </v-card-text>
    </v-card>
    <v-img v-if="preview" :src="preview" :key="preview" class="img-preview"></v-img>
</v-container>
  `,

};
