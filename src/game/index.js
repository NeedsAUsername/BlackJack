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

class Game extends React.Component { 
  componentDidMount() {
    this.props.getDeck();
  }

  hit = () => {
    this.props.drawCard(this.props.deckId, this.props.player.handTotal)
  }
  shuffleDeck = () => {
    this.props.shuffleDeck(this.props.deckId)
  }
  dealCards = () => {
    this.props.dealCards(this.props.deckId)
  }

  reset = () => {
    this.shuffleDeck();
    this.props.resetHands();
  }

  renderActions = () => {
    const player = this.props.player;
    if (player.status === 'betting') {
      return <button onClick={this.dealCards}>Deal Cards</button>
    }
    if(player.status === 'playing') {
      return <button onClick={this.hit}>Hit</button>
    }
    if (player.status === 'bust') {
      return <button onClick={this.reset}>Reset</button>;
    }
  }

  render () { 
    return (
      <div>
        <h1>Blackjack</h1>
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

export default connect(mapStateToProps, {getDeck, dealCards, drawCard, shuffleDeck, resetHands})(Game);
