import { useState } from "react";

export default function RemoveCard(props) {
  const { onCardDelete, cardId } = props;
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  function handleButtonDeletingState() {
    setButtonStatus(!buttonStatus);
    setbuttonDisabled(!buttonDisabled);
  }

  function handleDeleteClick() {
    handleButtonDeletingState();
    onCardDelete(cardId);
    handleButtonDeletingState();
  }

  return (
    <>
      <button
        onClick={handleDeleteClick}
        type="button"
        className={`button button_popup-submit${
          buttonDisabled ? " button_popup-submit_disabled" : ""
        }`}
        disabled={buttonDisabled}
      >
        {!buttonStatus ? "Sim" : "Removendo..."}
      </button>
    </>
  );
}
