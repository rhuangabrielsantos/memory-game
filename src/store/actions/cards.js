export function flipCard(id) {
  return {
    type: 'CLICK_CARD',
    id,
  }
}

export function validateMatch() {
  return {
    type: 'VALIDATE_MATCH',
  }
}
