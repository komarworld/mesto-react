
function PopupWithForm (props)  {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
          <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
          <h2 className="popup__heading">{props.title}</h2>
          <form className={`popup__form popup__form_type_${props.name}`} name ={`form-${props.name}`} noValidate>
              {props.children}
              <button className="button popup__submit-btn" type="submit">{props.buttonText}</button>
          </form>
      </div>
    </div>
)
} <div className="popup popup_image">
          <div className="popup__container-image">
            <button className="popup__close-btn" type="button" aria-label="Закрыть"></button>
            <img src="#" alt="#" className="popup__pic"/>
            <h2 className="popup__pic-caption"></h2>
          </div>
        </div>
export default PopupWithForm 