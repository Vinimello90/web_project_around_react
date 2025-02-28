import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import FormValidator from "../../../../../../utils/FormValidator";

export default function EditProfile() {
  const { currentUserInfo: currentUser, onUpdateUser } =
    useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const [formValidator, setFormValidator] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    job: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    // Instancia a classe FormValidator somente uma vez no useEfect() ao montar o componente.
    const formValidator = new FormValidator({
      classObj: {
        formSelector: ".popup__form",
        fieldsetSelector: ".popup__fieldset",
        inputSelector: ".input",
      },
      // Atualiza o estado da mensagem de erro de forma dinamica de acordo com o nome do input.
      handleFormErrorState: ({ name, errorMessage }) => {
        setErrorMsg((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      },
      // Atualiza o estado do botão habiltando/desabilitando de acordo com a validação do formulário.
      handleFormButtonState: (isDisabled) => {
        setbuttonDisabled(isDisabled);
      },
    });
    // Armazena a instancia no estado para chamar os métodos nos manipuladores do onChange().
    setFormValidator(formValidator);
    // Ativa a validação do formulário somente uma vez no useEfect() ao montar o componente.
    formValidator.enableValidation();
  }, []);

  function handleNameChange(evt) {
    const inputElement = evt.target;
    setName(evt.target.value);
    // Ativa a validação do input passado como parâmetro, e do formulário.
    formValidator.enableValidation(inputElement);
  }

  function handleDescriptionChange(evt) {
    const inputElement = evt.target;
    setDescription(evt.target.value);
    formValidator.enableValidation(inputElement);
  }

  // Alterna o estado do botão de submit para indicar o processo de salvamento,
  // bloqueando e alterando o texto de acordo com o estado verdadeiro e falso.
  function handleButtonSavingState() {
    setButtonStatus(!buttonStatus);
    setbuttonDisabled(!buttonDisabled);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Manipula os estados do botão para indicar que o processo de salvamento esta em andamento.
    handleButtonSavingState();
    onUpdateUser({ name, about: description });
    handleButtonSavingState();
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
            className={`input input_popup-name ${
              errorMsg.name ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
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
            className={
              // Alterna a classe para exibir a mensagem de erro com base no estado do nome do input.
              `popup__error${errorMsg.name ? " popup__error_visible" : ""}`
            }
          >
            {errorMsg.name}
          </span>
        </label>
        <label className="popup__form-field">
          <input
            type="text"
            className={`input input_popup-job ${
              errorMsg.job ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
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
            className={
              // Alterna a classe para exibir a mensagem de erro com base no estado do nome do input.
              `popup__error${errorMsg.job ? " popup__error_visible" : ""}`
            }
          >
            {errorMsg.job}
          </span>
        </label>
        <button
          type="submit"
          className={
            // Alterna a classe para manter o estilo do botão de submit durante o processo de salvamento com base nos estados do botão.
            `button button_popup-submit${
              buttonDisabled && buttonStatus
                ? " button_popup-submit_disabled"
                : ""
            }`
          }
          disabled={buttonDisabled} // Desativa/Habilida o botão de submit com base no estado do botão.
        >
          {
            !buttonStatus ? "Salvar" : "Salvando..." // Alterna o o texto do botão com base no estado do botão durante o processo de salvamento.
          }
        </button>
      </fieldset>
    </form>
  );
}
