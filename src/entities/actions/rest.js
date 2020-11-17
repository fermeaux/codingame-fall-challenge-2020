import { Action } from './action'

export class Rest extends Action {
  constructor () {
    super('REST')
  }

  apply () {
    console.log(this.type)
  }
}
