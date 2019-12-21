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
        <h1>Player {this.props.player.handTotal}</h1>
        <div>{this.renderHand()}</div>
        <div>{this.props.handTotal}</div>
      </div>
    )
  }
}

export default Player;
