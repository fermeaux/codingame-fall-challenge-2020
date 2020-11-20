import { globalState, parser, resolver } from './services'

while (true) {
  globalState.turn++
  const rootContext = parser.parse()
  resolver.resolve(rootContext)
}
