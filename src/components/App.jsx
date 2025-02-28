import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/Api";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [popup, setPopup] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await api.getUserInfo();
        setCurrentUser(userInfo);
        const initialCards = await api.getInitialCards();
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup("");
  }

  async function handleUpdateUser(userInfo) {
    try {
      const newUserInfo = await api.updateUserInfo(userInfo);
      setCurrentUser(newUserInfo);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateAvatar(newAvatarUrl) {
    try {
      const newUserInfo = await api.updateUserAvatar(newAvatarUrl);
      setCurrentUser(newUserInfo);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(cardInfo) {
    try {
      const newCard = await api.addNewCard(cardInfo);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(id) {
    try {
      await api.deleteCard(id);
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== id)
      );
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardLike(card) {
    try {
      const newCard = await api.editLikeStatus(card.isLiked, card._id);
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === newCard._id ? newCard : currentCard
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserInfo: currentUser,
        onUpdateUser: handleUpdateUser,
        onUpdateAvatar: handleUpdateAvatar,
      }}
    >
      <div className="page">
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          cards={cards}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
