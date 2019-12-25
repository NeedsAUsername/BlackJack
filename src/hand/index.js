import React from 'react'; 
import './style.css';
import Card from '../card';

class Hand extends React.Component { 

  renderCards = () => {
    return this.props.hand.map((card, index) => <Card key={index} card={card}/>)
  }
  render () {
    return (
      <div>
        <h1>{this.props.handTotal > 0 ? this.props.handTotal : null} {this.props.status === 'bust' ? 'BUST!' : null}</h1>
        <div>{this.renderCards()}</div>
      </div>
    )
  }
}

export default Hand;
