import { Brew } from './brew.js'
import { Cast } from './cast'
import { Learn } from './learn'

export class ActionFactory {
  static create (inputs) {
    const type = inputs[1]
    if (type === 'CAST' || type === 'OPPONENT_CAST') return new Cast(inputs)
    else if (type === 'LEARN') return new Learn(inputs)
    else if (type === 'BREW') return new Brew(inputs)
    return { type }
  }
}
