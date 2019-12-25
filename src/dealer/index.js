import React from 'react'; 
import './style.css';
import Card from '../card';

class Dealer extends React.Component { 

  renderHand = () => {
    return this.props.dealer.hand.map((card, index) => <Card key={index} card={card} isSplit={this.props.isSplit} />)
  }
  render () {
    const dealer = this.props.dealer
    return (
      <div className='dealer'>
        <h2>Dealer {dealer.handTotal > 0 ? dealer.handTotal : null} {dealer.status === 'bust' ? 'BUST!' : null}</h2>
        <div>{this.renderHand()}</div>
      </div>
    )
  }
}

export default Dealer;
