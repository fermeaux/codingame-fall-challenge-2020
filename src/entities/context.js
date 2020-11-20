import { database } from '../services/database'
import { globalState } from '../services/global-state'
import { cloneObj } from '../services/utils'

export class Context {
  constructor ({ me, you, clients, tomes }) {
    this.me = me
    this.you = you
    this.clients = clients
    this.tomes = tomes
    this.nbTurn = globalState.turn
    this.winRate = 0
  }

  simulate () {
    this.myAction.simulate(this.me)
    this.yourAction.simulate(this.you)
    this.replaceClients()
    this.replaceTomes()
    this.seekPaths()
    this.computeWinRate()
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
    if (this.myAction.type !== 'LEARN' && this.yourAction.type !== 'LEARN') return
    const myTax = this.myAction.type === 'LEARN' ? this.myAction.tomeIndex : 0
    const yourTax = this.yourAction.type === 'LEARN' ? this.yourAction.tomeIndex : 0
    this.tomes = this.tomes.filter(tomes => !tomes.learned)
    while (this.tomes.length < 6) {
      const newTome = database.pickTome()
      if (!newTome) break
      this.tomes.push(newTome)
    }
    for (let i = 0; i < this.tomes.length; i++) {
      this.tomes[i].tomeIndex = i
      if (myTax > i) this.tomes[i].taxCount += 1
      if (yourTax > i) this.tomes[i].taxCount += 1
    }
  }

  seekPaths () {
    if (this.isEnd()) {
      console.error('found end game')
      this.children = []
      globalState.finalPaths.push(this)
      return
    }
    const myActions = this.me.seekAvailableActions(this)
    const yourActions = this.you.seekAvailableActions(this)
    this.createChildren(myActions, yourActions)
  }

  createChildren (myActions, yourActions) {
    this.children = myActions.reduce((prev, myAction) => {
      yourActions.forEach(yourAction => prev.push(this.cloneWithActions(myAction, yourAction)))
      return prev
    }, [])
  }

  cloneWithActions (myAction, yourAction) {
    const clone = this.clone()
    clone.myAction = myAction
    clone.yourAction = yourAction
    clone.parent = this
    clone.nbTurn++
    return clone
  }

  computeWinRate () {
    const myScore = this.me.getScore()
    const yourScore = this.you.getScore()
    const isEnd = this.isEnd()
    if (myScore > yourScore && isEnd) this.winRate = 1
    else if (myScore > yourScore) this.winRate = 0.75
    else if (myScore === yourScore) this.winRate = 0.5
    else if (myScore < yourScore) this.winRate = 0.25
    else if (myScore < yourScore && isEnd) this.winRate = 0
  }

  isEnd () {
    return this.me.nbClientDone >= 6 || this.you.nbClientDone >= 6 || globalState.nbTurn === 100
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
    clone.you = this.you.clone()
    clone.clients = this.clients.clone()
    clone.tomes = this.tomes.clone()
    return clone
  }
}
