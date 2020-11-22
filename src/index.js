import { globalState } from './services/global-state'
import { parser } from './services/parser'
import { resolver } from './services/resolver'

while (true) {
  globalState.reset()
  const rootContext = parser.parse()
  resolver.resolve(rootContext)
  globalState.turn++
}
