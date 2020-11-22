const currencies = [1, 3, 5, 7]

export class Recipe {
  constructor (ingredients) {
    this.ingredients = ingredients
  }

  count () {
    return this.ingredients.reduce((prev, current) => {
      return prev + current
    }, 0)
  }

  get (index) {
    return this.ingredients[index]
  }

  substract (other) {
    this.ingredients = this.ingredients.map((ingredient, index) => {
      const otherIngredient = other[index]
      if (otherIngredient < 0) return ingredient + other[index]
      return ingredient
    })
  }

  add (other) {
    this.ingredients = this.ingredients.map((ingredient, index) => {
      const otherIngredient = other[index]
      if (otherIngredient > 0) return ingredient + other[index]
      return ingredient
    })
  }

  clone () {
    const clone = this
    clone.ingredients = [...this.ingredients]
    return clone
  }

  computeScore () {
    return this.ingredients.reduce((prev, current, index) => prev + current * currencies[index], 0)
  }
}
