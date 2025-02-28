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

  function handleTitleChange(evt) {
    const inputElement = evt.target;
    setTitle(evt.target.value);
    // Ativa a validação do input passado como parâmetro, e do formulário.
    formValidator.enableValidation(inputElement);
  }

  function handleUrlChange(evt) {
    const inputElement = evt.target;
    setUrl(evt.target.value);
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
    onAddPlaceSubmit({ name: title, link: url }); // Envia os da para atualizar API e o estado dos cards
    handleButtonSavingState();
  }

  return (
    <form onSubmit={handleSubmit} className="popup__form" name="add" noValidate>
      <fieldset className="popup__fieldset">
        <label className="popup__form-field">
          <input
            onChange={handleTitleChange}
            type="text"
            className={`input input_popup-title ${
              errorMsg.title ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
            placeholder="Título"
            name="title"
            id="title"
            minLength="2"
            maxLength="30"
            value={title}
            required
          />
          <span
            className={
              // Alterna a classe para exibir a mensagem de erro com base no estado do nome do input.
              `popup__error${errorMsg.title ? " popup__error_visible" : ""}`
            }
          >
            {errorMsg.title}
          </span>
        </label>
        <label className="popup__form-field">
          <input
            onChange={handleUrlChange}
            type="url"
            className={`input input_popup-link ${
              errorMsg.link ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
            placeholder="Link de imagem"
            name="link"
            id="link"
            value={url}
            required
          />
          <span
            className={
              // Alterna a classe para exibir a mensagem de erro com base no estado do nome do input.
              `popup__error${errorMsg.link ? " popup__error_visible" : ""}`
            }
          >
            {errorMsg.link}
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
            !buttonStatus ? "Criar" : "Salvando..." // Alterna o o texto do botão com base no estado do botão durante o processo de salvamento.
          }
        </button>
      </fieldset>
    </form>
  );
}
