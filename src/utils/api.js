 class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authBaseUrl = options.authBaseUrl
        this._authHeaders = options.headers;
        this._cardsHeaders = {Authorization: "90b1a1ac-7ed0-4d39-b23d-5a18dc5240d7",
                              "Content-Type": "application/json"  };
    }

    setToken(token) {
        this._authHeaders.Authorization = `Bearer ${token}` 
     }
 
     _request(endpoint, options = {}) {
        return fetch (`${this._baseUrl}${endpoint}`, {
            headers: this._cardsHeaders,
            ...options
        })
        .then(this._checkResponse)
    }

    _authRequest(endpoint, options = {}) {
        return fetch (`${this._authBaseUrl}${endpoint}`, {
            headers: this._authHeaders,
            ...options
        })
        .then(this._checkResponse)
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
    
    getInitialCards() {
        return this._request('cards');
    }

    getUserInfo() {
        return this._authRequest('users/me');
    }

    editUserInfo(userData) {
        return this._request('users/me', {
            method: "PATCH", 
            headers: {...this._cardsHeaders},
            body: JSON.stringify(userData)
        })
    }

    editUserAvatar(formData) {
        return this._request('users/me/avatar', {
            method:"PATCH", 
            headers: {...this._cardsHeaders}, 

            body: JSON.stringify({
                avatar: formData.avatar
            })
        })
    }

    addNewCard(cardData) {
        return this._request('cards', {
            method: "POST", 
            headers: {
                ...this._cardsHeaders,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cardData)
        })
    }

    deleteCard(cardId) {
        return this._request(`cards/${cardId}`, {
            method: "DELETE", 
            headers: {
                ...this._cardsHeaders
            }
        })
    }

    addLike(cardId) {
        return this._request(`cards/${cardId}/likes`, {
            method: "PUT", 
            headers: {
                ...this._cardsHeaders
            }
        })
    }

    removeLike(cardId) {
        return this._request(`cards/${cardId}/likes`, {
            method: "DELETE", 
            headers: {
                ...this._cardsHeaders
            }
        })
    }
    
    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked) {
            return this.addLike(cardId);
        } else {
            return this.removeLike(cardId);
        }
    }

 
}

//Instanciar la clase para poderla exportar

const api =  new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1/", 
    authBaseUrl: "https://se-register-api.en.tripleten-services.com/v1/",
    headers: {
        Authorization: "",
        "Content-Type": "application/json"
    }
});

//Exportar instancia
export default api;