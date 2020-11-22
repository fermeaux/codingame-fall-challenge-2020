import { Rest } from './actions'
import { Recipe } from './recipe'

export class Player {
  constructor (inputs, spells, nbClientDone) {
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
  }

  seekAvailableActions ({ clients, tomes }) {
    return [
      ...this.seekAvailableBrews(clients),
      ...this.seekAvailableCasts(),
      ...this.seekAvailableRest(),
      ...this.seekAvailableLearns(tomes)
    ]
  }

  seekAvailableCasts () {
    return this.spells.reduce((availableCasts, spell) => {
      let currentSpell = this.generateRepeatableCast(spell, 1)
      for (let i = 1; currentSpell && this.canCast(currentSpell); i++) {
        availableCasts.push(currentSpell)
        if (currentSpell.repeatable) currentSpell = this.generateRepeatableCast(spell, i)
        else currentSpell = undefined
      }
      return availableCasts
    }, [])
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
    return tomes.reduce((availableTomes, tome) => {
      if (this.canLearn(tome)) {
        availableTomes.push(tome)
      }
      return availableTomes
    }, [])
  }

  canLearn (tome) {
    return this.hasEnoughIngredients([-tome.tomeIndex, 0, 0, 0])
  }

  seekAvailableBrews (clients) {
    return clients.reduce((availableBrews, client) => {
      if (this.canBrew(client)) {
        availableBrews.push(client)
      }
      return availableBrews
    }, [])
  }

  canBrew (client) {
    return this.hasEnoughIngredients(client.deltas.ingredients)
  }

  seekAvailableRest () {
    for (let i = 0; i < this.spells.length; i++) {
      if (!this.spells[i].castable) return [new Rest()]
    }
    return []
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
      this.nbClientDone
    )
    return clone
  }
}
