/* global readline */

import { ActionFactory } from '../actions'
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
  }
}
