import { RecipeAction } from './recipe-action'

export class Brew extends RecipeAction {
  constructor (inputs) {
    super(inputs)
    this.price = parseInt(inputs[6]) // the price in rupees if this is a potion
  }
}
