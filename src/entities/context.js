import { database } from '../services/database'
import { globalState } from '../services/global-state'

export class Context {
  constructor ({ me, clients, tomes, nbTurn }) {
    this.me = me
    this.clients = clients
    this.tomes = tomes
    this.nbTurn = nbTurn || globalState.turn
  }

  simulate () {
    this.myAction.simulate(this.me)
    this.checkGoal()
    this.replaceClients()
    this.replaceTomes()
    this.seekPaths()
  }

  checkGoal () {
    if (globalState.bestContext && globalState.bestContext.myAction.type === 'BREW' && this.myAction.type !== 'BREW') return
    this.computeScore()
    if (!globalState.bestContext ||
        (this.myAction.type === 'BREW' && globalState.bestContext.myAction.type !== 'BREW') ||
        this.score > globalState.bestContext.score) {
      globalState.bestContext = this
    }
  }

  computeScore () {
    const scoreAction = this.myAction.computeScore(this)
    this.score *= this.getTurnSimulated() - 1
    this.score = scoreAction / this.getTurnSimulated()
  }

  replaceClients () {
    this.clients = this.clients.filter(client => !client.brewed)
    while (this.clients.length < 5) {
      const newClient = database.pickClient()
      if (!newClient) break
      this.clients.push(newClient)
    }
  }

  replaceTomes () {
    if (this.myAction.type !== 'LEARN') return
    const myTax = this.myAction.type === 'LEARN' ? this.myAction.tomeIndex : 0
    this.tomes = this.tomes.filter(tomes => !tomes.learned)
    while (this.tomes.length < 6) {
      const newTome = database.pickTome()
      if (!newTome) break
      this.tomes.push(newTome)
    }
    for (let i = 0; i < this.tomes.length; i++) {
      this.tomes[i].tomeIndex = i
      if (myTax > i) this.tomes[i].taxCount += 1
    }
  }

  seekPaths () {
    if (this.isEnd()) {
      this.children = []
      return
    }
    const myActions = this.me.seekAvailableActions(this)
    this.children = myActions.map(myAction => ({ ctx: this, action: myAction }))
  }

  isEnd () {
    return this.me.nbClientDone >= 6 || globalState.nbTurn === 100
  }

  cloneWithAction (myAction) {
    const startDate = new Date().getTime()
    const clone = this.clone()
    globalState.cloneTime = globalState.cloneTime + new Date().getTime() - startDate
    clone.myAction = myAction
    clone.nbTurn++
    return clone
  }

  clone () {
    const clone = new Context({
      me: this.me.clone(),
      clients: this.clients,
      tomes: this.tomes.map(tome => tome.clone()),
      nbTurn: this.nbTurn
    })
    clone.root = this.root ? this.root : clone
    return clone
  }

  getTurnSimulated () {
    return this.root.nbTurn - 1 + this.nbTurn
  }
}
