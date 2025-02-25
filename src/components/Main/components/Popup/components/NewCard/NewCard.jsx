import { useState } from "react";

export default function NewCard(props) {
  const { onAddPlaceSubmit } = props;
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleUrlChange(evt) {
    setUrl(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({ name: title, link: url });
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
            id="error_title"
            minLength="2"
            maxLength="30"
            value={title}
            required
          />
          <span className="popup__error popup__error_title">
            Preencha este campo.
          </span>
        </label>
        <label className="popup__form-field">
          <input
            onChange={handleUrlChange}
            type="url"
            className="input input_popup-link"
            placeholder="Link de imagem"
            name="link"
            id="error_link"
            value={url}
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
