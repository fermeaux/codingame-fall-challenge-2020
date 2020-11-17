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
}
