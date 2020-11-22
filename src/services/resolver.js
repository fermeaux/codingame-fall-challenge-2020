import { globalState } from './global-state'

class Resolver {
  resolve (rootContext) {
    const startDate = new Date().getTime()
    rootContext.seekPaths()
    const queue = [...rootContext.children]
    const timeThreshold = globalState.turn === 0 ? 950 : 40
    let count = 0
    while (queue.length > 0 && new Date().getTime() - startDate < timeThreshold) {
      let node = queue.shift()
      node = node.ctx.cloneWithAction(node.action)
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
