/* global readline */

import { ActionFactory } from '../actions'
// import { RestCommand } from '../commands'
import { Resolver } from '../resolvers/resolver'
import { Player } from './player'

export class Main {
  readLines () {
    const actionCount = parseInt(readline()) // the number of spells and recipes in play
    this.recipes = []
    const mySpells = []
    const yourSpells = []
    this.spellShop = []
    for (let i = 0; i < actionCount; i++) {
      const inputs = readline().split(' ')
      const action = ActionFactory.create(inputs)
      if (action.type === 'BREW') this.recipes.push(action)
      else if (action.type === 'CAST') mySpells.push(action)
      else if (action.type === 'OPPONENT_CAST') yourSpells.push(action)
      else if (action.type === 'LEARN') this.spellShop.push(action)
      else console.error('Action is not managed')
    }
    this.me = new Player(readline().split(' '), mySpells)
    this.you = new Player(readline().split(' '), yourSpells)
  }

  process () {
    new Resolver({ player: this.me, tomes: this.spellShop, recipes: this.recipes }).resolve()
    // this.processRecipe()
    // if (this.selectedAction) return
    // this.processSpell()
  }

  // processRecipe () {
  //   this.selectedAction = null
  //   this.targetRecipe = null
  //   this.recipes.forEach((recipe) => {
  //     if (
  //       recipe.playable &&
  //       (!this.selectedAction || recipe.price > this.selectedAction.price)
  //     ) {
  //       this.selectedAction = recipe
  //     }
  //     if (!this.targetRecipe || this.targetRecipe.score > recipe.score) {
  //       this.targetRecipe = recipe
  //     }
  //   })
  // }

  // processSpell () {
  //   this.me.spells.forEach((spell) => {
  //     if (
  //       this.me.canCast(spell) &&
  //       spell.isUsefull(this.targetRecipe) &&
  //       (!this.selectedAction || spell.isNeeded(this.targetRecipe))
  //     ) {
  //       this.selectedAction = spell
  //     }
  //   })
  // }

  // apply () {
  //   if (!this.selectedAction) return new RestCommand().apply()
  //   this.selectedAction.apply()
  // }
}
