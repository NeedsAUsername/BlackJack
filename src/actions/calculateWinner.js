// calculates winner when neither player nor dealer busts
export function calculateWinner(playerHandTotal, dealerHandTotal) {
    return (dispatch) => {
        if (playerHandTotal > dealerHandTotal) {
            dispatch ({
                type: 'CALCULATE_WINNER',
                winner: 'player'
            });
        } else if (playerHandTotal === dealerHandTotal) {
            dispatch ({
                type: 'CALCULATE_WINNER',
                winner: 'push'
            });
        } else if (dealerHandTotal > playerHandTotal) {
            dispatch ({
                type: 'CALCULATE_WINNER',
                winner: 'dealer'
            })
        }
    }   
}
