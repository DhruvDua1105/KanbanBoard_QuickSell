import React from 'react';
import './Card.css'

const Card = ({ card }) => {
  const { id, title } = card;

  return (
    <div className='card'>
      <h5>{id}</h5>
      <h4>{title}</h4>
      <h5>{card.user.name}</h5>
      <small>{card.tag.join(",")}</small>
    </div>
  );
};

export default Card;
