export class Context {
  constructor ({ me, you, clients, tomes, parent }) {
    this.me = me
    this.you = you
    this.clients = clients
    this.tomes = tomes
    this.parent = parent
  }

  seekAvailableActions () {
    const myActions = this.me.seekAvailableActions(this)
    const yourActions = this.you.seekAvailableActions(this)
    return { myActions, yourActions }
  }
}
