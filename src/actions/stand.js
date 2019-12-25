export function stand(isFirstSplitHand) {
  if (isFirstSplitHand) {
    return { type: 'SPLIT_STAND'} // stand on the first hand of the split
  } else {
    return { type: 'STAND'}
  } 
}