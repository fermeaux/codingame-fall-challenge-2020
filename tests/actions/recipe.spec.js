import test from 'ava'
import { Recipe } from '../../src/actions'
import { inputs } from './_inputs'

test('Recipe#score works with postive values', t => {
  const recipe = new Recipe(inputs({ deltas: [1, 2, 2, 1], price: 12, type: 'BREW' }))
  t.is(recipe.score(), 1)
})
