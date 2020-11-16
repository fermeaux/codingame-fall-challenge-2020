import { Rest } from '../actions'
import { fillMissingIngredientsWith } from '../others/utils'

export class Resolver {
  constructor ({ player, recipes, tomes }) {
    this.player = player
    this.recipes = recipes
    this.tomes = tomes
  }

  resolve () {
    this.findBestRecipe()
    if (this.player.canBrew(this.bestRecipe)) {
      this.bestAction = this.bestRecipe
    } else {
      this.prefill()
      this.seekAvailableActions()
      this.findBestAction()
    }
    this.bestAction.apply()
  }

  seekAvailableActions () {
    this.availableActions = []
    let restHasBeenCount = false
    this.player.spells.forEach(spell => {
      if (this.player.canCast(spell) && spell.isNeeded(this.bestRecipe)) {
        this.availableActions.push(spell)
      } else if (!restHasBeenCount) {
        restHasBeenCount = true
        this.availableActions.push(new Rest())
      }
    })
    this.tomes.forEach(tome => {
      if (this.player.canLearn(tome) && tome.isNeeded(this.bestRecipe)) {
        this.availableActions.push(tome)
      }
    })
    console.error(this.bestRecipe)
  }

  findBestRecipe () {
    this.bestRecipe = null
    let bestScore = 0
    this.recipes.forEach(recipe => {
      const recipeScore = recipe.score()
      if (!this.bestRecipe || recipeScore > bestScore) {
        this.bestRecipe = recipe
        bestScore = recipeScore
      }
    })
  }

  prefill () {
    console.error(this.player.inv, this.bestRecipe.deltas)
    fillMissingIngredientsWith(this.player.inv, this.bestRecipe.deltas)
    console.error(this.bestRecipe.deltas)
  }

  findBestAction () {
    this.bestAction = null
    let bestScore = 0
    this.availableActions.forEach(action => {
      const actionScore = action.score(this)
      if (!this.bestAction || actionScore >= bestScore) {
        this.bestAction = action
        bestScore = actionScore
      }
    })
  }
}
