import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUserInfo: currentUser, onUpdateUser } =
    useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
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
            id="error_name"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
            required
          />
          <span className="popup__error popup__error_name"></span>
        </label>
        <label className="popup__form-field">
          <input
            type="text"
            className="input input_popup-job"
            placeholder="Sobre mim"
            name="job"
            id="error_job"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <span className="popup__error popup__error_job"> </span>
        </label>
        <button type="submit" className="button button_popup-submit">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
