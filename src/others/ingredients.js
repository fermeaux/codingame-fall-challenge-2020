import { INGREDIENTS } from './currency'

export class Ingredients {
  constructor (ingredients) {
    this.ingredients = ingredients
  }

  count () {
    return this.ingredients.reduce((prev, current) => {
      return prev + current
    }, 0)
  }

  firstPositive () {
    return this.ingredients.findIndex(ingredient => ingredient > 0)
  }

  lastNegative () {
    return this.ingredients.reduce((prev, current, index) => {
      return current < 0 ? index : prev
    }, -1)
  }

  get (index) {
    return this.ingredients[index]
  }

  score () {
    return this.ingredients.reduce((prev, current, index) => {
      return prev + current * INGREDIENTS[index]
    }, 0)
  }

  fillMissingWith (other) {
    const deltas = this.ingredients.map((ingredient, index) => {
      const missing = other.get(index) + ingredient
      return missing > 0 ? 0 : missing
    })
    return new Ingredients(deltas)
  }
}
