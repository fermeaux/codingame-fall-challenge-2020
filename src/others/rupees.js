export class Rupees {
  constructor (rupees) {
    this.rupees = rupees
  }

  count () {
    return this.rupees.reduce((prev, current) => {
      return prev + current
    }, 0)
  }

  firstPositive () {
    return this.rupees.findIndex(rupee => rupee > 0)
  }

  lastNegative () {
    return this.rupees.reduce((prev, current, index) => {
      return current < 0 ? index : prev
    }, -1)
  }

  get (index) {
    return this.rupees[index]
  }
}
