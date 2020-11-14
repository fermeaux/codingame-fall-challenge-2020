import { Action } from './action'
import { CastCommand } from '../commands'

export class Spell extends Action {
  constructor (inputs) {
    super(inputs)
    this.tomeIndex = parseInt(inputs[7]) // in the first two leagues: always 0; later: the index in the tome if this is a tome spell, equal to the read-ahead tax
    this.taxCount = parseInt(inputs[8]) // in the first two leagues: always 0; later: the amount of taxed tier-0 ingredients you gain from learning this spell
    this.castable = inputs[9] !== '0' // in the first league: always 0; later: 1 if this is a castable player spell
    this.repeatable = inputs[10] !== '0' // for the first two leagues: always 0; later: 1 if this is a repeatable player spell
  }

  apply () {
    super.apply()
    if (this.type === 'CAST') new CastCommand(this.id).apply()
  }

  isUsefull (recipe) {
    const firstPositive = this.deltas.firstPositive()
    return firstPositive >= 0 && firstPositive <= recipe.lastIndexMissing
  }

  isNeeded (recipe) {
    let isNeeded = false
    this.deltas.rupees.forEach((delta, index) => {
      if (delta > 0 && recipe.missing[index] < 0) {
        isNeeded = true
      }
    })
    return isNeeded
  }
}
