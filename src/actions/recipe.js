import { Action } from './action'
import { BrewCommand } from '../commands'

export class Recipe extends Action {
  constructor (inputs) {
    super(inputs)
    this.price = parseInt(inputs[6]) // the price in rupees if this is a potion
    this.score = this.price
  }

  apply () {
    super.apply()
    new BrewCommand(this.id).apply()
  }
}
