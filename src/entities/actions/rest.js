import { Action } from './action'

export class Rest extends Action {
  constructor () {
    super('REST')
  }

  simulate (player) {
    player.spells.forEach((spell) => {
      spell.castable = true
    })
  }

  clone () {
    return this
  }

  computeScore (context) {
    return 0.75
  }
}
