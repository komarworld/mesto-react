import React from 'react'

function Card({card, onCardClick}) {

  function handleClick() {
   onCardClick(card);
  }

  return (
      <li className="cards__item">
          <button className="cards__item-delete" type="button"></button>
          <img className="cards__item-image" src={card.link} alt={card.name} onClick={handleClick} />
          <div className="cards__item-info">
            <h2 className="cards__item-caption">{card.name}</h2>
            <div className="cards__item-likes">
              <button className="cards__item-like" type="button"></button>
              <p className="cards__item-like-sum">{card.likes.length}</p>
            </div>
          </div>
      </li>
  )
}

export default Card