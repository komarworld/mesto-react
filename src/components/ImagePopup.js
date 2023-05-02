import React from "react";

function ImagePopup ({card,isOpen, onClose}){
    return (

    <div className={`popup popup_${card.name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container-image">
        <button 
            className="popup__close-btn"
            type="button" aria-label="Закрыть"
            onClick= {onClose}
            ></button>
        <img
            className="popup__pic"
            src={card.link}
            alt={card.name}
          />
        <h2 className="popup__pic-caption">{card.name}</h2>
      </div>
    </div>
    )
}

export default ImagePopup;