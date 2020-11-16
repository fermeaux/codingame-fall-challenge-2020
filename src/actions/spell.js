import { Action } from './action'
import { CastCommand } from '../commands'
import { INGREDIENTS } from '../others/currency'

export class Spell extends Action {
  constructor (inputs) {
    super(inputs)
    this.castable = inputs[9] !== '0' // in the first league: always 0; later: 1 if this is a castable player spell
    this.repeatable = inputs[10] !== '0' // for the first two leagues: always 0; later: 1 if this is a repeatable player spell
  }

  apply () {
    new CastCommand(this.id).apply()
  }

  isUsefull (recipe) {
    const firstPositive = this.deltas.firstPositive()
    return firstPositive >= 0 && firstPositive <= recipe.deltas.lastNegative()
  }

  score ({ bestRecipe }) {
    return bestRecipe.deltas.ingredients.reduce((prev, current, index) => {
      const spellIng = this.deltas.ingredients[index]
      return prev + (spellIng + current > 0 ? -current : spellIng) * INGREDIENTS[index]
    }, 0)
  }
}
