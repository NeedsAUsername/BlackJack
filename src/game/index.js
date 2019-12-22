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

class Game extends React.Component { 
  componentDidMount() {
    this.props.getDeck();
  }

  componentDidUpdate() {
    if (this.props.dealer.status === 'hitting' && (this.props.dealer.handTotal < 17)) {
      setTimeout(() => this.props.drawCard(this.props.deckId, this.props.dealer.handTotal, 'dealer'), 1000)
    }
  }

  dealCards = () => {
    this.props.dealCards(this.props.deckId)
  }
  hit = () => {
    this.props.drawCard(this.props.deckId, this.props.player.handTotal, 'player')
  }
  stand = () => {
    this.props.stand()
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
      return <div>
          <button onClick={this.hit}>Hit</button>
          <button onClick={this.stand}>Stand</button>
        </div>
    }
    if (player.status === 'bust') {
      return <button onClick={this.reset}>Reset</button>;
    }
  }

  calculateWinner = () => {
    if (this.props.dealer.handTotal > 17 && this.props.player.status === 'standing') {
      if (this.props.dealer.value > this.props.player.value) {
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
        {this.calculateWinner()}
        <Dealer dealer={this.props.dealer}/>
        {this.renderActions()}
        <Player player={this.props.player}/>
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

export default connect(mapStateToProps, {getDeck, dealCards, drawCard, shuffleDeck, resetHands, stand})(Game);
