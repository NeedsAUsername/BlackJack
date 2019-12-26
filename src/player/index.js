import React from 'react'; 
import './style.css';
import Card from '../card';
import {calculateHandTotal} from '../helpers/calculateHandTotal';

class Player extends React.Component { 

  renderHand = () => {
    return this.props.player.hand.map((card, index) => <Card key={index} isSplit={this.props.player.isSplit} card={card}/>)
  }
  renderSplitHand = () => {
    return this.props.player.splitHand.map((card, index) => <Card key={index} isSplit={this.props.player.isSplit} card={card}/>)
  }
  render () {
    const player = this.props.player
    const splitHandTotal = calculateHandTotal(player.splitHand)
    return (
      <div className='player'>
        <h2>Player  
          {player.isSplit ? <br/> : null}
          {player.isSplit && !player.playingSplitHand ? '👉' : null} 
          {player.handTotal > 0 ? ' ' + player.handTotal : null} 
          {player.handTotal > 21 ? ' BUST!' : null}
        </h2>
        <div>{this.renderHand()}</div>
        <h2>{player.playingSplitHand ? '👉' : null} {splitHandTotal > 0 ? splitHandTotal : null} {splitHandTotal > 21 ? 'BUST!': null}</h2>
        <div>{this.renderSplitHand()}</div>
      </div>
    )
  }
}

export default Player;
