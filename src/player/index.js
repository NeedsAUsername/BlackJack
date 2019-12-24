import React from 'react'; 
import './style.css';
import Card from '../card';

class Player extends React.Component { 

  renderHand = () => {
    return this.props.player.hand.map((card, index) => <Card key={index} card={card}/>)
  }
  changeBet = (e) => {
    e.preventDefault()
    this.props.changeBet(e.target.value)
  }
  renderBetForm = () => (
      <form>
        <label htmlFor='bet'>Bet:</label>
        <input type='text' name='bet' onChange={this.changeBet} value={this.props.player.bet} /> 
      </form>
  )
  render () {
    const player = this.props.player
    return (
      <div>
        <h1>${player.cash} Player {player.handTotal > 0 ? player.handTotal : null} {player.status === 'bust' ? 'BUST!' : null}</h1>
        {player.status === 'betting' ? this.renderBetForm() : null }
        <div>{this.renderHand()}</div>
      </div>
    )
  }
}

export default Player;
