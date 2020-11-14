import { ActionFactory } from './actions'
import { RestCommand } from './commands'
import { Player } from './player'

class Main {
  getInputs () {
    const actionCount = parseInt(readline()) // the number of spells and recipes in play
    this.recipes = []
    const mySpells = []
    const yourSpells = []
    this.shop = []
    for (let i = 0; i < actionCount; i++) {
      const inputs = readline().split(' ')
      const action = ActionFactory.create(inputs)
      if (action.type === 'BREW') this.recipes.push(action)
      else if (action.type === 'CAST') mySpells.push(action)
      else if (action.type === 'OPPONENT_CAST') yourSpells.push(action)
      else if (action.type === 'LEARN') this.shop.push(action)
      else console.error('Action is not managed')
    }
    this.me = new Player(readline().split(' '), mySpells)
    this.you = new Player(readline().split(' '), yourSpells)
  }

  parse () {
    this.me.parse()
    this.you.parse()
    this.recipes.forEach((recipe) => {
      recipe.parse(this.me, this.you)
    })
  }

  process () {
    this.processRecipe()
    if (this.selectedAction) return
    this.processSpell()
  }

  processRecipe () {
    this.selectedAction = null
    this.targetRecipe = null
    this.recipes.forEach((recipe) => {
      if (
        recipe.playable &&
        (!this.selectedAction || recipe.price > this.selectedAction.price)
      ) {
        this.selectedAction = recipe
      }
      if (!this.targetRecipe || this.targetRecipe.score > recipe.score) {
        this.targetRecipe = recipe
      }
    })
  }

  processSpell () {
    this.me.spells.forEach((spell) => {
      if (
        spell.playable &&
        spell.isUsefull(this.targetRecipe) &&
        (!this.selectedAction || spell.isNeeded(this.targetRecipe))
      ) {
        this.selectedAction = spell
      }
    })
  }

  apply () {
    if (!this.selectedAction) return new RestCommand().apply()
    this.selectedAction.apply()
  }
}

while (true) {
  const main = new Main()
  console.error('non')
  main.getInputs()
  main.parse()
  main.process()
  main.apply()
}
