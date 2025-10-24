const { createApp, ref, computed, watch, onMounted } = Vue;
const { createVuetify, useTheme } = Vuetify

const components = Vuetify.components
const directives = Vuetify.directives

import UploadVue from './components/UploadVue.js';
import SelectAction from './components/SelectAction.js';
import TextOcr from './components/TextOcr.js';
import ExtractData from './components/ExtractData.js';
import EditImage from './components/EditImage.js';

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

        const theme = useTheme();

        const darkMode = computed({
            get: () => theme.global.current.value.dark,
            set: (val) => {
                theme.global.name.value = val ? 'dark' : 'light';
            },
        });

        const toggleDarkMode = () => {
            darkMode.value = !darkMode.value;
        };

        watch(darkMode, (val) => {
            localStorage.setItem("darkMode", val ? "1" : "0");
        });

        onMounted(() => {
            if (localStorage.getItem("darkMode") === "1") darkMode.value = true;
        });


        return {
            tela,
            imagem,
            textoOCR,
            dadosExtraidos,
            trocarTela,
            setImagem,
            setTexto,
            setDados,
            darkMode, 
            toggleDarkMode
        };
    },

    components: { UploadVue, SelectAction, TextOcr, ExtractData, EditImage },

    el: "#app"
}

const vuetify = createVuetify({ 
    theme:{
        defaultTheme: 'light'
    },
    components, 
    directives 
});
const app = createApp(App);
app.use(vuetify);

app.mount('#app');

