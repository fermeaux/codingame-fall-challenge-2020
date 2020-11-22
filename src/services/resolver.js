import { globalState } from './global-state'

class Resolver {
  resolve (rootContext) {
    this.brewPossibilities = {}
    rootContext.seekPaths()
    const queue = [...rootContext.children]
    const startDate = new Date().getTime()
    const timeThreshold = globalState.turn === 0 ? 950 : 35
    let count = 0
    while (queue.length > 0 && new Date().getTime() - startDate < timeThreshold) {
      const node = queue.shift()
      node.simulate()
      queue.push(...node.children)
      count++
    }
    console.error(count)
    console.error(`cloneTime: ${globalState.cloneTime}`)
    globalState.bestContext.root.myAction.apply()
  }
}

export const resolver = new Resolver()
