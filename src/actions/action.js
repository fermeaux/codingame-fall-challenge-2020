import { Rupees } from '../others'

export class Action {
  constructor (inputs) {
    this.id = parseInt(inputs[0]) // the unique ID of this spell or recipe
    this.type = inputs[1] // in the first league: BREW; later: CAST, OPPONENT_CAST, LEARN, BREW
    this.deltas = new Rupees([
      parseInt(inputs[2]),
      parseInt(inputs[3]),
      parseInt(inputs[4]),
      parseInt(inputs[5])
    ])
  }

  apply () {}
}
