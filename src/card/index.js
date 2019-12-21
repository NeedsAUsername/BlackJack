import React from 'react'; 
import './style.css';

class Card extends React.Component { 

  render () {
    const card = this.props.card
    return (
      <img src={card.image} alt={card.value}></img>
    )
  }
}

export default Card;
