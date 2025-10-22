class Http {

    async _handleErrors(res) {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }

    async _HttpError(res) {
        const error = await res.text()
        console.log(error);
        
    }

    post(url, dado) {

        return fetch(url, { 
            method: 'POST',
            body: dado
        }).then(res => this._handleErrors(res));
    }
}

export { Http }