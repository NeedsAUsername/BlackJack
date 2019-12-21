import React from 'react'; 
import './style.css';
import Card from '../card';

class Player extends React.Component { 

  renderHand = () => {
    return this.props.player.hand.map((card, index) => <Card key={index} card={card}/>)
  }
  render () {
    return (
      <div>
        <h1>Player</h1>
        <div>{this.renderHand()}</div>

      </div>
    )
  }
}

export default Player;
