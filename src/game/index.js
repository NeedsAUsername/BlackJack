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
import {split} from '../actions/split';
import {calculateHandTotal} from '../helpers/calculateHandTotal';

class Game extends React.Component { 
  componentDidMount() {
    this.props.getDeck();
  }

  componentDidUpdate() {
    if (this.props.dealer.status === 'hitting') {
      if (this.props.dealer.handTotal < 17) {
        setTimeout(() => this.props.drawCard(this.props.deckId, this.props.dealer.hand, 'dealer'), 1000)
      } else {
        this.props.calculateWinner(this.props.player, this.props.dealer.handTotal);
      }
    } 
  }

  dealCards = () => {
    this.props.dealCards(this.props.deckId)
  }
  hit = () => {
    let hand = this.props.player.playingSplitHand ? this.props.player.splitHand : this.props.player.hand
    let showdown = false
    if (this.props.player.playingSplitHand && this.props.player.handTotal <= 21) {
      showdown = true
    }
    this.props.drawCard(this.props.deckId, hand, 'player', showdown)
  }
  stand = () => {
    this.props.stand((this.props.player.isSplit && !this.props.player.playingSplitHand))
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
    if (this.props.dealer.status === 'hitting'){
      return <div>Good Luck...</div>
    }
    if (player.status === 'bust' || player.status === 'waiting' || this.props.dealer.status === 'bust') {
      return <button onClick={this.reset}>Reset</button>;
    }
    if (player.playingSplitHand === true) {
      return (
        <div>
          {calculateHandTotal(player.splitHand) < 21 ? <button onClick={this.hit}>Hit</button> : null}
          <button onClick={this.stand}>Stand</button>
        </div>
      )
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
          {player.handTotal < 21 && !player.isSplit ? <button onClick={this.props.split}>Split</button> : null}
          {player.handTotal < 21 && !player.isSplit ? <button onClick={this.double}>Double</button> : null}
          {player.handTotal < 21 ? <button onClick={this.hit}>Hit</button> : null}
          <button onClick={this.stand}>Stand</button>
        </div>)
      }
    }
  }
  render () { 
    return (
      <div>
        <h1>Blackjack</h1>
        <h3>{this.props.player.roundMessage}</h3>
        {this.renderActions()}
        <div className='board'>
          <Dealer dealer={this.props.dealer} isSplit={this.props.player.isSplit}/>
          <Player player={this.props.player} changeBet={this.props.changeBet}/>
        </div>
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
  getDeck, dealCards, drawCard, shuffleDeck, resetHands, stand, calculateWinner, changeBet, double, split
})(Game);
