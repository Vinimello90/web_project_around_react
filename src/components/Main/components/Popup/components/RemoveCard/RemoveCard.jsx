export default function RemoveCard(props) {
  const { onCardDelete, cardId } = props;

  function handleDeleteClick() {
    onCardDelete(cardId);
  }

  return (
    <>
      <button
        onClick={handleDeleteClick}
        type="button"
        className="button button_popup-submit button_popup_confirmation"
      >
        Sim
      </button>
    </>
  );
}
