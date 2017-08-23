import Tree from '../'

function main() {
  const t = new Tree<number, number>()
  t.insert(5)
  t.insert(-10)
  t.insert(0)
  t.insert(33)
  t.insert(2)

  // Assert Type
  const keys: number[] = t.keys() // [-10, 0, 2, 5, 33]
  const values: number[] = t.values()
  const size: number = t.size   // 5
  const min: number = t.min()  // -10
  const max: number = t.max()  // -33

  t.remove(0)
  t.size   // 4
}

function customComparator() {
  const t = new Tree<number, number>((a, b) => b - a)
  t.insert(5)
  t.insert(-10)
  t.insert(0)
  t.insert(33)
  t.insert(2)

  // Assert Type
  const keys: number[] = t.keys() // [33, 5, 2, 0, -10]
  const values: number[] = t.values() // [33, 5, 2, 0, -10]
}

function bulkInsert() {
  const t = new Tree<number, string>()
  t.load([3, 2, -10, 20], ['C', 'B', 'A', 'D'])

  // Assert Type
  const keys: number[] = t.keys()   // [-10, 2, 3, 20]
  const values: string[] = t.values() // ['A', 'B', 'C', 'D']
}