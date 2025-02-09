import { useState } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";

const cards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);

  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile name="Jacques Cousteau" job="Explorador" />,
  };
  const newCardPopup = { title: "Novo local", children: <NewCard /> };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src="https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg"
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
            <h1 className="profile__name">Jacques Cousteau</h1>
            <button
              type="button"
              aria-label="Edit profile"
              className="button button_edit"
              onClick={() => handleOpenPopup(editProfilePopup)}
            ></button>
          </div>
          <p className="profile__job">Explorador</p>
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
