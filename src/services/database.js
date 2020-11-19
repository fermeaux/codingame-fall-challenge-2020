const clients = []
const tomes = []

class Database {
  pickClient () {
    if (clients.length === 0) return null
    const random = Math.floor(Math.random() * clients.length)
    return clients.splice(random, 1)[0]
  }

  pickTome () {
    if (tomes.length === 0) return null
    const random = Math.floor(Math.random() * tomes.length)
    return tomes.splice(random, 1)[0]
  }
}

export const database = new Database()
