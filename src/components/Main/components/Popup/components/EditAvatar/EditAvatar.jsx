import { useContext, useRef, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { currentUserInfo, onUpdateAvatar } = useContext(CurrentUserContext);
  const urlInputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: urlInputRef.current.value });
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
            ref={urlInputRef}
            type="url"
            className="input input_popup-avatar"
            placeholder="Link de imagem"
            name="link"
            id="error_avatar"
            defaultValue={currentUserInfo.avatar}
            required
          />
          <span className="popup__error popup__error_avatar"> </span>
        </label>
        <button type="submit" className="button button_popup-submit">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
