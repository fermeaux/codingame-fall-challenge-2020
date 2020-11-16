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
    return this.price / this.deltas.score()
  }
}
