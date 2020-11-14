import { Rupees } from '../others'

export class Player {
  constructor (inputs, spells) {
    this.inv = new Rupees([
      parseInt(inputs[0]),
      parseInt(inputs[1]),
      parseInt(inputs[2]),
      parseInt(inputs[3])
    ])
    this.inv.maxCount = 10
    this.score = parseInt(inputs[4]) // amount of rupees
    this.spells = spells
  }

  canCast (spell) {
    return this.hasEnoughRupees(spell) && this.hasEnoughSpace(spell) && spell.castable
  }

  hasEnoughRupees (spell) {
    return spell.deltas.every((delta, index) => this.inv[index] + delta >= 0)
  }

  hasEnoughSpace (spell) {
    return this.nbRupees + spell.nbRupees <= this.maxRupees
  }
}
