// A classe FormValidator é responsável por válidar o formulário.
export default class FormValidator {
  constructor({ classObj, handleFormErrorState, handleFormButtonState }) {
    // O constructor recebe 2 paramêtros, um objeto com as classes seletoras e uma array com a lista de elementos de formulário.
    this._classObj = classObj;
    this._formElements = document.querySelectorAll(this._classObj.formSelector);
    // O método Array.from() gera um array a partir da lista de elemento de formulário.
    this._formList = Array.from(this._formElements);
    this._handleFormErrorState = handleFormErrorState;
    this._handleFormButtonState = handleFormButtonState;
  }

  // Método público resetInputValidation() é responsável por resetar a válidação do formulário, fazendo uma nova validação inicial do formulário ao fechar a popup, e ocultando
  // a mensagem de erro e verificando se o botão vai estar desativado ou ativado ao reabrir a popup.
  resetInputValidation = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this._classObj.inputSelector)
    );
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(
        `.popup__${inputElement.id}`
      );
      this._hideInputError(inputElement, errorElement, this._classObj);
    });
  };

  // Método privado _hideInputError() é responsável paramanipular e exibir a mensagem de erro caso o input esteja inválido.
  _showInputError = (inputElement, inputName, errorMessage) => {
    const inputValidityInfo = {
      name: inputName,
      errorMessage: errorMessage,
    };
    this._handleFormErrorState(inputValidityInfo);
  };

  // Método privado _hideInputError() é responsável para manipular e esconder a mensagem de erro caso o input esteja válido.
  _hideInputError = (inputElement) => {
    const inputValidityInfo = {
      name: inputElement.id,
      errorMessage: "",
    };
    this._handleFormErrorState(inputValidityInfo);
  };

  // Método privado _checkInputValidity() é responsável por checar se os inputs dos formulários estão validos, caso invalidado exibirá uma mensagem de erro explicativa.
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.id,
        inputElement.validationMessage
      );
    } else {
      // É usado o método privado _hideInputError(), passando 2 argumentos, o elemento do input e o elemento que exibe a mensagem.
      this._hideInputError(inputElement);
    }
  };

  // Método privado _hasInvalidInput() é responsável por checar se os inputs dos formulários estão validos e retornar verdadeiro ou falso.
  _hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

  // Método privado _toggleButtonState() é responsável por ativar e desativar o botão de submit caso o formulário esteja válido ou invalido, recebe 2 parâmetros, o elemento
  // do fieldset do formulário e a array com a lista de elementos de input.
  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this._handleFormButtonState(true);
    } else {
      this._handleFormButtonState(false);
    }
  };

  // Método privado _setEventListeners é responsável por adicionar os ouvintes de evento que validarão os formulários, recebe como parâmetro o elemento fieldset do form.
  _validateForm = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this._classObj.inputSelector)
    );
    this._toggleButtonState(inputList);
  };

  enableValidation = (inputElement) => {
    if (inputElement) {
      this._checkInputValidity(inputElement);
    }
    this._formList.forEach((formElement) => {
      const fieldsetList = Array.from(
        formElement.querySelectorAll(this._classObj.fieldsetSelector)
      );
      fieldsetList.forEach((fieldset) => {
        this._validateForm(fieldset);
      });
    });
  };
}
