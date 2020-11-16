export const inputs = ({ id, type, deltas, price, tomeIndex, taxCount, castable, repeatable }) => {
  return [
    id || 0,
    type || 'CAST',
    deltas ? deltas[0] : 0,
    deltas ? deltas[1] : 0,
    deltas ? deltas[2] : 0,
    deltas ? deltas[3] : 0,
    price || 0,
    tomeIndex || 0,
    taxCount || 0,
    castable || false,
    repeatable || false
  ]
}
