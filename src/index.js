import { globalState } from './services/global-state'
import { parser } from './services/parser'
import { resolver } from './services/resolver'

while (true) {
  globalState.cloneTime = 0
  const rootContext = parser.parse()
  resolver.resolve(rootContext)
  globalState.turn++
}
