import { database } from '../services/database'

export class Context {
  constructor ({ me, you, clients, tomes, parent }) {
    this.me = me
    this.you = you
    this.clients = clients
    this.tomes = tomes
    this.parent = parent
  }

  seekPaths () {
    const myActions = this.me.seekAvailableActions(this)
    const yourActions = this.you.seekAvailableActions(this)
    this.createChildren(myActions, yourActions)
    return this.children
  }

  createChildren (myActions, yourActions) {
    this.children = myActions.reduce((prev, myAction) => {
      yourActions.forEach(yourAction => prev.push(this.cloneWithActions(myAction, yourAction)))
      return prev
    }, [])
  }

  cloneWithActions (myAction, yourAction) {
    const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    clone.myAction = myAction
    clone.yourAction = yourAction
    clone.me = Object.assign(Object.create(Object.getPrototypeOf(this.me)), this.me)
    clone.me.spells = Object.assign(Object.create(Object.getPrototypeOf(this.me.spells)), this.me.spells)
    clone.you = Object.assign(Object.create(Object.getPrototypeOf(this.you)), this.you)
    clone.you.spells = Object.assign(Object.create(Object.getPrototypeOf(this.you.spells)), this.you.spells)
    clone.parent = this
    return clone
  }

  simulate () {
    this.myAction.simulate(this.me)
    this.yourAction.simulate(this.you)
    this.replaceClients()
    this.replaceTomes()
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
}
