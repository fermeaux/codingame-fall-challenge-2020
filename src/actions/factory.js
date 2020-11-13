import { Recipe } from './recipe'
import { Spell } from './spell'

export class ActionFactory {
  static create (inputs) {
    const type = inputs[1]
    if (type === 'CAST' || type === 'OPPONENT_CAST' || type === 'LEARN') {
      return new Spell(inputs)
    } else if (type === 'BREW') return new Recipe(inputs)
    return { type }
  }
}
