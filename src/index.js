import { globalState, parser, resolver } from './services'

while (true) {
  const rootContext = parser.parse()
  resolver.resolve(rootContext)
  globalState.turn++
}
