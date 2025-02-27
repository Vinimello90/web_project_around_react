import { useState, useEffect } from "react";
import FormValidator from "../../../../../../utils/FormValidator";

export default function NewCard(props) {
  const { onAddPlaceSubmit } = props;
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [formValidator, setFormValidator] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    link: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    const formValidator = new FormValidator({
      classObj: {
        formSelector: ".popup__form",
        fieldsetSelector: ".popup__fieldset",
        inputSelector: ".input",
      },
      handleFormErrorState: ({ name, errorMessage }) => {
        setErrorMsg((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      },
      handleFormButtonState: (isDisabled) => {
        setbuttonDisabled(isDisabled);
      },
    });
    setFormValidator(formValidator);
    formValidator.enableValidation();
  }, []);

  function handleTitleChange(evt) {
    const inputElement = evt.target;
    setTitle(evt.target.value);
    formValidator.enableValidation(inputElement);
  }

  function handleUrlChange(evt) {
    const inputElement = evt.target;
    setUrl(evt.target.value);
    formValidator.enableValidation(inputElement);
  }

  function handleButtonSavingState() {
    setButtonStatus(!buttonStatus);
    setbuttonDisabled(!buttonDisabled);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleButtonSavingState();
    onAddPlaceSubmit({ name: title, link: url });
    handleButtonSavingState();
  }

  return (
    <form onSubmit={handleSubmit} className="popup__form" name="add" noValidate>
      <fieldset className="popup__fieldset">
        <label className="popup__form-field">
          <input
            onChange={handleTitleChange}
            type="text"
            className="input input_popup-title"
            placeholder="Título"
            name="title"
            id="title"
            minLength="2"
            maxLength="30"
            value={title}
            required
          />
          <span
            className={`popup__error${
              errorMsg.title ? " popup__error_visible" : ""
            }`}
          >
            {errorMsg.title}
          </span>
        </label>
        <label className="popup__form-field">
          <input
            onChange={handleUrlChange}
            type="url"
            className="input input_popup-link"
            placeholder="Link de imagem"
            name="link"
            id="link"
            value={url}
            required
          />
          <span
            className={`popup__error${
              errorMsg.link ? " popup__error_visible" : ""
            }`}
          >
            {errorMsg.link}
          </span>
        </label>
        <button
          type="submit"
          className={`button button_popup-submit${
            buttonDisabled && buttonStatus
              ? " button_popup-submit_disabled"
              : ""
          }`}
          disabled={buttonDisabled}
        >
          {`${!buttonStatus ? "Criar" : "Salvando..."}`}
        </button>
      </fieldset>
    </form>
  );
}
