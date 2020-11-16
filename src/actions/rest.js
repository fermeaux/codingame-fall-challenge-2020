import { Action } from './action'
import { RestCommand } from '../commands'

export class Rest extends Action {
  apply () {
    new RestCommand().apply()
  }

  score () {
    return 0.5
  }
}
