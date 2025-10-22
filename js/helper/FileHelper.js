// helpers/FileHelper.js
// Lida com conversão de PDF, TIF e Base64 para uso nos componentes Vue

export const FileHelper = {
    async fileToDataUrl(file) {
        const type = file.type || file.name.split('.').pop().toLowerCase();

        if (type.includes('pdf') || type === 'pdf') {
            return await this.pdfToDataUrl(file);
        } else if (type.includes('tif') || type.includes('tiff')) {
            return await this.tifToDataUrl(file);
        } else {
            return await this.imageToDataUrl(file);
        }
    },

    imageToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async tifToDataUrl(file) {
        const buffer = await file.arrayBuffer();
        const tiff = new Tiff({ buffer });
        const canvas = tiff.toCanvas();
        return canvas.toDataURL('image/png');
    },

    async pdfToDataUrl(file) {
        const pdfData = new Uint8Array(await file.arrayBuffer());
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: ctx, viewport }).promise;
        return canvas.toDataURL("image/png");
    },

    dataUrlToFile(dataUrl, fileName = 'imagem.png') {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    }
};
