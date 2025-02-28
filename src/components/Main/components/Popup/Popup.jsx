import { useEffect, useState } from "react";

export default function Popup(props) {
  const [displayPopup, setDisplayPopup] = useState("");
  const { title, children, onClose } = props;

  useEffect(() => {
    // Muda o estado para adicionar a classe e ativar animação de fade in.
    setDisplayPopup(true);
    // Manipula o ouvinte de eventos "keydown" para fechar a popop na tecla "Escape".
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    // adiciona o event listener ao montar.
    window.addEventListener("keydown", handleEsc);
    return () => {
      // remove o event listener ao desmontar.
      window.removeEventListener("keydown", handleEsc);
    };
    // Estava indicando um aviso de dependência aqui, mas não necessita dele realmente né? já que a função via props só vai desmontar a popup correto??
  }, [onClose]);

  // Manipula o clique no elemento de background da popup para fechar ao clicar fora da popup.
  function handleClickOutside(evt) {
    if (evt.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleClickOutside} // manipulador para fechar ao clicar no elemento.
      className={`popup${displayPopup ? " popup_opened" : ""} `} //
    >
      <div
        className={`popup__container ${!title ? "popup__container_image" : ""}`} // Alterna a classe ao mudar o estado para exibir a popup com fade in.
      >
        <button
          type="button"
          aria-label="Close modal"
          className="button button_close"
          onClick={onClose}
        ></button>
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
