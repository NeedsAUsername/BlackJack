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
import {cardMap} from '../helpers/cardMap';
import {calculateHandTotal} from '../helpers/calculateHandTotal';
import cardLogo from '../images/card_logo.png';

class Game extends React.Component { 
  componentDidMount() {
    this.props.getDeck();
    this.handsPlayed = 0;
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

  state = {
    showRules: true
  }

  toggleShowRules = (e) => {
    e.preventDefault()
    this.setState((prevState, props) => {
      return {
        showRules: !prevState.showRules
      }
    })
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
    this.handsPlayed += 1;
    console.log(this.handsPlayed);
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

  isSplitableHand = () => {
    if (this.props.player.isSplit) {
      return false
    } 
    const conditionOne = this.props.player.handTotal < 21
    const conditionTwo = cardMap[this.props.player.hand[0].value] === cardMap[this.props.player.hand[1].value]
    return conditionOne && conditionTwo
  }

  renderActions = () => {
    const player = this.props.player;
    if (player.status === 'betting') {
      return <button onClick={this.dealCards}>Deal</button>
    }
    if (this.props.dealer.status === 'hitting'){
      return <div>Good Luck🤞</div>
    }
    if (player.status === 'bust' || player.status === 'waiting' || this.props.dealer.status === 'bust') {
      return <button onClick={this.reset}>Reset</button>;
    }
    if (player.playingSplitHand === true) {
      return (
        <React.Fragment>
          {calculateHandTotal(player.splitHand) < 21 ? <button onClick={this.hit}>Hit</button> : null}
          <button onClick={this.stand}>Stand</button>
        </React.Fragment>
      )
    }
    if(player.status === 'playing') {
      if (player.hand.length > 2) {
        return (
        <React.Fragment>
          {player.handTotal < 21 && player.doubled === false ? <button onClick={this.hit}>Hit</button> : null}
          <button onClick={this.stand}>Stand</button>
        </React.Fragment>)
      } else {
        return (
        <React.Fragment>
          {this.isSplitableHand() ? <button onClick={this.props.split}>Split</button> : null}
          {player.handTotal < 21 && !player.isSplit ? <button onClick={this.double}>Double</button> : null}
          {player.handTotal < 21 ? <button onClick={this.hit}>Hit</button> : null}
          <button onClick={this.stand}>Stand</button>
        </React.Fragment>)
      }
    }
  }

  changeBet = (e) => {
    e.preventDefault()
    this.props.changeBet(e.target.value)
  }
  submitBetForm = (e) => {
    e.preventDefault()
    this.dealCards()
  }
  renderBetForm = () => (
      <form className='bet-form' onSubmit={this.submitBetForm}>
        <h2><label htmlFor='bet'>Bet:</label></h2>
        <input type='text' name='bet' onChange={this.changeBet} value={this.props.player.bet} />
      </form>
  )
  renderRules = () => {
    if (this.state.showRules) {
      return (    
        <div className='rules'>
          <button onClick={this.toggleShowRules}>Toggle Rules</button>
          <p>Welcome to my version of Blackjack!</p>
          <p>If you are not familiar with the game, you can find general rules <a href='http://www.hitorstand.net/strategy.php' target="_blank">here</a></p>
          <p>Here are my house rules:</p>
          <p>Natural blackjacks are not automatic wins and pay the normal bet amount</p>
          <p>Player may double on any starting hand</p>
          <p>Player may split on starting hands with the same value</p>
          <p>Player may only split once per round</p>
          <p>Player may not double once they split hands</p>
          <p>Dealer stands on a soft seventeen(hand worth 17 or 7 with an Ace)</p>
        </div>)
    } else {
      return (
        <div className='corner'>
          <button onClick={this.toggleShowRules}>Toggle Rules</button>
        </div>
      )
    }
  }
  render () { 
    return (
      <div className='game-container'>
          <h3>{this.props.player.roundMessage}</h3>
          <div className='actions'>
            <h1><img className='card-logo' src={cardLogo}/>Blackjack</h1>
            <h2>Score: {this.props.player.cash}</h2> 
            {this.props.player.status === 'betting' ? this.renderBetForm() : <h2>Bet: ${this.props.player.bet}</h2>}
            {this.renderActions()}
          </div>
          <div className='board'>
            {this.props.player.status === 'betting' ? this.renderRules() : 
            <React.Fragment>
              <Dealer dealer={this.props.dealer} isSplit={this.props.player.isSplit}/>
              <Player player={this.props.player} changeBet={this.props.changeBet}/>
            </React.Fragment>}
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
