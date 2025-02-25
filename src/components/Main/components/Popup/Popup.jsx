import { useCallback, useEffect } from "react";

export default function Popup(props) {
  const { title, children } = props;

  useEffect(() => {
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  function handleClickOutside(evt) {
    if (evt.target.className === "popup") {
      props.onClose();
    }
  }

  return (
    <div onClick={handleClickOutside} className="popup">
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
