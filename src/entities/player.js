import { globalState } from '../services/global-state'
import { Rest } from './actions'
import { Recipe } from './recipe'

const restAction = new Rest()

export class Player {
  constructor (inputs, spells, nbClientDone, canRest) {
    this.inv = new Recipe([
      parseInt(inputs[0]),
      parseInt(inputs[1]),
      parseInt(inputs[2]),
      parseInt(inputs[3])
    ])
    this.inv.maxCount = 10
    this.score = parseInt(inputs[4]) // amount of rupees
    this.spells = spells
    this.nbClientDone = nbClientDone
    this.canRest = canRest
  }

  seekAvailableActions ({ clients, tomes }) {
    const availableActions = [
      ...this.seekAvailableBrews(clients),
      ...this.seekAvailableLearns(tomes),
      ...this.seekAvailableCasts()
    ]
    if (this.canRest) availableActions.push(restAction)
    return availableActions
  }

  seekAvailableCasts () {
    const availableCasts = []
    for (let i = 0; i < this.spells.length; i++) {
      const spell = this.spells[i]
      let currentSpell = this.generateRepeatableCast(spell, 1)
      for (let j = 1; currentSpell && this.canCast(currentSpell); j++) {
        availableCasts.push(currentSpell)
        if (currentSpell.repeatable) currentSpell = this.generateRepeatableCast(spell, j)
        else currentSpell = undefined
      }
    }
    return availableCasts
  }

  canCast (spell) {
    return (this.hasEnoughIngredients(spell.deltas.ingredients) &&
              this.hasEnoughSpace(spell.deltas) &&
              spell.castable)
  }

  generateRepeatableCast (template, nbTime) {
    const clone = template.clone()
    clone.nbTime = nbTime
    clone.deltas.ingredients = clone.deltas.ingredients.map(ingredient => ingredient * nbTime)
    return clone
  }

  seekAvailableLearns (tomes) {
    return tomes.filter(tome => this.canLearn(tome))
  }

  canLearn (tome) {
    return this.hasEnoughIngredients([-tome.tomeIndex, 0, 0, 0])
  }

  seekAvailableBrews (clients) {
    return clients.filter(client => this.canBrew(client))
  }

  canBrew (client) {
    return this.hasEnoughIngredients(client.deltas.ingredients)
  }

  hasEnoughIngredients (ingredients) {
    return ingredients.every((ingredient, index) => this.inv.get(index) + ingredient >= 0)
  }

  hasEnoughSpace (recipe) {
    return this.inv.count() + recipe.count() <= this.inv.maxCount
  }

  clone () {
    const clone = new Player(
      [
        this.inv.ingredients[0],
        this.inv.ingredients[1],
        this.inv.ingredients[2],
        this.inv.ingredients[3],
        this.score
      ],
      this.spells.map(spell => spell.clone()),
      this.nbClientDone,
      this.canRest
    )
    return clone
  }
}
