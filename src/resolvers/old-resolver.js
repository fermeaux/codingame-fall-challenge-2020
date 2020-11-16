import { BrewCommand } from '../commands'
import { recipeScore, spellScore, tomeScore } from '../others/utils'
import { SpellResolver } from './old-spell-resolver'

export class Resolver {
  constructor ({ player, recipes, tomes }) {
    this.player = player
    this.recipes = recipes
    this.tomes = tomes
    this.solutions = {}
    this.missings = {}
    this.missingScores = {}
    this.spellsByRecipes = {}
    this.spellsByRecipesObj = {}
  }

  resolve () {
    let bestRecipeId = -1
    let bestRecipeScore = 0
    this.recipes.forEach((recipe, index) => {
      this.missings[recipe.id] = recipe.deltas.fillMissingWith(this.player.inv)
      this.missingScores[recipe.id] = recipeScore(this.missings[recipe.id], recipe.price)
      if (bestRecipeId === -1 || this.missingScores[recipe.id] > bestRecipeScore) {
        bestRecipeId = index
        bestRecipeScore = this.missingScores[recipe.id]
      }
      if (this.missings[recipe.id].count() === 0) {
        this.solutions[recipe.id] = new BrewCommand(recipe.id)
        return
      }
      this.spellsByRecipes[recipe.id] = {}
      this.player.spells.forEach(spell => {
        const spellResolver = new SpellResolver({ player: this.player, recipe, spell })
        spellResolver.resolve()
        const score = spellScore(spellResolver.spellIngredientsUsefull)
        this.spellsByRecipes[recipe.id][spell.id] = { score, spell }
      })
      this.tomes.forEach(tome => {
        const tomeResolver = new SpellResolver({ player: this.player, recipe, spell: tome })
        tomeResolver.resolve()
        const score = tomeScore(tomeResolver.spellIngredientsUsefull)
        this.spellsByRecipes[recipe.id][tome.id] = { score, spell: tome }
      })
    })
  }
}
