import { useEffect, useState } from "react";

export default function Popup(props) {
  const [displayPopup, setDisplayPopup] = useState("");
  const { title, children } = props;

  useEffect(() => {
    setDisplayPopup(true);
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
    if (evt.target.classList.contains("popup")) {
      props.onClose();
    }
  }

  return (
    <div
      onClick={handleClickOutside}
      className={`popup${displayPopup && " popup_opened"}`}
    >
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
