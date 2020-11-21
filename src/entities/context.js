import { database } from '../services/database'
import { globalState } from '../services/global-state'
import { cloneObj } from '../services/utils'

export class Context {
  constructor ({ me, clients, tomes }) {
    this.me = me
    this.clients = clients
    this.tomes = tomes
    this.nbTurn = globalState.turn
    this.timeThreshold = this.nbTurn > 0 ? 40 : 950
  }

  simulate () {
    this.myAction.simulate(this.me)
    this.replaceClients()
    this.replaceTomes()
    this.seekPaths()
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
      console.error('found end game')
      this.children = []
      return
    }
    const myActions = this.me.seekAvailableActions(this)
    this.children = myActions.map(myAction => this.cloneWithAction(myAction))
  }

  cloneWithAction (myAction) {
    const clone = this.clone()
    clone.myAction = myAction
    clone.parent = this
    clone.nbTurn++
    return clone
  }

  isEnd () {
    return this.me.nbClientDone >= 6 || globalState.nbTurn === 100
  }

  getRoot () {
    let root = this
    while (root.nbTurn > globalState.turn + 1) {
      root = root.parent
    }
    return root
  }

  clone () {
    const clone = cloneObj(this)
    clone.me = this.me.clone()
    clone.clients = this.clients.map(client => client.clone())
    clone.tomes = this.tomes.map(tome => tome.clone())
    return clone
  }

  toString () {
    const root = this.getRoot()
    return `${this.myAction.type} ${this.myAction.id} / ${root.myAction.type} ${root.myAction.id}`
  }
}
