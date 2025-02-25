import { useEffect, useState, useContext } from "react";
import { api } from "../../utils/Api";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main(props) {
  const { currentUserInfo, handleUpdateUser } = useContext(CurrentUserContext);
  const {
    onOpenPopup,
    onClosePopup,
    popup,
    onAddPlaceSubmit,
    onCardLike,
    onCardDelete,
    cards,
  } = props;

  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile userInfo={currentUserInfo} />,
  };
  const newCardPopup = {
    title: "Novo local",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  function handleOpenPopupClick(popup) {
    onOpenPopup(popup);
  }

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
            onClick={() => handleOpenPopupClick(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-button-container">
            <h1 className="profile__name">{currentUserInfo.name}</h1>
            <button
              type="button"
              aria-label="Edit profile"
              className="button button_edit"
              onClick={() => handleOpenPopupClick(editProfilePopup)}
            ></button>
          </div>
          <p className="profile__job">{currentUserInfo.about}</p>
        </div>
        <button
          type="button"
          aria-label="Add card"
          className="button button_add"
          onClick={() => handleOpenPopupClick(newCardPopup)}
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopupClick={handleOpenPopupClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
