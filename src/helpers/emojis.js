
const good = ['😄','😎', '🤩', '😤', '😉', '🥳', '😌', '🤓', '😏', '🤑', '💪', ' 🙌', '👍', '👏', '👌']
const bad = ['😒','😨', '😩', '🥺', '😬', '😱', '😔', '🤕', '😭', '😵', '😞', '😠', '🙃', '🤢', '👎']
const neutral = ['🤔', '🧐', '🤨']

export function emojiGenerator(type) {
  if (type === 'good') {
    const index = getRandomInt(0, good.length - 1)
    return good[index]
  }
  if (type === 'bad') {
    const index = getRandomInt(0, bad.length - 1)
    return bad[index]
  }
  if(type === 'neutral') {
    const index = getRandomInt(0, neutral.length - 1)
    return neutral[index]
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}