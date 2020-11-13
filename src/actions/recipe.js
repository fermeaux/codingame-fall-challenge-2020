import { Action } from './action'
import { BrewCommand } from '../commands'

export class Recipe extends Action {
  constructor (inputs) {
    super(inputs)
    this.price = parseInt(inputs[6]) // the price in rupees if this is a potion
  }

  parse (me, you) {
    super.parse()
    this.playable = this.isPlayableBy(me)
    this.playableByYou = this.isPlayableBy(you)
    this.missing = this.deltas.map((delta, index) => me.inv[index] + delta)
    this.lastIndexMissing = this.missing.reduce((prev, current, index) => {
      return current < 0 ? index : prev
    }, -1)
    this.nbRupees = this.deltas.reduce((prev, current) => {
      return prev - current
    }, 0)
    this.score = this.price
  }

  apply () {
    super.apply()
    new BrewCommand(this.id).apply()
  }

  isPlayableBy (player) {
    return this.deltas.every((delta, index) => player.inv[index] + delta >= 0)
  }
}
