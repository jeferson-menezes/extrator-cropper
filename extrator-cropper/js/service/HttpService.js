import { Http } from './Http.js';

class HttpService {

    constructor() {
        if (this.constructor == HttpService) {
            throw new Error('Essa classe não pode ser instanciada');
        }

        this.server = `http://localhost:8080/nascimento`
        this._http = new Http()
    }


}

export { HttpService }