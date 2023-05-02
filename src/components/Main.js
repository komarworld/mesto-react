import React from 'react';
import api from '../utils/Api'
import Card from './Card'


function Main ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
const [userName, setUserName] = React.useState('')
const [userDescription, setUserDescription] = React.useState('')
const [userAvatar, setUserAvatar]= React.useState('')
const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    api.getUserInfo()
        .then((UserData) => {
          setUserName(UserData.name)
          setUserDescription(UserData.about)
          setUserAvatar(UserData.avatar)
        })
        .catch ((err)=> 
          console.log(err.message))
        },[])

  React.useEffect(() =>{
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch ((err)=> 
          console.log(err.message))
        },[])
   
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrap" onClick={onEditAvatar}>
              <img className="profile__avatar" src={userAvatar} alt="Аватарка" />
        </div>
        <div className="profile__info">
          <div className="profile__info-container">
            <h1 className="profile__info-title">{userName}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__info-subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="cards" aria-label="Секция с картинками">
        <ul className="cards__list">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} />
        ))}
        </ul>
      </section>
    </main> 
  )
}

export default Main 