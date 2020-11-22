class GlobalState {
  constructor () {
    // TODO rootContext Here
    this.turn = 0
    this.nbClientDone = 0
  }

  reset () {
    this.cloneTime = 0
    this.bestContext = null
  }
}

export const globalState = new GlobalState()
