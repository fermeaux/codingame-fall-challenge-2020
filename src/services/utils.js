export function cloneObj (obj) {
  return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
}
