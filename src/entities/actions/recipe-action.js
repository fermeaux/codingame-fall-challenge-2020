import { Action } from './action'
import { Recipe } from '../recipe'

export class RecipeAction extends Action {
  constructor (inputs) {
    super(inputs[1]) // in the first league: BREW; later: CAST, OPPONENT_CAST, LEARN, BREW
    this.id = parseInt(inputs[0]) // the unique ID of this spell or recipe
    this.deltas = new Recipe([
      parseInt(inputs[2]),
      parseInt(inputs[3]),
      parseInt(inputs[4]),
      parseInt(inputs[5])
    ])
  }

  apply () {
    console.log(`${this.type} ${this.id}`)
  }
}
