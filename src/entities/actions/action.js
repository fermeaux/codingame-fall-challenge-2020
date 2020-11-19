export class Action {
  constructor (type) {
    this.type = type
  }

  apply () {
    console.log(this.type)
  }

  simulate () {}
}
