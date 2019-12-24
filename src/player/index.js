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
        <h1>${player.cash} Player {player.handTotal > 0 ? player.handTotal : null} {player.status === 'bust' ? 'BUST!' : null}</h1>
        <div>{this.renderHand()}</div>
      </div>
    )
  }
}

export default Player;
