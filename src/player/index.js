import React from 'react'; 
import './style.css';
import Card from '../card';

class Player extends React.Component { 

  renderHand = () => {
    return this.props.player.hand.map((card, index) => <Card key={index} card={card}/>)
  }
  render () {
    const player = this.props.player
    return (
      <div>
        <h1>Player {player.handTotal} {player.status}</h1>
        <div>{this.renderHand()}</div>
        <div>{this.props.handTotal}</div>
      </div>
    )
  }
}

export default Player;
