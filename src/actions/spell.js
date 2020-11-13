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

  parse (player) {
    super.parse()
    this.nbRupees = this.deltas.reduce((prev, current) => {
      return prev + current
    }, 0)
    this.playable =
      this.isPlayableBy(player) &&
      this.castable &&
      player.nbRupees + this.nbRupees <= 10
  }

  apply () {
    super.apply()
    if (this.type === 'CAST') new CastCommand(this.id).apply()
  }

  isUsefull (recipe) {
    const firstPositiveValue = this.deltas.reduce((prev, current, index) => {
      return prev < 0 && current > 0 ? index : prev
    }, -1)
    return (
      firstPositiveValue >= 0 && firstPositiveValue <= recipe.lastIndexMissing
    )
  }

  isNeeded (recipe) {
    let isNeeded = false
    this.deltas.forEach((delta, index) => {
      if (delta > 0 && recipe.missing[index] < 0) {
        isNeeded = true
      }
    })
    return isNeeded
  }

  isPlayableBy (player) {
    return this.deltas.every((delta, index) => player.inv[index] + delta >= 0)
  }
}
