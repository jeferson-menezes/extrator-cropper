import { convertFileToImage } from "../helpers/FileHelper.js";
import InnerLoading from "./InnerLoading.js"

export default {
  name: "UploadVue",
  components: { InnerLoading },
  emits: ["trocarTela"],

  template: `
    <v-container class="fill-height d-flex align-center justify-center text-center">
      <v-card
        class="pa-10 d-flex flex-column align-center justify-center cursor-pointer"
        elevation="4"
        width="400"
        height="300"
        outlined
        :class="{ 'drop-active': isDragging }"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        @click="selectFile"
      >
      <inner-loading :active="loading" text="Processando arquivo..." />
        <v-icon size="100" color="green-accent-4" class="mb-4">mdi-image-sync</v-icon>
        

        <input
          ref="fileInput"
          type="file"
          class="d-none"
          accept="image/*,.tif,.tiff,.pdf"
          @change="onFileChange"
        />

        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          size="40"
          class="mt-4"
        />
      </v-card>
    </v-container>
  `,

  data() {
    return {
      isDragging: false,
      loading: false,
    };
  },

  methods: {
    selectFile() {
      this.$refs.fileInput.click();
    },

    async onFileChange(e) {
      const file = e.target.files[0];
      if (file) await this.processFile(file);
    },

    async onDrop(e) {
      this.isDragging = false;
      const file = e.dataTransfer.files[0];
      if (file) await this.processFile(file);
    },

    onDragOver() {
      this.isDragging = true;
    },

    onDragLeave() {
      this.isDragging = false;
    },

    async processFile(file) {
      this.loading = true;
      try {
        const ext = file.name.split(".").pop().toLowerCase();
        const base64 = await convertFileToImage(file, ext);

        // Emite evento para o App
        this.$emit('set-imagem', base64);
        this.$emit("trocarTela", 'SelectAction');
      } catch (err) {
        console.error("Erro ao processar arquivo:", err);
        alert("Falha ao carregar a imagem.");
      } finally {
        this.loading = false;
      }
    },
  },
};
