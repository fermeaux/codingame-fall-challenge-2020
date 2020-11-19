class Resolver {
  resolve (rootContext) {
    const startDate = new Date()
    let paths = rootContext.seekPaths()
    let turn = 0
    while (new Date() - startDate < 40) {
      const nextPaths = []
      for (let pathIndex = 0; pathIndex < paths.length && new Date() - startDate < 40; pathIndex++) {
        const path = paths[pathIndex]
        path.simulate()
        nextPaths.push(...path.seekPaths())
        // if (path.myAction === 'BREW') {}
      }
      paths = nextPaths
      turn++
      console.error(`${turn}) time`, new Date() - startDate)
    }
    rootContext.children[Math.floor(Math.random() * Math.floor(rootContext.children.length))].myAction.apply()
  }
}

export const resolver = new Resolver()
