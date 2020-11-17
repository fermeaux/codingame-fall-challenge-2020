class Resolver {
  resolve (rootContext) {
    const { myActions, yourActions } = rootContext.seekAvailableActions()
    console.error('My actions', myActions)
    console.error('Your actions', yourActions)
    if (myActions.length === 0) return console.log('WAIT')
    myActions[Math.floor(Math.random() * Math.floor(myActions.length))].apply()
  }
}

export const resolver = new Resolver()
