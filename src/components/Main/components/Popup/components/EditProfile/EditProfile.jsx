import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import FormValidator from "../../../../../../utils/FormValidator";

export default function EditProfile() {
  const { currentUserInfo: currentUser, onUpdateUser } =
    useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const [formValidator, setFormValidator] = useState("");
  const [ErrorMsg, setErrorMsg] = useState({
    name: "",
    job: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  useEffect(() => {
    const formValidator = new FormValidator({
      handleFormErrorState: ({ name, errorMessage }) => {
        setErrorMsg((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      },
      handleFormButtonState: (isDisabled) => {
        setbuttonDisabled(isDisabled);
      },
      classObj: {
        formSelector: ".popup__form",
        fieldsetSelector: ".popup__fieldset",
        inputSelector: ".input",
        submitButtonSelector: ".button_popup-submit",
        inactiveButtonClass: "button_popup-submit_disabled",
        inputErrorClass: "input__popup_type_error",
        errorClass: "popup__error_visible",
      },
    });
    setFormValidator(formValidator);
    formValidator.enableValidation();
  }, []);

  function handleNameChange(evt) {
    const inputElement = evt.target;
    setName(evt.target.value);
    formValidator.enableValidation(inputElement);
  }

  function handleDescriptionChange(evt) {
    const inputElement = evt.target;
    setDescription(evt.target.value);
    formValidator.enableValidation(inputElement);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      name="profile"
      noValidate
    >
      <fieldset className="popup__fieldset">
        <label className="popup__form-field">
          <input
            type="text"
            className="input input_popup-name"
            placeholder="Nome"
            name="name"
            id="name"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
            required
          />
          <span
            className={`popup__error ${
              ErrorMsg.name && "popup__error_visible"
            }`}
          >
            {ErrorMsg.name}
          </span>
        </label>
        <label className="popup__form-field">
          <input
            type="text"
            className="input input_popup-job"
            placeholder="Sobre mim"
            name="job"
            id="job"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <span
            className={`popup__error ${ErrorMsg.job && "popup__error_visible"}`}
          >
            {ErrorMsg.job}
          </span>
        </label>
        <button
          type="submit"
          className="button button_popup-submit"
          disabled={buttonDisabled}
        >
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
