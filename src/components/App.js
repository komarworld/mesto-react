import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import { useState } from "react";
import ImagePopup from './ImagePopup'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    
  }
  function handleCardClick (card) {
    setSelectedCard(card);
   
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null)
  };

  return (
      <div className="body">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick = {handleCardClick}

        />
        <Footer />

        <PopupWithForm
          name="profile"
          title="Редактировать&nbsp;профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <input 
              id="form-name"
              className="popup__input popup__input_name"
              type="text"
              placeholder="Имя"
              name="name"
              minLength="2"
              maxLength="40"
              required/>
            <span className="popup__input-error form-name-error" ></span>
          <input 
              id="form-job"
              className="popup__input popup__input_job"
              type="text"
              placeholder="Род деятельности"
              name="about" 
              minLength="2"
              maxLength="40"
              required/>
            <span className="popup__input-error form-job-error" ></span> 
        </PopupWithForm>

        <PopupWithForm
          name="card"
          title="Новое&nbsp;место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <input
              id="form-title"
              className="popup__input popup__input_title"
              type="text" placeholder="Название"
              name="form-title"
              minLength="2"
              maxLength="30"
              required/>
            <span className="popup__input-error form-title-error" ></span>
          <input
              id= "form-link"
              className="popup__input popup__input_link"
              type="url"
              placeholder="Ссылка на картинку"
              name="form-link"
              required/>
            <span className="popup__input-error form-link-error" ></span>
        </PopupWithForm>
      
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
        >
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <input
              id= "form-ava"
              className="popup__input popup__input_ava"
              type="url"
              placeholder="Ссылка на аватар"
              name="avatar"
              required/>
            <span className="popup__input-error form-ava-error" ></span>
        </PopupWithForm>

        <ImagePopup 
          name="image"
          onClose={closeAllPopups}
          card = {selectedCard}
         
        />

      </div>
  );
}

export default App;
