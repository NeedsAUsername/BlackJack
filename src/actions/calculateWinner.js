import {calculateHandTotal} from '../helpers/calculateHandTotal';

export function calculateWinner(player, dealerHandTotal) {
    return (dispatch) => {
        let playerHandTotal = player.handTotal
        if (player.isSplit) {
            let playerSplitHandTotal = calculateHandTotal(player.splitHand)
            let score = 0;
            if (playerHandTotal <= 21 && playerHandTotal > dealerHandTotal) {
                score += 1;
            } else if (playerHandTotal <= 21 && dealerHandTotal > playerHandTotal) {
                score -= 1;
            } 
            if (playerSplitHandTotal <= 21 && playerSplitHandTotal > dealerHandTotal) {
                score += 1;
            } else if (playerSplitHandTotal <= 21 && dealerHandTotal > playerSplitHandTotal) {
                score -=1;
            }
            if (score > 0) {
                declareWinner(dispatch, 'player', score)
            } else if (score === 0) {
                declareWinner(dispatch, 'push', score)
            } else if (score < 0) {
                declareWinner(dispatch, 'dealer', score)
            }
        } else {
            // calculates winner when neither player nor dealer busts
            if (playerHandTotal > dealerHandTotal) {
                declareWinner(dispatch, 'player')
            } else if (playerHandTotal === dealerHandTotal) {
                declareWinner(dispatch, 'push')
            } else if (dealerHandTotal > playerHandTotal) {
                declareWinner(dispatch, 'dealer')
            }
        }
    }   
}


function declareWinner(dispatch, winner, score) {
    dispatch ({
        type: 'CALCULATE_WINNER',
        winner,
        score
    });
}