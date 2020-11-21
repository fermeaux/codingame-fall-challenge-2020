import { Wait } from '../entities/actions'
import { globalState } from './global-state'

class Resolver {
  resolve (rootContext) {
    this.brewPossibilities = {}
    rootContext.seekPaths()
    const queue = [...rootContext.children]
    const startDate = new Date()
    let count = 0
    while (queue.length > 0 && new Date() - startDate < rootContext.timeThreshold) {
      const node = queue.shift()
      this.checkGoal(node)
      node.simulate()
      queue.push(...node.children)
      count++
    }
    console.error(count)
    console.error(this.brewPossibilities)
    this.selectAction(rootContext).apply()
  }

  checkGoal (node) {
    if (node.myAction.type !== 'BREW') return
    if (!this.brewPossibilities[node.myAction.id]) this.brewPossibilities[node.myAction.id] = {}
    const round = node.nbTurn - globalState.turn
    if (!this.brewPossibilities[node.myAction.id][round]) this.brewPossibilities[node.myAction.id][round] = []
    this.brewPossibilities[node.myAction.id][round].push(node)
  }

  selectAction (rootContext) {
    if (rootContext.children.length === 0) return new Wait()
    const bestBrew = { ctx: null, score: -1 }
    Object.keys(this.brewPossibilities).forEach(brewId => {
      const brewPossibility = this.brewPossibilities[brewId]
      const nbTurn = Object.keys(brewPossibility)[0]
      const context = brewPossibility[nbTurn][0]
      // eslint-disable-next-line eqeqeq
      const client = rootContext.clients.find(client => client.id == brewId)
      const score = client.price / nbTurn
      console.error(score)
      if (score > bestBrew.score) {
        bestBrew.score = score
        bestBrew.ctx = context
      }
    })
    if (bestBrew.ctx) return bestBrew.ctx.getRoot().myAction
    return rootContext.children[Math.floor(Math.random() * Math.floor(rootContext.children.length))].myAction
  }
}

export const resolver = new Resolver()
