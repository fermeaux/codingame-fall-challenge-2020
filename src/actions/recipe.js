import { Action } from './action'
import { BrewCommand } from '../commands'

export class Recipe extends Action {
  constructor (inputs) {
    super(inputs)
    this.price = parseInt(inputs[6]) // the price in rupees if this is a potion
  }

  apply () {
    new BrewCommand(this.id).apply()
  }

  score () {
    const ingredientsScore = -this.deltas.score()
    if (ingredientsScore === 0) return 10
    return (this.price / ingredientsScore) * (1 / (this.deltas.count() - 1))
  }
}
