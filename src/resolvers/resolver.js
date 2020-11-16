import { Rest } from '../actions'
import { fillMissingIngredientsWith } from '../others/utils'

export class Resolver {
  constructor ({ player, recipes, tomes }) {
    this.player = player
    this.recipes = recipes
    this.tomes = tomes
    this.restAction = new Rest()
  }

  resolve () {
    this.brewIfPossible()
    if (this.brewAction) {
      this.bestAction = this.brewAction
    } else {
      this.findBestRecipe()
      this.prefill()
      this.seekAvailableActions()
      this.findBestAction()
    }
    this.bestAction.apply()
    this.log()
  }

  brewIfPossible () {
    this.brewAction = null
    this.recipes.forEach(recipe => {
      if (this.player.canBrew(recipe)) {
        this.brewAction = recipe
      }
    })
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
    fillMissingIngredientsWith(this.player.inv, this.bestRecipe.deltas)
  }

  seekAvailableActions () {
    this.availableActions = []
    this.tomes.forEach(tome => {
      if (this.player.canLearn(tome) && tome.isUsefull(this.bestRecipe)) {
        this.availableActions.push(tome)
      }
    })
    this.player.spells.forEach(spell => {
      if (this.player.canCast(spell) && spell.isUsefull(this.bestRecipe)) {
        this.availableActions.push(spell)
      }
    })
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
    if (!this.bestAction || this.restAction.score(this) > bestScore) {
      this.bestAction = this.restAction
    }
  }

  log () {
    if (this.availableActions) {
      const actionsFormated = this.availableActions.map((action) => ({ id: action.id, score: action.score(this), type: action.type }))
      actionsFormated.push({ score: this.restAction.score(this), type: this.restAction.type })
      console.error('actions : ', actionsFormated)
    }
    console.error('bestAction : ', this.bestAction, this.bestAction.score(this))
  }
}
