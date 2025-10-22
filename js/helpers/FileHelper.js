// helpers/fileHelper.js

/**
 * Converte TIFF, PDF, PNG, JPG em imagem base64
 * usado no UploadVue
 */
export async function convertFileToImage(file, ext) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
            const base64 = e.target.result;
            ext = ext?.toLowerCase();

            try {
                // ===== TIFF =====
                if (ext === "tif" || ext === "tiff") {
                    await ensureUTIFLoaded();

                    const buffer = new Uint8Array(await file.arrayBuffer());
                    const ifds = window.UTIF.decode(buffer);
                    window.UTIF.decodeImage(buffer, ifds[0]);
                    const rgba = window.UTIF.toRGBA8(ifds[0]);

                    const canvas = document.createElement("canvas");
                    canvas.width = ifds[0].width;
                    canvas.height = ifds[0].height;
                    const ctx = canvas.getContext("2d");
                    const imgData = ctx.createImageData(canvas.width, canvas.height);
                    imgData.data.set(rgba);
                    ctx.putImageData(imgData, 0, 0);

                    return resolve(canvas.toDataURL("image/png"));
                }

                // ===== PDF =====
                if (ext === "pdf") {
                    await ensurePdfJsLoaded();

                    const pdf = await window.pdfjsLib.getDocument({ data: base64 }).promise;
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    await page.render({ canvasContext: ctx, viewport }).promise;

                    return resolve(canvas.toDataURL("image/png"));
                }

                // ===== IMAGEM COMUM =====
                resolve(base64);

            } catch (err) {
                console.error("Erro ao converter arquivo:", err);
                reject(err);
            }
        };

        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
}

/**
 * Garante que UTIF foi carregado globalmente (lazy load + cache)
 */
async function ensureUTIFLoaded() {
    if (window.UTIF) return;

    try {
        console.log("🔄 Carregando UTIF.js...");
        // Tenta carregar do jsDelivr
        await import("https://cdn.jsdelivr.net/npm/utif@3.1.0/UTIF.js");
        if (window.UTIF) {
            console.log("✅ UTIF.js carregado com sucesso.");
            return;
        }
    } catch (e1) {
        console.warn("⚠️ Falha ao carregar UTIF via jsDelivr, tentando unpkg...");
        // Fallback para unpkg
        await import("https://unpkg.com/utif@3.1.0/UTIF.js");
    }

    if (!window.UTIF) throw new Error("UTIF.js não pôde ser carregado!");
}

/**
 * Garante que PDF.js foi carregado globalmente (lazy load + cache)
 */
async function ensurePdfJsLoaded() {
    if (window.pdfjsLib) return;

    console.log("🔄 Carregando PDF.js...");
    const module = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.mjs");
    window.pdfjsLib = module;
    console.log("✅ PDF.js carregado com sucesso.");
}

/**
 * Converte base64 em File (usado no SelectAction)
 */
export function base64ToFile(base64, filename) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
}
