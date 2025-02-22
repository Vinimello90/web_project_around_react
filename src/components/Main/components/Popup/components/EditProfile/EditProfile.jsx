export default function EditProfile(props) {
  const { name, about: job } = props.userInfo;
  return (
    <form className="popup__form" name="profile" noValidate>
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
            defaultValue={name}
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
            defaultValue={job}
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
