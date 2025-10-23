# 🧠 Certidão OCR App

Aplicação web desenvolvida em **Vue 3 + Vuetify** (via CDN), com integração para **OCR**, **OpenNLP** e **OpenAI**, permitindo:
- upload de imagens, PDFs ou arquivos TIFF;
- recorte da imagem antes do processamento;
- extração de texto via OCR;
- extração de dados estruturados via IA;
- exibição e edição dos resultados.

> Projeto totalmente client-side (sem build), rodando apenas com HTML + JS.

---

## 🚀 Funcionalidades

| Funcionalidade | Descrição |
|----------------|------------|
| 📤 **Upload de imagem** | Permite enviar imagem (JPG, PNG, TIFF ou PDF) via clique ou arraste. |
| 🧩 **Conversão automática** | TIFF e PDF são convertidos automaticamente para imagem com `pdf.js` e `UTIF.js`. |
| ✂️ **Recorte de imagem** | Interface de corte com zoom e preview via **Cropper.js**. |
| 🔠 **Extração de texto (OCR)** | Chamada de API para converter imagem em texto. |
| 🧬 **Extração de dados (IA / NLP)** | Processa o texto e exibe campos extraídos. |
| 💬 **Interface moderna com Vuetify** | Design responsivo e elegante via Vuetify CDN. |
| 🔄 **Inner Loading** | Indicador visual estilo *QInnerLoading (Quasar)* para operações assíncronas. |

---

## 🧱 Estrutura do Projeto

📁 extrator-cropper/
│
├── index.html # Arquivo principal (Vue + Vuetify via CDN)
│
├── 📁 components/
│ ├── UploadVue.js # Tela inicial (upload + drag & drop)
│ ├── SelectAction.js # Tela de ações (extrair, editar, etc.)
│ ├── TextOcr.js # Tela de texto OCR extraído
│ ├── ExtractData.js # Tela de dados extraídos
│ ├── EditImage.js # Tela de recorte com Cropper.js
│ └── InnerLoading.js # Componente reutilizável de loading
│
├── 📁 helpers/
│ └── fileHelper.js # Conversões de arquivo (TIFF/PDF → imagem e Base64 ↔ File)
│
├── 📁 service/
│ └── NascimentoService.js # Comunicação com APIs OCR / OpenNLP / OpenAI
│
└── 📄 README.md # Este arquivo
---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Uso |
|-------------|-----|
| [Vue 3 (CDN)](https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js) | Framework reativo principal |
| [Vuetify 3 (CDN)](https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.js) | Interface de usuário (UI Components) |
| [Cropper.js](https://cdnjs.com/libraries/cropperjs) | Ferramenta de recorte de imagem |
| [pdf.js](https://mozilla.github.io/pdf.js/) | Conversão de PDFs em canvas |
| [UTIF.js](https://www.npmjs.com/package/utif) | Conversão de imagens TIFF |
| [Material Design Icons](https://cdn.jsdelivr.net/npm/@mdi/font@7.x/css/materialdesignicons.min.css) | Ícones visuais |

---

## 💡 Funcionamento

1. O usuário faz upload de uma imagem (ou PDF/TIFF).  
   → O arquivo é convertido para imagem Base64 no helper `fileHelper.js`.

2. O componente `UploadVue` emite a imagem para `SelectAction`.  
   → Nessa tela, o usuário escolhe entre as ações:
   - Extrair texto via OCR;
   - Extrair dados via OpenAI;
   - Extrair dados via OpenNLP;
   - Editar (recortar) imagem.

3. Em `EditImage`, o usuário recorta a imagem com zoom e preview.  
   → O resultado volta automaticamente ao `UploadVue` para reaproveitar.

4. Os dados e texto extraídos são exibidos em `TextOcr` e `ExtractData`.

---

## 🖥️ Como Executar

> Nenhum build ou instalação necessária!

1. Baixe ou clone este repositório:
   ```bash
   git clone https://github.com/jeferson-menezes/extrator-cropper.git