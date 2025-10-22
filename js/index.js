const { createApp, ref } = Vue;
const { createVuetify } = Vuetify
const components = Vuetify.components
const directives = Vuetify.directives

import { NascimentoService } from "./service/NascimentoService.js"
import UploadVue from './components/UploadVue.js';
import SelectAction from './components/SelectAction.js';
import TextOcr from './components/TextOcr.js';
import ExtractData from './components/ExtractData.js';
import EditImage from './components/EditImage.js';

const $service = new NascimentoService();

const App = {
    setup() {
        const tela = ref('UploadVue');
        const imagem = ref(null);
        const textoOCR = ref('');
        const dadosExtraidos = ref({});

        const trocarTela = (nova) => tela.value = nova;
        const setImagem = (img) => imagem.value = img;
        const setTexto = (txt) => textoOCR.value = txt;
        const setDados = (dados) => dadosExtraidos.value = dados;

        return { tela, imagem, textoOCR, dadosExtraidos, trocarTela, setImagem, setTexto, setDados };
    },

    components: { UploadVue, SelectAction, TextOcr, ExtractData, EditImage },

    el: "#app"
}

const vuetify = createVuetify({ components, directives })
const app = createApp(App)
app.use(vuetify)
app.config.globalProperties.$service = $service
app.mount('#app');

