import React from 'react'; 
import {connect} from 'react-redux';  
import './style.css';
import Player from '../player';
import {getDeck} from '../actions/getDeck';
import {drawCard} from '../actions/drawCard';

class Game extends React.Component { 
  componentDidMount() {
    this.props.getDeck();
  }

  drawCard = () => {
    this.props.drawCard(this.props.deckId, this.props.player.handTotal)
  }

  renderActions = () => {
    const player = this.props.player;
    if (player.status === 'BUST') {
      return null;
    } else {
      return <button onClick={this.drawCard}>Draw Card</button>
    }
  }

  render () { 
    return (
      <div>
        <h1>Blackjack</h1>
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

export default connect(mapStateToProps, {getDeck, drawCard})(Game);
