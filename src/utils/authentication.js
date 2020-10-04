class Authentication {

    constructor(options) {
        this.baseUrl = options.baseUrl;
    }

    signup(email, password) {
        const signupUri = this.baseUrl.concat("/signup");
        const headers = {
            "Content-Type": "application/json"
        };
        const body = JSON.stringify({
            email: email,
            password: password
        });
        return this._sendRequestWithBody(signupUri, headers, body, "POST");
    }

    signin(email, password) {
        const signinUri = this.baseUrl.concat("/signin");
        const headers = {
            "Content-Type": "application/json"
        };
        const body = JSON.stringify({
            email: email,
            password: password
        });
        return this._sendRequestWithBody(signinUri, headers, body, "POST");
    }

    getMyIdentity(token) {
        const identityUri = this.baseUrl.concat("/users/me");
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer ".concat(token)
        };
        return this._getResource(identityUri, headers)
    }

    _getResource(uri, headers) {
        return fetch(uri, {
            headers: headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    _sendRequestWithBody(uri, headers, body, method) {
        return fetch(uri, {
            method: method,
            headers: headers,
            body: body
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }
}

const authentication = new Authentication(
    {baseUrl: "https://register.nomoreparties.co"}
);

export default authentication;
