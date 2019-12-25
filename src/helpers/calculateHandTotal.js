
import {cardMap} from './cardMap';

export function calculateHandTotal(hand) {
  let numberOfAcesValue11 = 0
  let handTotal = 0
  hand.forEach(card => {
    if (card.value === 'ACE') {
      numberOfAcesValue11 += 1;
    }
    handTotal += cardMap[card.value]
  })
  while (numberOfAcesValue11 > 0 && handTotal > 21) {
    handTotal -= 10;
    numberOfAcesValue11 -= 1;
  }
  return handTotal
}