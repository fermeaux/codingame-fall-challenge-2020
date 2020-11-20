export class Action {
  constructor (type) {
    this.type = type
  }

  apply () {
    console.error(this.type)
    console.log(this.type)
  }

  simulate () {}
}
