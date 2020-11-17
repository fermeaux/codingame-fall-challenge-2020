import { RecipeAction } from './recipe-action'

export class Learn extends RecipeAction {
  constructor (inputs) {
    super(inputs)
    this.tomeIndex = parseInt(inputs[7]) // in the first two leagues: always 0; later: the index in the tome if this is a tome spell, equal to the read-ahead tax
    this.taxCount = parseInt(inputs[8]) // in the first two leagues: always 0; later: the amount of taxed tier-0 ingredients you gain from learning this spell
    this.castable = inputs[9] !== '0' // in the first league: always 0; later: 1 if this is a castable player spell
    this.repeatable = inputs[10] !== '0' // for the first two leagues: always 0; later: 1 if this is a repeatable player spell
  }
}
