import React from "react";

function ImagePopup (props){
    return (

    <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container-image">
        <button 
            className="popup__close-btn"
            type="button" aria-label="Закрыть"
            onClick= {props.onClose}
            ></button>
        <img
            className="popup__pic"
            src={props.card.link}
            alt={props.card.name}
          />
        <h2 className="popup__pic-caption">{props.card.name}</h2>
      </div>
    </div>
    )
}

export default ImagePopup;