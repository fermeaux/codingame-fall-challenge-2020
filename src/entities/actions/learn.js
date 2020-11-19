import { Cast } from './cast'
import { RecipeAction } from './recipe-action'

export class Learn extends RecipeAction {
  constructor (inputs) {
    super(inputs)
    this.tomeIndex = parseInt(inputs[7]) // in the first two leagues: always 0; later: the index in the tome if this is a tome spell, equal to the read-ahead tax
    this.taxCount = parseInt(inputs[8]) // in the first two leagues: always 0; later: the amount of taxed tier-0 ingredients you gain from learning this spell
    this.castable = inputs[9] !== '0' // in the first league: always 0; later: 1 if this is a castable player spell
    this.repeatable = inputs[10] !== '0' // for the first two leagues: always 0; later: 1 if this is a repeatable player spell
  }

  simulate (player) {
    player.inv.substract([-this.tomeIndex, 0, 0, 0])
    player.spells.push(this.convertToCast())
    player.inv.add([this.taxCount, 0, 0, 0])
    if (player.inv.count() > player.inv.maxCount) player.inv.substract([player.inv.maxCount - player.inv.count(), 0, 0, 0])
    this.learned = true
  }

  convertToCast () {
    return new Cast([
      this.id,
      'CAST',
      this.deltas.get(0),
      this.deltas.get(1),
      this.deltas.get(2),
      this.deltas.get(3),
      null,
      0,
      0,
      '1',
      this.repeatable ? '1' : '0'
    ])
  }
}
