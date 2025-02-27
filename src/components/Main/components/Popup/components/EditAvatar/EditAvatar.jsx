import { useContext, useRef, useState, useEffect } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import FormValidator from "../../../../../../utils/FormValidator";

export default function EditAvatar() {
  const { currentUserInfo, onUpdateAvatar } = useContext(CurrentUserContext);
  const urlInputRef = useRef();

  const [formValidator, setFormValidator] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    link: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);

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

  function handleInputValidation(evt) {
    const inputElement = evt.target;
    formValidator.enableValidation(inputElement);
  }

  function handleButtonSavingState() {
    setButtonStatus(!buttonStatus);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleButtonSavingState();
    onUpdateAvatar({ avatar: urlInputRef.current.value });
    handleButtonSavingState();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      name="avatar"
      noValidate
    >
      <fieldset className="popup__fieldset">
        <label className="popup__form-field">
          <input
            onChange={handleInputValidation}
            ref={urlInputRef}
            type="url"
            className="input input_popup-avatar"
            placeholder="Link de imagem"
            name="link"
            id="link"
            defaultValue={currentUserInfo.avatar}
            required
          />
          <span
            className={`popup__error ${
              errorMsg.link && "popup__error_visible"
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
          {`${!buttonStatus ? "Salvar" : "Salvando..."}`}
        </button>
      </fieldset>
    </form>
  );
}
