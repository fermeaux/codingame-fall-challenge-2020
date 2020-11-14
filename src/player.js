export class Player {
  constructor (inputs, spells) {
    this.inv = [
      parseInt(inputs[0]),
      parseInt(inputs[1]),
      parseInt(inputs[2]),
      parseInt(inputs[3])
    ]
    this.score = parseInt(inputs[4]) // amount of rupees
    this.spells = spells
    this.nbRupees = this.inv.reduce((prev, current) => {
      return prev + current
    }, 0)
  }

  parse () {
    this.spells.forEach((spell) => spell.parse(this))
  }
}
