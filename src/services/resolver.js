import { globalState } from './global-state'

class Resolver {
  resolve (rootContext) {
    const startDate = new Date().getTime()
    rootContext.seekPaths()
    if (globalState.turn < 6) {
      const tomesContext = rootContext.children.filter(path => path.action.type === 'LEARN')
      if (tomesContext.length > 0) rootContext.children = tomesContext
    }
    const queue = [...rootContext.children]
    const timeThreshold = globalState.turn === 0 ? 950 : 38
    while (queue.length > 0 && new Date().getTime() - startDate < timeThreshold) {
      let node = queue.shift()
      node = node.ctx.cloneWithAction(node.action)
      node.simulate()
      queue.push(...node.children)
    }
    globalState.bestContext.root.myAction.apply()
  }
}

export const resolver = new Resolver()
