import { LearnCommand } from '../commands'
import { INGREDIENTS } from '../others/currency'
import { Spell } from './spell'

export class TomeSpell extends Spell {
  constructor (inputs) {
    super(inputs)
    this.tomeIndex = parseInt(inputs[7]) // in the first two leagues: always 0; later: the index in the tome if this is a tome spell, equal to the read-ahead tax
    this.taxCount = parseInt(inputs[8]) // in the first two leagues: always 0; later: the amount of taxed tier-0 ingredients you gain from learning this spell
  }

  apply () {
    new LearnCommand(this.id).apply()
  }

  score () {
    const ingredientsScore = this.deltas.score()
    const taxIncome = this.taxCount * INGREDIENTS[0]
    const taxOutcome = this.tomeIndex * INGREDIENTS[0]
    return -1 + ingredientsScore + taxIncome - taxOutcome
  }
}
