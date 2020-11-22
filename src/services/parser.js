/* global readline */

import { Player, Context } from '../entities'
import { ActionFactory } from '../entities/actions'
import { globalState } from './global-state'

// TODO perf stocker le RootContext
class Parser {
  parse () {
    const clients = []
    const tomes = []
    const actionCount = parseInt(readline())
    const mySpells = []
    const yourSpells = []
    for (let i = 0; i < actionCount; i++) {
      const inputs = readline().split(' ')
      const action = ActionFactory.create(inputs)
      if (action.type === 'BREW') clients.push(action)
      else if (action.type === 'CAST') mySpells.push(action)
      else if (action.type === 'OPPONENT_CAST') yourSpells.push(action)
      else if (action.type === 'LEARN') tomes.push(action)
      else console.error(`Action of type ${action.type} is not managed`)
    }
    const me = new Player(readline().split(' '), mySpells, globalState.nbClientDone)
    // eslint-disable-next-line no-unused-vars
    readline().split(' ')
    return new Context({ me, clients, tomes })
  }
}

export const parser = new Parser()
