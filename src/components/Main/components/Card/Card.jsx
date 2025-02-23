import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";

export default function Card(props) {
  const { name, link, isLiked, _id: id } = props.card;
  const { handleOpenPopup, handleCardLike, onCardDelete } = props;
  const imagePopup = {
    children: <ImagePopup name={name} link={link} />,
  };

  function handleDeleteClick() {
    onCardDelete(id);
  }

  const removeCard = {
    title: "Tem certeza?",
    children: <RemoveCard cardId={id} />,
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
        onClick={handleDeleteClick}
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
