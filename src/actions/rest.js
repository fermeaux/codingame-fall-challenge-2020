import { Action } from './action'
import { RestCommand } from '../commands'

export class Rest extends Action {
  constructor () {
    super([null, 'REST'])
  }

  apply () {
    new RestCommand().apply()
  }

  score (ctx) {
    let bestScore = 0
    ctx.player.spells.forEach(spell => {
      const spellScore = spell.score(ctx)
      if (!spell.castable && spell.isUsefull(ctx.bestRecipe) && spellScore > bestScore) {
        bestScore = spellScore
      }
    })
    return bestScore - 1
  }
}
