import React from 'react'

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
      <li className="cards__item">
          <button className="cards__item-delete" type="button"></button>
          <img className="cards__item-image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
          <div className="cards__item-info">
            <h2 className="cards__item-caption">{props.card.name}</h2>
            <div className="cards__item-likes">
              <button className="cards__item-like" type="button"></button>
              <p className="cards__item-like-sum">{props.card.likes.length}</p>
            </div>
          </div>
      </li>
  )
}

export default Card