import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { useState, useEffect } from "react";
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import api from '../utils/Api'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
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
  function handleDeleteCardClick(card) {
    setSelectedDeleteCard(card)
  }
 
  useEffect(()=> {
    api.getUserInfo()
        .then((UserData) => {
          setCurrentUser(UserData)
        })
        .catch ((err)=> 
          console.log(err.message))
        },[])

  useEffect(() =>{
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch ((err)=> 
          console.log(err.message))
        },[])


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSelectedDeleteCard(null)
  }
    
   
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err));
  } 

  function handleCardDeleteConfirm() {
    setIsLoading(true)
    api
      .deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== selectedDeleteCard._id));
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        setIsLoading(false)
      })
    }

    function handleUpdateUser(data){
      setIsLoading(true)
      api.editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() =>{
        setIsLoading(false)
      })
    }

    function handleUpdateAvatar(data) {
      setIsLoading(true)
      api.editProfileAvatar(data)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups()
        })
        .catch(err => {
          console.log(err.message)
        })
        .finally(() =>{
          setIsLoading(false)
        })
    }

    function handleAddPlaceSubmit(data) {
      setIsLoading(true)
      api
        .addNewCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch(err => {
          console.log(err.message)
        })
        .finally(() =>{
          setIsLoading(false)
        })
    }

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
          <Header />
          <Main 
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick = {handleCardClick}
            onCardLike= {handleCardLike}
            onCardDelete ={handleDeleteCardClick}
            cards={cards}
          />

          <Footer />

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
          /> 

          <AddPlacePopup
            isOpen= {isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
          />
        
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
          />

          <DeleteCardPopup
            onDeleteCard ={handleCardDeleteConfirm}
            isOpen= {selectedDeleteCard}
            onClose={closeAllPopups}
            buttonText = {isLoading ? 'Удаление...' : 'Да'}
          />

          <ImagePopup 
            name="image"
            onClose={closeAllPopups}
            card = {selectedCard}
          />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
