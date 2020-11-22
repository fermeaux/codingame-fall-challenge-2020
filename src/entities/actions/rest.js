import { globalState } from '../../services/global-state'
import { Action } from './action'

export class Rest extends Action {
  constructor () {
    super('REST')
  }

  apply () {
    globalState.canRest = false
    console.error(this.type)
    console.log(this.type)
  }

  simulate (player) {
    player.canRest = false
    player.spells.forEach((spell) => {
      spell.castable = true
    })
  }

  clone () {
    return this
  }

  computeScore (context) {
    return 0.25
  }
}
