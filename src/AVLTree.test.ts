import { AVLTree } from "./AVLTree";

describe("AVLTree", () => {
  it("size", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.size).toEqual(0);
    tree.set(0, "a");
    expect(tree.size).toEqual(1);
    tree.set(1, "b");
    expect(tree.size).toEqual(2);
    tree.set(3, "d");
    expect(tree.size).toEqual(3);
    tree.set(2, "c");
    expect(tree.size).toEqual(4);
    tree.set(0, "x");
    expect(tree.size).toEqual(4);
  });

  it("clear()", () => {
    const tree = new AVLTree<number, string>();
    tree.set(0, "a");
    tree.set(1, "b");
    tree.set(2, "c");
    tree.clear();
    expect(tree.size).toEqual(0);
    expect(tree.has(0)).toEqual(false);
  });

  it("keys()", () => {
    const tree = new AVLTree<number, string>();
    expect(Array.from(tree.keys())).toEqual([]);
    tree.set(0, "a");
    tree.set(2, "c");
    tree.set(1, "b");
    expect(Array.from(tree.keys())).toEqual([0, 1, 2]);
    tree.clear();
    expect(Array.from(tree.keys())).toEqual([]);
  });

  it("values()", () => {
    const tree = new AVLTree<number, string>();
    expect(Array.from(tree.values())).toEqual([]);
    tree.set(1, "b");
    tree.set(2, "c");
    tree.set(0, "a");
    expect(Array.from(tree.values())).toEqual(["a", "b", "c"]);
    tree.clear();
    expect(Array.from(tree.values())).toEqual([]);
  });

  it("entries()", () => {
    const tree = new AVLTree<number, string>();
    expect(Array.from(tree.entries())).toEqual([]);
    tree.set(1, "b");
    tree.set(0, "a");
    tree.set(2, "c");
    expect(Array.from(tree.entries())).toEqual([
      [0, "a"],
      [1, "b"],
      [2, "c"],
    ]);
    tree.clear();
    expect(Array.from(tree.entries())).toEqual([]);
  });

  it("minEntry()", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.minEntry()).toBeUndefined();
    tree.set(2, "c");
    expect(tree.minEntry()).toEqual([2, "c"]);
    tree.set(3, "d");
    expect(tree.minEntry()).toEqual([2, "c"]);
    tree.set(1, "b");
    expect(tree.minEntry()).toEqual([1, "b"]);
    tree.set(100, "100");
    expect(tree.minEntry()).toEqual([1, "b"]);
    tree.delete(1);
    expect(tree.minEntry()).toEqual([2, "c"]);
    tree.delete(2);
    expect(tree.minEntry()).toEqual([3, "d"]);
    tree.delete(3);
    expect(tree.minEntry()).toEqual([100, "100"]);
    tree.delete(100);
    expect(tree.minEntry()).toBeUndefined();
  });

  it("maxEntry()", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.maxEntry()).toBeUndefined();
    tree.set(2, "c");
    expect(tree.maxEntry()).toEqual([2, "c"]);
    tree.set(3, "d");
    expect(tree.maxEntry()).toEqual([3, "d"]);
    tree.set(1, "b");
    expect(tree.maxEntry()).toEqual([3, "d"]);
    tree.set(100, "100");
    expect(tree.maxEntry()).toEqual([100, "100"]);
    tree.delete(100);
    expect(tree.maxEntry()).toEqual([3, "d"]);
    tree.delete(3);
    expect(tree.maxEntry()).toEqual([2, "c"]);
    tree.delete(2);
    expect(tree.maxEntry()).toEqual([1, "b"]);
    tree.delete(1);
    expect(tree.maxEntry()).toBeUndefined();
  });

  it("minKey()", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.minKey()).toBeUndefined();
    tree.set(2, "c");
    expect(tree.minKey()).toEqual(2);
    tree.set(3, "d");
    expect(tree.minKey()).toEqual(2);
    tree.set(1, "b");
    expect(tree.minKey()).toEqual(1);
    tree.set(100, "100");
    expect(tree.minKey()).toEqual(1);
    tree.delete(1);
    expect(tree.minKey()).toEqual(2);
    tree.delete(2);
    expect(tree.minKey()).toEqual(3);
    tree.delete(3);
    expect(tree.minKey()).toEqual(100);
    tree.delete(100);
    expect(tree.minKey()).toBeUndefined();
  });

  it("maxKey()", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.maxKey()).toBeUndefined();
    tree.set(2, "c");
    expect(tree.maxKey()).toEqual(2);
    tree.set(3, "d");
    expect(tree.maxKey()).toEqual(3);
    tree.set(1, "b");
    expect(tree.maxKey()).toEqual(3);
    tree.set(100, "100");
    expect(tree.maxKey()).toEqual(100);
    tree.delete(100);
    expect(tree.maxKey()).toEqual(3);
    tree.delete(3);
    expect(tree.maxKey()).toEqual(2);
    tree.delete(2);
    expect(tree.maxKey()).toEqual(1);
    tree.delete(1);
    expect(tree.maxKey()).toBeUndefined();
  });

  it("shift()", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.shift()).toBeUndefined();
    tree.set(2, "c");
    tree.set(3, "d");
    tree.set(1, "b");
    tree.set(100, "100");
    expect(tree.shift()).toEqual([1, "b"]);
    expect(tree.shift()).toEqual([2, "c"]);
    expect(tree.shift()).toEqual([3, "d"]);
    expect(tree.shift()).toEqual([100, "100"]);
    expect(tree.shift()).toBeUndefined();
  });

  it("pop()", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.shift()).toBeUndefined();
    tree.set(2, "c");
    tree.set(3, "d");
    tree.set(1, "b");
    tree.set(100, "100");
    expect(tree.pop()).toEqual([100, "100"]);
    expect(tree.pop()).toEqual([3, "d"]);
    expect(tree.pop()).toEqual([2, "c"]);
    expect(tree.pop()).toEqual([1, "b"]);
    expect(tree.pop()).toBeUndefined();
  });

  it("get()", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.get(2)).toBeUndefined();
    tree.set(2, "c");
    expect(tree.get(2)).toEqual("c");

    tree.delete(2);
    tree.set(3, "d");
    tree.set(1, "b");
    tree.set(100, "100");

    expect(tree.get(1)).toEqual("b");
    expect(tree.get(2)).toBeUndefined();
    expect(tree.get(3)).toEqual("d");
    expect(tree.get(100)).toEqual("100");

    tree.delete(3);
    expect(tree.get(3)).toBeUndefined();

    tree.clear();
    expect(tree.get(1)).toBeUndefined();
    expect(tree.get(100)).toBeUndefined();
  });

  it("has()", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.has(2)).toEqual(false);
    tree.set(2, "c");
    expect(tree.has(2)).toEqual(true);

    tree.delete(2);
    tree.set(3, "d");
    tree.set(1, "b");
    tree.set(100, "100");
    tree.set(101, "101");
    tree.delete(101);

    expect(tree.has(1)).toEqual(true);
    expect(tree.has(2)).toEqual(false);
    expect(tree.has(3)).toEqual(true);
    expect(tree.has(100)).toEqual(true);
    expect(tree.has(101)).toEqual(false);

    tree.delete(3);
    expect(tree.has(3)).toEqual(false);

    tree.clear();
    expect(tree.has(1)).toEqual(false);
    expect(tree.has(100)).toEqual(false);
  });

  it("forEach", () => {
    const tree = new AVLTree<number, string>();

    tree.set(2, "c");
    tree.delete(2);
    tree.set(3, "d");
    tree.set(1, "b");
    tree.set(100, "100");

    let count = 0;
    tree.forEach((value, key, curTree) => {
      expect(curTree).toBe(tree);
      let expectedKey: number;
      let expectedValue: string;
      if (count === 0) {
        expectedKey = 1;
        expectedValue = "b";
      } else if (count === 1) {
        expectedKey = 3;
        expectedValue = "d";
      } else if (count === 2) {
        expectedKey = 100;
        expectedValue = "100";
      } else {
        throw new Error("forEach called too many times");
      }
      ++count;
      expect(key).toEqual(expectedKey);
      expect(value).toEqual(expectedValue);
    });

    expect(count).toEqual(3);
  });

  it("range", () => {
    const tree = new AVLTree<number, string>();

    tree.set(2, "c");
    tree.delete(2);
    tree.set(3, "d");
    tree.set(1, "b");
    tree.set(100, "100");

    let count = 0;
    tree.range(0, 100, (value, key, curTree) => {
      expect(curTree).toBe(tree);
      let expectedKey: number;
      let expectedValue: string;
      if (count === 0) {
        expectedKey = 1;
        expectedValue = "b";
      } else if (count === 1) {
        expectedKey = 3;
        expectedValue = "d";
      } else if (count === 2) {
        expectedKey = 100;
        expectedValue = "100";
      } else {
        throw new Error("range(0, 100) called too many times");
      }
      ++count;
      expect(key).toEqual(expectedKey);
      expect(value).toEqual(expectedValue);
    });
    expect(count).toEqual(3);

    count = 0;
    tree.range(3, 100, (value, key, curTree) => {
      expect(curTree).toBe(tree);
      let expectedKey: number;
      let expectedValue: string;
      if (count === 0) {
        expectedKey = 3;
        expectedValue = "d";
      } else if (count === 1) {
        expectedKey = 100;
        expectedValue = "100";
      } else {
        throw new Error("range(0, 100) called too many times");
      }
      ++count;
      expect(key).toEqual(expectedKey);
      expect(value).toEqual(expectedValue);
    });
    expect(count).toEqual(2);

    count = 0;
    tree.range(3, 99, (value, key, curTree) => {
      expect(curTree).toBe(tree);
      if (count > 0) {
        throw new Error("range(0, 100) called too many times");
      }
      expect(key).toEqual(3);
      expect(value).toEqual("d");
      ++count;
    });
    expect(count).toEqual(1);
  });

  it("findLessThan", () => {
    const tree = new AVLTree<number, string>();

    expect(tree.findLessThan(100)).toBeUndefined();
    tree.set(2, "c");
    expect(tree.findLessThan(100)).toEqual([2, "c"]);
    expect(tree.findLessThan(2)).toBeUndefined();
    tree.delete(2);
    expect(tree.findLessThan(100)).toBeUndefined();
    tree.set(3, "d");
    expect(tree.findLessThan(100)).toEqual([3, "d"]);
    expect(tree.findLessThan(3)).toBeUndefined();
    tree.set(1, "b");
    expect(tree.findLessThan(100)).toEqual([3, "d"]);
    tree.set(50, "50");
    expect(tree.findLessThan(100)).toEqual([50, "50"]);
    expect(tree.findLessThan(1)).toBeUndefined();

    tree.set(100, "100");
    tree.set(101, "101");
    tree.set(102, "102");

    expect(tree.findLessThan(100)).toEqual([50, "50"]);
    expect(tree.findLessThan(0)).toBeUndefined();
    expect(tree.findLessThan(101)).toEqual([100, "100"]);
    expect(tree.findLessThan(102)).toEqual([101, "101"]);
    expect(tree.findLessThan(103)).toEqual([102, "102"]);
  });

  it("findLessThanOrEqual", () => {
    const tree = new AVLTree<number, string>();

    expect(tree.findLessThanOrEqual(100)).toBeUndefined();
    tree.set(2, "c");
    expect(tree.findLessThanOrEqual(100)).toEqual([2, "c"]);
    expect(tree.findLessThanOrEqual(2)).toEqual([2, "c"]);
    tree.delete(2);
    expect(tree.findLessThanOrEqual(100)).toBeUndefined();
    tree.set(3, "d");
    expect(tree.findLessThanOrEqual(100)).toEqual([3, "d"]);
    expect(tree.findLessThanOrEqual(3)).toEqual([3, "d"]);
    tree.set(1, "b");
    expect(tree.findLessThanOrEqual(100)).toEqual([3, "d"]);
    tree.set(50, "50");
    expect(tree.findLessThanOrEqual(100)).toEqual([50, "50"]);
    expect(tree.findLessThanOrEqual(1)).toEqual([1, "b"]);
    expect(tree.findLessThanOrEqual(0)).toBeUndefined();

    tree.set(100, "100");
    tree.set(101, "101");
    tree.set(102, "102");

    expect(tree.findLessThanOrEqual(100)).toEqual([100, "100"]);
    expect(tree.findLessThanOrEqual(0)).toBeUndefined();
    expect(tree.findLessThanOrEqual(101)).toEqual([101, "101"]);
    expect(tree.findLessThanOrEqual(102)).toEqual([102, "102"]);
    expect(tree.findLessThanOrEqual(103)).toEqual([102, "102"]);
  });

  it("findGreaterThan", () => {
    const tree = new AVLTree<number, string>();

    expect(tree.findGreaterThan(0)).toBeUndefined();
    tree.set(2, "c");
    expect(tree.findGreaterThan(0)).toEqual([2, "c"]);
    tree.delete(2);
    expect(tree.findGreaterThan(0)).toBeUndefined();
    tree.set(3, "d");
    expect(tree.findGreaterThan(0)).toEqual([3, "d"]);
    expect(tree.findGreaterThan(3)).toBeUndefined();
    tree.set(1, "b");
    expect(tree.findGreaterThan(0)).toEqual([1, "b"]);
    expect(tree.findGreaterThan(1)).toEqual([3, "d"]);
    expect(tree.findGreaterThan(3)).toBeUndefined();
    tree.set(50, "50");
    expect(tree.findGreaterThan(25)).toEqual([50, "50"]);

    tree.set(100, "100");
    tree.set(101, "101");
    tree.set(102, "102");

    expect(tree.findGreaterThan(0)).toEqual([1, "b"]);
    expect(tree.findGreaterThan(100)).toEqual([101, "101"]);
    expect(tree.findGreaterThan(101)).toEqual([102, "102"]);
    expect(tree.findGreaterThan(102)).toBeUndefined();
  });

  it("findGreaterThanOrEqual", () => {
    const tree = new AVLTree<number, string>();

    expect(tree.findGreaterThanOrEqual(0)).toBeUndefined();
    tree.set(2, "c");
    expect(tree.findGreaterThanOrEqual(0)).toEqual([2, "c"]);
    tree.delete(2);
    expect(tree.findGreaterThanOrEqual(0)).toBeUndefined();
    tree.set(3, "d");
    expect(tree.findGreaterThanOrEqual(0)).toEqual([3, "d"]);
    expect(tree.findGreaterThanOrEqual(3)).toEqual([3, "d"]);
    tree.set(1, "b");
    expect(tree.findGreaterThanOrEqual(0)).toEqual([1, "b"]);
    expect(tree.findGreaterThanOrEqual(1)).toEqual([1, "b"]);
    expect(tree.findGreaterThanOrEqual(3)).toEqual([3, "d"]);
    expect(tree.findGreaterThanOrEqual(4)).toBeUndefined();

    tree.set(100, "100");
    tree.set(101, "101");
    tree.set(102, "102");

    expect(tree.findGreaterThanOrEqual(0)).toEqual([1, "b"]);
    expect(tree.findGreaterThanOrEqual(100)).toEqual([100, "100"]);
    expect(tree.findGreaterThanOrEqual(101)).toEqual([101, "101"]);
    expect(tree.findGreaterThanOrEqual(102)).toEqual([102, "102"]);
    expect(tree.findGreaterThanOrEqual(103)).toBeUndefined();
  });

  it("toString", () => {
    const tree = new AVLTree<number, string>();
    expect(tree.toString()).toEqual("");

    tree.set(2, "c");
    expect(tree.toString()).toEqual("└── 2");
    tree.set(3, "d");
    expect(tree.toString()).toEqual("└── 2\n    └── 3");
    tree.set(1, "b");
    expect(tree.toString()).toEqual(`└── 2
    ├── 1
    └── 3`);
    tree.set(100, "100");
    expect(tree.toString()).toEqual(`└── 2
    ├── 1
    └── 3
        └── 100`);
    tree.set(50, "50");
    expect(tree.toString()).toEqual(`└── 2
    ├── 1
    └── 50
        ├── 3
        └── 100`);
    tree.set(101, "101");
    expect(tree.toString()).toEqual(`└── 50
    ├── 2
    │   ├── 1
    │   └── 3
    └── 100
        └── 101`);
  });
});
