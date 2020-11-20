class GlobalState {
  constructor () {
    this.turn = 0
    this.lastPaths = []
    this.finalPaths = []
  }
}

export const globalState = new GlobalState()
