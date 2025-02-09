export default function EditAvatar() {
  return (
    <form className="popup__form" name="avatar" noValidate>
      <fieldset className="popup__fieldset">
        <label className="popup__form-field">
          <input
            type="url"
            className="input input_popup-avatar"
            placeholder="Link de imagem"
            name="link"
            id="error_avatar"
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
