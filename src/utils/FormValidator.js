export default class FormValidator {
  constructor({ classObj, handleFormErrorState, handleFormButtonState }) {
    this._classObj = classObj;
    this._formElements = document.querySelectorAll(classObj.formSelector);
    this._formList = Array.from(this._formElements);
    this._handleFormErrorState = handleFormErrorState;
    this._handleFormButtonState = handleFormButtonState;
  }

  _showInputError = (inputName, errorMessage) => {
    const inputValidityInfo = {
      name: inputName,
      errorMessage: errorMessage,
    };
    this._handleFormErrorState(inputValidityInfo);
  };

  _hideInputError = (inputName) => {
    const inputValidityInfo = {
      name: inputName,
      errorMessage: "",
    };
    this._handleFormErrorState(inputValidityInfo);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement.id, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement.id);
    }
  };

  _toggleButtonState = (hasInvalidInput) => {
    this._handleFormButtonState(hasInvalidInput);
  };

  _hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

  _validateForm = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this._classObj.inputSelector)
    );
    const hasInvalidInput = this._hasInvalidInput(inputList);
    this._toggleButtonState(hasInvalidInput);
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
