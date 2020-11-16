import { INGREDIENTS } from './currency'

export function recipeScore (ingredients, price) {
  return price / (ingredients.score() + computeRestTime(ingredients) + 1)
}

export function spellScore (ingredients) {
  return ingredients.score()
}

export function tomeScore (ingredients, taxCount, index) {
  return ingredients.score() + INGREDIENTS[0] * (taxCount - index)
}

export function computeRestTime (ingredients) {
  return ingredients.reduce((prev, current, index) => {
    if (current < 0) {
      if (index === 0) {
        current /= 2
      }
      return prev - current
    }
    return prev
  }, 0)
}

// export function fillMissingIngredientsWith (input, output) {
//   input.ingredients.forEach((inputIngredient, index) => {
//     const outputIngredient = output.get(index)
//     let delta = inputIngredient + outputIngredient
//     if (delta > 0) {
//       input.ingredients[index] = input.ingredients[index] - delta
//       delta = 0
//     } else {
//       input.ingredients[index] = 0
//     }
//     output.ingredients[index] = delta
//   })
// }

export function fillMissingIngredientsWith (input, output) {
  output.ingredients = input.ingredients.map((inputIngredient, index) => {
    const delta = inputIngredient + output.get(index)
    return delta > 0 ? 0 : delta
  })
}
