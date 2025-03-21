import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar(props) {
  const {
    formValidator,
    errorMsg,
    buttonDisabled,
    buttonStatus,
    onButtonSavingState,
  } = props;
  const { currentUserInfo, onUpdateAvatar } = useContext(CurrentUserContext);
  const urlInputRef = useRef();

  function handleInputValidation(evt) {
    const inputElement = evt.target;
    // Ativa a validação do input passado como parâmetro, e do formulário.
    formValidator.enableValidation(inputElement);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Chama a função que altera o estado para alterar o botão de submit, desativando e indicando processo de solicitação da API
    onButtonSavingState();
    onUpdateAvatar({ avatar: urlInputRef.current.value });
    onButtonSavingState(); // habilita e volta o texto padrão do botão
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
            className={`input input_popup-avatar ${
              errorMsg.link ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
            placeholder="Link de imagem"
            name="link"
            id="link"
            defaultValue={currentUserInfo.avatar}
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
            !buttonStatus ? "Salvar" : "Salvando..." // Alterna o o texto do botão com base no estado do botão durante o processo de salvamento.
          }
        </button>
      </fieldset>
    </form>
  );
}
