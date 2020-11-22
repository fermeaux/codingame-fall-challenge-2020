class GlobalState {
  constructor () {
    this.turn = 0
    this.nbClientDone = 0
    this.canRest = false
  }

  reset () {
    this.bestContext = null
  }
}

export const globalState = new GlobalState()
