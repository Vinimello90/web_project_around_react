export default function NewCard(props) {
  return (
    <form className="popup__form" name="add" noValidate>
      <fieldset className="popup__fieldset">
        <label className="popup__form-field">
          <input
            type="text"
            className="input input_popup-title"
            placeholder="Título"
            name="title"
            id="error_title"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__error popup__error_title">
            Preencha este campo.
          </span>
        </label>
        <label className="popup__form-field">
          <input
            type="url"
            className="input input_popup-link"
            placeholder="Link de imagem"
            name="link"
            id="error_link"
            required
          />
          <span className="popup__error popup__error_link">
            Preencha este campo.
          </span>
        </label>
        <button type="submit" className="button button_popup-submit">
          Criar
        </button>
      </fieldset>
    </form>
  );
}
