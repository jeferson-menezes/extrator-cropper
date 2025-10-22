export default {
    props: ['imagem'],
    emits: ['trocarTela', 'setTexto', 'setDados'],
    template: `
  <v-container>
    <h3>Selecione uma ação</h3>
    <v-img :src="imagem" class="img-preview mb-4"></v-img>

    <v-btn color="primary" @click="extrairOCR">Extrair Texto OCR</v-btn>
    <v-btn color="success" class="ml-2" @click="extrairOpenIA">Extrair Dados OpenIA</v-btn>
    <v-btn color="secondary" class="ml-2" @click="$emit('trocarTela', 'editar')">Recortar Imagem</v-btn>

    <v-btn variant="text" class="mt-4" @click="$emit('trocarTela', 'upload')">Voltar</v-btn>
  </v-container>
  `,
    methods: {
        async extrairOCR() {
            // Simula chamada API OCR
            const texto = 'Texto OCR extraído de exemplo...';
            this.$emit('setTexto', texto);
            this.$emit('trocarTela', 'ocr');
        },
        async extrairOpenIA() {
            const dados = {
                nome: 'João Silva',
                data: '21/10/2025',
                documento: '12345'
            };
            this.$emit('setDados', dados);
            this.$emit('trocarTela', 'dados');
        }
    }
};
