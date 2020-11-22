import { RecipeAction } from './recipe-action'

export class Cast extends RecipeAction {
  constructor (inputs, nbTime) {
    super(inputs)
    this.castable = inputs[9] !== '0' // in the first league: always 0; later: 1 if this is a castable player spell
    this.repeatable = inputs[10] !== '0' // for the first two leagues: always 0; later: 1 if this is a repeatable player spell
    this.nbTime = nbTime || 1
  }

  apply () {
    console.error(`${this.type} ${this.id} ${this.nbTime}`)
    console.log(`${this.type} ${this.id} ${this.nbTime}`)
  }

  simulate (player) {
    player.inv.substract(this.deltas.ingredients)
    player.inv.add(this.deltas.ingredients)
    this.castable = false
  }

  clone () {
    return new Cast([
      this.id,
      this.type,
      this.deltas.get(0),
      this.deltas.get(1),
      this.deltas.get(2),
      this.deltas.get(3),
      null,
      0,
      0,
      this.castable ? '1' : '0',
      this.repeatable ? '1' : '0'
    ])
  }

  computeScore () {
    return this.deltas.computeScore()
  }
}
