import test from 'ava'
import { Rupees } from '../../src/others/rupees'

test('Rupees#count works with positive values', t => {
  const rupees = new Rupees([1, 2, 3, 4])
  t.is(rupees.count(), 10)
})

test('Rupees#count works with negative values', t => {
  const rupees = new Rupees([1, 2, -3, -4])
  t.is(rupees.count(), -4)
})

test('Rupees#firstPositive works with multiple positive values', t => {
  const rupees = new Rupees([-1, 2, 3, 0])
  t.is(rupees.firstPositive(), 1)
})

test('Rupees#firstPositive works without positive value', t => {
  const rupees = new Rupees([-1, -2, -3, 0])
  t.is(rupees.firstPositive(), -1)
})

test('Rupees#lastNegative works with multiple negative values', t => {
  const rupees = new Rupees([-1, 2, -3, 0])
  t.is(rupees.lastNegative(), 2)
})

test('Rupees#lastNegative works without negative value', t => {
  const rupees = new Rupees([1, 2, 3, 0])
  t.is(rupees.lastNegative(), -1)
})
