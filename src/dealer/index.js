import React from 'react'; 
import './style.css';
import Card from '../card';

class Dealer extends React.Component { 

  renderHand = () => {
    return this.props.dealer.hand.map((card, index) => <Card key={index} card={card}/>)
  }
  render () {
    const dealer = this.props.dealer
    return (
      <div>
        <h1>Dealer {dealer.handTotal} {dealer.status === 'bust' ? 'BUST!' : null}</h1>
        <div>{this.renderHand()}</div>
      </div>
    )
  }
}

export default Dealer;
