export default {
  props: ['imagem'],
  emits: ['trocarTela', 'setImagem'],
  template: `
<v-container>
    <v-row justify="justify-end" class="my-4">
        <v-btn color="red-lighten-1" prepend-icon="mdi-arrow-left" @click="$emit('trocarTela', 'SelectAction')">
            Voltar
        </v-btn>
    </v-row>

    <v-card border class="relative pb-2">
        <v-toolbar color="primary" title="Recortar Imagem"></v-toolbar>
        <v-card-text class="text-center">
            <div ref="cropContainer"
                style="width:100%; height:75vh; max-height:75vh; overflow:hidden; border:1px solid #ccc; display:flex; align-items:center; justify-content:center;">
                <img ref="img" :src="imagem" alt="crop" style="max-width:100%; max-height:100%; object-fit:contain;" />
            </div>

            <v-row class="mt-1" justify="center" align="center">
                <v-col cols="8" md="6">
                    <v-slider v-model="zoomLevel" append-icon="mdi-magnify-plus-outline"
                        prepend-icon="mdi-magnify-minus-outline" min="0.1" max="3" step="0.05"
                        @update:model-value="atualizarZoom"></v-slider>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-row justify="center" align="center">
                <v-btn prepend-icon="mdi-magnify-expand" color="primary" size="large" @click="visualizarCorte"
                    variant="tonal">Visualizar Corte</v-btn>
            </v-row>
        </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" width="1000" height="95vh">
        <v-card class="pb-2">
            <v-toolbar color="primary" dark>
                <v-toolbar-title>Pré-visualização do Corte</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-toolbar>
            <v-card-text class="text-center">
                <v-img :src="preview" max-height="500" contain class="mx-auto my-4"></v-img>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn prepend-icon="mdi-scissors-cutting" color="success" size="large" @click="aplicarCorte">Aplicar Corte</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</v-container>
  `,
  data() {
    return {
      cropper: null,
      preview: null,
      dialog: false,
      zoomLevel: 1,
      initialZoom: 1
    };
  },
  mounted() {
    this.$nextTick(() => {
      const img = this.$refs.img;
      const container = this.$refs.cropContainer;

      img.addEventListener('load', () => {
        this.cropper = new Cropper(img, {
          aspectRatio: NaN,
          viewMode: 0,
          responsive: true,
          background: false,
          autoCropArea: 0.9,
          zoomable: true,
          movable: true,
          scalable: true,
          dragMode: 'move',
          ready: () => {
            this.$nextTick(() => this.ajustarZoomInicial(container, img));
          }
        });
      });
    });
  },
  methods: {

    ajustarZoomInicial(container, img) {

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;

      // calcula a proporção mínima para caber a imagem inteira
      const scaleX = containerWidth / imageWidth;
      const scaleY = containerHeight / imageHeight;
      const scale = Math.min(scaleX, scaleY);

      // aplica o zoom inicial ajustar à tela (fit-to-screen)
      this.cropper.zoomTo(scale);
      this.zoomLevel = scale;
      this.initialZoom = scale;
    },

    atualizarZoom() {
      if (this.cropper) {
        this.cropper.zoomTo(this.zoomLevel);
      }
    },

    visualizarCorte() {
      const canvas = this.cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      });
      this.preview = canvas.toDataURL('image/png');
      this.dialog = true;
    },

    aplicarCorte() {
      this.$emit('set-imagem', this.preview);
      this.dialog = false;
      this.$emit('trocarTela', 'SelectAction');
    }
  }
};
