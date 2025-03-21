// Classe Api é responsável por manipular os dados enviados e recebidos do perfil e dos cartões pela API
class Api {
  constructor(options) {
    // Constructor recebe o options do fetch como parâmetro
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  // Método público getInitialCards() é responsável por enviar a solicitação das informações dos cartões utilizando e retornando o método fetch com o método de solicitação "GET"
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then(this._checkResponse);
  }

  // Método público addNewCard() é responsável por enviar a solicitação dos dados do novo cartão adicionado utilizando e retornando o método fetch com o método de solicitação "POST"
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  // Método público editLikeStatus() é responsável por enviar a solicitação para alterar o status do like utilizando e retornando o método fetch com os métodos de solicitações "PUT"
  // para adicionar "true" e "DELETE" para remover mudando para "false".
  editLikeStatus(isLiked, id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: !isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    }).then(this._checkResponse);
  }

  // Método público deleteCard() é responsável por enviar a solicitação para remover o card através do id do cartão utilizando e retornando o método fetch com o método de solicitação "DELETE".
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    }).then(this._checkResponse);
  }

  // Método público getUserInfo() é responsável por enviar a solicitação das informações do perfil do usuário utilizando e retornando o método fetch com o método de solicitação "GET"
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then(this._checkResponse);
  }

  // Método público editUserAvatar() é responsável  por enviar a solicitação da alteração do link da imagem do avatar do perfil do usuário utilizando e retornando o método fetch com o método
  // de solicitação "PATCH"
  updateUserAvatar(user) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(user),
    }).then(this._checkResponse);
  }

  // Método público editUserInfo() é responsável  por enviar a solicitação da alteração das informações do perfil do usuário utilizando e retornando o método fetch com o método de solicitação "PATCH"
  updateUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3104c43f-5c52-4781-879f-672ac8ed2b72",
    "Content-Type": "application/json",
  },
});
