import { globalState } from '../../services/global-state'
import { RecipeAction } from './recipe-action'

export class Brew extends RecipeAction {
  constructor (inputs) {
    super(inputs)
    this.price = parseInt(inputs[6]) // the price in rupees if this is a potion
  }

  simulate (player) {
    player.inv.substract(this.deltas.ingredients)
    player.score += this.price
    this.brewed = true
    player.nbClientDone++
  }

  clone () {
    return new Brew([
      this.id,
      'BREW',
      this.deltas.get(0),
      this.deltas.get(1),
      this.deltas.get(2),
      this.deltas.get(3),
      this.price
    ])
  }

  apply () {
    globalState.nbClientDone++
    super.apply()
  }

  computeScore (context) {
    if (context.me.nbClientDone <= 3) {
      return this.price * this.price
    } else if (context.me.nbClientDone > 3) {
      return Math.sqrt(this.price)
    }
    // return 1
    // return Math.sqrt(this.price)
    // return this.price * this.price
  }
}
