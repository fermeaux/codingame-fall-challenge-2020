import { RecipeAction } from './recipe-action'

export class Cast extends RecipeAction {
  constructor (inputs) {
    super(inputs)
    this.castable = inputs[9] !== '0' // in the first league: always 0; later: 1 if this is a castable player spell
    this.repeatable = inputs[10] !== '0' // for the first two leagues: always 0; later: 1 if this is a repeatable player spell
    this.nbTime = 1
  }

  apply () {
    console.log(`${this.type} ${this.id} ${this.nbTime}`)
  }
}
