export const useLocalStorage = () => {
  function get (item: string) {
    return JSON.parse(localStorage.getItem(item)!)
  }

  function save (name: string, data: object) {
    localStorage.setItem(name, JSON.stringify(data))
  }

  function remove (target: string) {
    localStorage.removeItem(target)
  }

  return { get, save, remove }
}