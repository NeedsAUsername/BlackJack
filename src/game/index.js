import React from 'react'; 
import {connect} from 'react-redux';  
import './style.css';
import Player from '../player';
import Dealer from '../dealer';
import {getDeck} from '../actions/getDeck';
import {dealCards} from '../actions/dealCards';
import {drawCard} from '../actions/drawCard';
import {shuffleDeck} from '../actions/shuffleDeck';
import {resetHands} from '../actions/resetHands';
import {stand} from '../actions/stand';
import {calculateWinner} from '../actions/calculateWinner';
import {changeBet} from '../actions/changeBet';
import {double} from '../actions/double';

class Game extends React.Component { 
  componentDidMount() {
    this.props.getDeck();
  }

  componentDidUpdate() {
    if (this.props.dealer.status === 'hitting') {
      if (this.props.dealer.handTotal < 17) {
        setTimeout(() => this.props.drawCard(this.props.deckId, this.props.dealer.hand, 'dealer'), 1000)
      } else {
        this.props.calculateWinner(this.props.player.handTotal, this.props.dealer.handTotal);
      }
    } 
  }

  dealCards = () => {
    this.props.dealCards(this.props.deckId)
  }
  hit = () => {
    this.props.drawCard(this.props.deckId, this.props.player.hand, 'player')
  }
  stand = () => {
    this.props.stand()
  }
  double = () => {
    this.props.double(this.props.deckId, this.props.player.hand)
  }
  reset = () => {
    this.props.shuffleDeck(this.props.deckId)
    this.props.resetHands();
  }
  
  dealerTurns = () => {
    this.dealerInterval = setInterval(this.dealerHit, 1000)
  }
  dealerHit = () => {
    this.props.drawCard(this.props.deckId, this.props.dealer.handTotal, 'dealer')
    if (this.props.dealer.status === 'bust') {
      clearInterval(this.dealerInterval)
    }
  }

  renderActions = () => {
    const player = this.props.player;
    if (player.status === 'betting') {
      return <button onClick={this.dealCards}>Deal Cards</button>
    }
    if(player.status === 'playing') {
      if (player.hand.length > 2) {
        return (
        <div>
          {player.handTotal < 21 && player.doubled === false ? <button onClick={this.hit}>Hit</button> : null}
          <button onClick={this.stand}>Stand</button>
        </div>)
      } else {
        return (
        <div>
          {player.handTotal < 21 ? <button onClick={this.double}>Double</button> : null}
          {player.handTotal < 21 ? <button onClick={this.hit}>Hit</button> : null}
          <button onClick={this.stand}>Stand</button>
        </div>)
      }
    }
    if (player.status === 'bust' || player.status === 'waiting' || this.props.dealer.status === 'bust') {
      return <button onClick={this.reset}>Reset</button>;
    }
    else {
      return <div>Good Luck...</div>
    }
  }

  renderWinner = () => {
    if (this.props.dealer.handTotal >= 17 && this.props.dealer.status === 'waiting') {
      if (this.props.dealer.handTotal === this.props.player.handTotal) {
        return <h1>Push</h1>
      }
      else if (this.props.dealer.handTotal > this.props.player.handTotal) {
        return <h1>Dealer Wins</h1>
      } else {
        return <h1>Player Wins</h1>
      }
    }
  }
  render () { 
    return (
      <div>
        <h1>Blackjack</h1>
        {this.renderWinner()}
        {this.renderActions()}
        <Dealer dealer={this.props.dealer}/>
        <Player player={this.props.player} changeBet={this.props.changeBet}/>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    player: store.player,
    dealer: store.dealer,
    deckId: store.deck.id
  }
}

export default connect(mapStateToProps, {
  getDeck, dealCards, drawCard, shuffleDeck, resetHands, stand, calculateWinner, changeBet, double
})(Game);
