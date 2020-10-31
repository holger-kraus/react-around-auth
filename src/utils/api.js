class Api {

    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getProfile(token) {
        this.headers["Authorization"] = "Bearer ".concat(token);
        const profileUri = this.baseUrl.concat("/users/me");
        return this._getResource(profileUri);
    }

    updateProfile(name, about, token) {
        this.headers["Authorization"] = "Bearer ".concat(token);
        const profileUri = this.baseUrl.concat("/users/me");
        const body = JSON.stringify({
            name: name,
            about: about
        });
        return this._sendRequestWithBody(profileUri, body, "PATCH");
    }

    updateProfilePicture(avatarLink, token) {
        this.headers["Authorization"] = "Bearer ".concat(token);
        const profileUri = this.baseUrl.concat("/users/me/avatar");
        const body = JSON.stringify({
            avatar: avatarLink
        });
        return this._sendRequestWithBody(profileUri, body, "PATCH");
    }

    getInitialCards(token) {
        this.headers["Authorization"] = "Bearer ".concat(token);
        const cardsUri = this.baseUrl.concat("/cards");
        return this._getResource(cardsUri);
    }

    addCard(name, link, token) {
        this.headers["Authorization"] = "Bearer ".concat(token);
        const cardsUri = this.baseUrl.concat("/cards");
        const body = JSON.stringify( {
            name: name,
            link: link
        });
        return this._sendRequestWithBody(cardsUri, body, "POST");
    }

    changeLikeCardStatus(cardId, isLiked, token) {
        this.headers["Authorization"] = "Bearer ".concat(token);
        return isLiked ? this._addLike(cardId) : this._deleteLike(cardId);
    }

    deleteCard(cardId, token) {
        this.headers["Authorization"] = "Bearer ".concat(token);
        const cardUri = this.baseUrl.concat("/cards/").concat(cardId);
        return this._sendRequestWithoutBody(cardUri, "DELETE");
    }

    _addLike(cardId) {
        const likeUri = this.baseUrl.concat("/cards/").concat(cardId).concat("/likes");
        return this._sendRequestWithoutBody(likeUri, "PUT");
    }

    _deleteLike(cardId) {
        const likeUri = this.baseUrl.concat("/cards/").concat(cardId).concat("/likes");
        return this._sendRequestWithoutBody(likeUri, "DELETE");
    }

    _getResource(uri) {
        return fetch(uri, {
            headers: this.headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).then((json) => {
            if (json && json.data) {
                return json.data;
            }
        });
    }

    _sendRequestWithoutBody(uri, method) {
        return fetch(uri, {
            method: method,
            headers: this.headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).then((json) => {
            if (json && json.data) {
                return json.data;
            }
        });
    }

    _sendRequestWithBody(uri, body, method) {
        return fetch(uri, {
            method: method,
            headers: this.headers,
            body: body
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).then((json) => {
            if (json && json.data) {
                return json.data;
            }
        });
    }
}

const api = new Api({
     baseUrl: "https://api.holger.students.nomoreparties.site",
       // baseUrl: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
        "Authorization": ""
    }
});

export default api;

