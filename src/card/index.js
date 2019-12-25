import React from 'react'; 
import './style.css';

class Card extends React.Component { 

  style = {
    width: '150px',
    height: 'auto',
  }

  splitStyle = {
    width: '100px',
    height: 'auto'
  }
  render () {
    const card = this.props.card
    return (
      <img className='card' style={this.props.isSplit ? this.splitStyle : this.style} src={card.image} alt={card.value}></img>
    )
  }
}

export default Card;
