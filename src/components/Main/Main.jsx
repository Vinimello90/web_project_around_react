import { useEffect, useState, useContext } from "react";
import { api } from "../../utils/Api";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main() {
  const [popup, setPopup] = useState("");
  const [cards, setCards] = useState([]);
  const currentUserInfo = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards().then((cards) => {
      console.log(cards[0].isLiked);
      return setCards(cards);
    });
  }, []);

  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile userInfo={currentUserInfo} />,
  };
  const newCardPopup = { title: "Novo local", children: <NewCard /> };

  function handleOpenPopup(popup2) {
    setPopup(popup2);
  }

  function handleClosePopup() {
    setPopup("");
  }

  function handleCardLike(card) {}

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUserInfo.avatar}
            alt="avatar"
            className="profile__avatar"
          />
          <button
            type="button"
            aria-label="Edit avatar"
            className="profile__avatar-button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-button-container">
            <h1 className="profile__name">{currentUserInfo.name}</h1>
            <button
              type="button"
              aria-label="Edit profile"
              className="button button_edit"
              onClick={() => handleOpenPopup(editProfilePopup)}
            ></button>
          </div>
          <p className="profile__job">{currentUserInfo.about}</p>
        </div>
        <button
          type="button"
          aria-label="Add card"
          className="button button_add"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
