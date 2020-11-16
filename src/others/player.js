import { Ingredients } from './ingredients'

export class Player {
  constructor (inputs, spells) {
    this.inv = new Ingredients([
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
    return (this.hasEnoughIngredients(spell.deltas.ingredients) &&
            this.hasEnoughSpace(spell.deltas) &&
            spell.castable)
  }

  canLearn (tome) {
    return this.hasEnoughIngredients([-tome.tomeIndex, 0, 0, 0])
  }

  canBrew (recipe) {
    return this.hasEnoughIngredients(recipe.deltas.ingredients)
  }

  hasEnoughIngredients (ingredients) {
    return ingredients.every((ingredient, index) => this.inv.get(index) + ingredient >= 0)
  }

  hasEnoughSpace (ingredients) {
    return this.inv.count() + ingredients.count() <= this.inv.maxCount
  }
}
