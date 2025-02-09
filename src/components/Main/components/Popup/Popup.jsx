export default function Popup(props) {
  const { title, children } = props;

  return (
    <div className="popup">
      <div
        className={`popup__container ${!title ? "popup__container_image" : ""}`}
      >
        <button
          type="button"
          aria-label="Close modal"
          className="button button_close"
          onClick={props.onClose}
        ></button>
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
