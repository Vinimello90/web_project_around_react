import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup, handleCardLike } = props;
  const imagePopup = {
    children: <ImagePopup name={name} link={link} />,
  };
  return (
    <li className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={() => handleOpenPopup(imagePopup)}
      />
      <button
        type="button"
        aria-label="Delete card"
        className="button button_remove"
      ></button>
      <div className="card__title-container">
        <h2 className="card__title">{name}</h2>
        <button
          type="button"
          aria-label="Like card"
          className={`button button_like ${
            isLiked ? "button_like_activate" : ""
          }`}
          onClick={() => handleCardLike(props.card)}
        ></button>
      </div>
    </li>
  );
}
