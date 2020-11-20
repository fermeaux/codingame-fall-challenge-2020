import { globalState } from './global-state'

class Resolver {
  resolve (rootContext) {
    const startDate = new Date()
    const nbTime = globalState.turn === 1 ? 950 : 40
    rootContext.seekPaths()
    let paths = rootContext.children
    let nextPaths = []
    let turn = globalState.turn
    while (new Date() - startDate < nbTime) {
      turn++
      nextPaths = []
      for (let pathIndex = 0; pathIndex < paths.length && new Date() - startDate < nbTime; pathIndex++) {
        const path = paths[pathIndex]
        path.simulate()
        nextPaths.push(...path.children)
      }
      globalState.lastPaths = paths
      paths = nextPaths
      console.error(`${turn}) time`, new Date() - startDate)
    }
    this.computeWinRate(rootContext)
    // console.error(rootContext.children.map(child => `${child.winRate} ${child.myAction.type} ${child.myAction.id}`))
    const bestAction = this.selectAction(rootContext)
    bestAction.apply()
  }

  computeWinRate (rootContext) {
    [...globalState.finalPaths, ...globalState.lastPaths].forEach(path => {
      path.getRoot().totalWinRate += path.winRate
      path.getRoot().finalChildrenCount++
    })
    rootContext.children.forEach(path => {
      path = path.totalWinRate / path.finalChildrenCount
    })
  }

  selectAction (rootContext) {
    const grouped = this.groupContextByAction(rootContext)
    let bestCtx = null
    Object.keys(grouped).forEach(key => {
      if (!bestCtx || grouped[key].bestWinRateCtx.winRate > bestCtx.winRate) {
        bestCtx = grouped[key].bestWinRateCtx
      }
    })
    // console.error(Object.keys(grouped).map(key => `${key} ${grouped[key].contexts.map(ctx => ctx.winRate)}`))
    console.error(grouped)
    return bestCtx.myAction
  }

  groupContextByAction (rootContext) {
    return rootContext.children.reduce((prev, current) => {
      const key = `${current.myAction.type} ${current.myAction.id}`
      if (!prev[current[key]]) prev[current[key]] = { bestWinRateCtx: null, contexts: [] }
      prev[current[key]].contexts.push(current)
      if (!prev[current[key]].bestWinRateCtx || current.winRate > prev[current[key]].bestWinRateCtx.winRate) {
        prev[current[key]].bestWinRateCtx = current
      }
      return prev
    }, {})
  }
}

export const resolver = new Resolver()
