import { Ingredients } from '../others/ingredients'

export class SpellResolver {
  constructor ({ player, recipe, spell }) {
    this.player = player
    this.recipe = recipe
    this.spell = spell
  }

  resolve () {
    this.recipeIngredientsMissing = []
    this.playerIngredientsRemaining = []
    this.recipe.deltas.ingredients.forEach((recipeIngredient, index) => {
      const playerIngredient = this.player.inv.get(index)
      let delta = playerIngredient + recipeIngredient
      if (delta > 0) {
        this.playerIngredientsRemaining[index] = playerIngredient - delta
        delta = 0
      } else {
        this.playerIngredientsRemaining[index] = 0
      }
      this.recipeIngredientsMissing[index] = delta
    })
    this.recipeIngredientsMissing = new Ingredients(this.recipeIngredientsMissing)
    this.playerIngredientsRemaining = new Ingredients(this.playerIngredientsRemaining)
    this.spellIngredientsUsefull = []
    this.spell.deltas.ingredients.forEach((spellIngredient, index) => {
      if (spellIngredient >= 0) {
        const recipeIngredient = this.recipeIngredientsMissing.get(index)
        let delta = spellIngredient + recipeIngredient
        if (delta > 0) {
          this.spellIngredientsUsefull[index] = spellIngredient - delta
          delta = 0
        } else {
          this.spellIngredientsUsefull[index] = delta - recipeIngredient
        }
        this.recipeIngredientsMissing.ingredients[index] = delta
      } else {
        const playerIngredient = this.playerIngredientsRemaining.get(index)
        let delta = playerIngredient + spellIngredient
        if (delta > 0) {
          this.playerIngredientsRemaining[index] = playerIngredient - delta
          delta = 0
        } else {
          this.playerIngredientsRemaining[index] = 0
        }
        this.spellIngredientsUsefull[index] = delta
      }
    })
    this.spellIngredientsUsefull = new Ingredients(this.spellIngredientsUsefull)
  }
}
