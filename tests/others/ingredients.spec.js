import test from 'ava'
import { Ingredients } from '../../src/others/ingredients'

test('Ingredients#count works with positive values', t => {
  const ingredients = new Ingredients([1, 2, 3, 4])
  t.is(ingredients.count(), 10)
})

test('Ingredients#count works with negative values', t => {
  const ingredients = new Ingredients([1, 2, -3, -4])
  t.is(ingredients.count(), -4)
})

test('Ingredients#firstPositive works with multiple positive values', t => {
  const ingredients = new Ingredients([-1, 2, 3, 0])
  t.is(ingredients.firstPositive(), 1)
})

test('Ingredients#firstPositive works without positive value', t => {
  const ingredients = new Ingredients([-1, -2, -3, 0])
  t.is(ingredients.firstPositive(), -1)
})

test('Ingredients#lastNegative works with multiple negative values', t => {
  const ingredients = new Ingredients([-1, 2, -3, 0])
  t.is(ingredients.lastNegative(), 2)
})

test('Ingredients#lastNegative works without negative value', t => {
  const ingredients = new Ingredients([1, 2, 3, 0])
  t.is(ingredients.lastNegative(), -1)
})

test('Ingredients#score works with positive values', t => {
  const ingredients = new Ingredients([1, 2, 3, 4])
  t.is(ingredients.score(), 25)
})

test('Ingredients#score works with negative values', t => {
  const ingredients = new Ingredients([1, 2, 3, -4])
  t.is(ingredients.score(), -3)
})

test('Ingredients#fillMissingWith works with more values', t => {
  const ingredients = new Ingredients([-1, 0, -2, -1])
  const other = new Ingredients([3, 0, 0, 0])
  const res = ingredients.fillMissingWith(other)
  t.deepEqual(res.ingredients, [0, 0, -2, -1])
})

test('Ingredients#fillMissingWith works with less values', t => {
  const ingredients = new Ingredients([-1, 0, -2, -1])
  const other = new Ingredients([0, 0, 1, 0])
  const res = ingredients.fillMissingWith(other)
  t.deepEqual(res.ingredients, [-1, 0, -1, -1])
})

test('Ingredients#fillMissingWith works with too much values', t => {
  const ingredients = new Ingredients([-1, 0, -2, -1])
  const other = new Ingredients([4, 4, 4, 4])
  const res = ingredients.fillMissingWith(other)
  t.deepEqual(res.ingredients, [0, 0, 0, 0])
})
