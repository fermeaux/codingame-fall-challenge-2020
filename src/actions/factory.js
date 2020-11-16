import { Recipe } from './recipe'
import { Spell } from './spell'
import { TomeSpell } from './tome-spell'

export class ActionFactory {
  static create (inputs) {
    const type = inputs[1]
    if (type === 'CAST' || type === 'OPPONENT_CAST') {
      return new Spell(inputs)
    } else if (type === 'LEARN') {
      return new TomeSpell(inputs)
    } else if (type === 'BREW') return new Recipe(inputs)
    return { type }
  }
}
