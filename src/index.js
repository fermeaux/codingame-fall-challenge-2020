import { parser, resolver } from './services'

while (true) {
  const rootContext = parser.parse()
  resolver.resolve(rootContext)
}
