import { HttpService } from "./HttpService.js";

class NascimentoService extends HttpService {

    extrairDeOCR(dado) {
        return this._http.post(`${this.server}/ocr`, dado)
    }

    extrairDeOpenNlp(dado) {
        return this._http.post(`${this.server}/opennlp`, dado)
    }

    extrairDeOpenIa(dado) {
        return this._http.post(`${this.server}/openai`, dado)
    }
}

export { NascimentoService }