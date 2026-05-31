import { HashSet } from "./hashset.js";

describe("hashSet (hash)", () => {
    test("key returns same hash everytime", () => {
        const hashSet = new HashSet();
        const key = "Luke";
        const index1 = hashSet.hash(key);
        const index2 = hashSet.hash(key);
        const index3 = hashSet.hash(key);
        expect(index1).toBe(index2);
        expect(index2).toBe(index3);
    })
    test("key returns a value within capacity limits", () => {
        const hashSet = new HashSet();
        const index1 = hashSet.hash("Luke");
        expect(index1).toBeGreaterThanOrEqual(0);
        expect(index1).toBeLessThanOrEqual(hashSet.capacity - 1);

        hashSet.capacity = hashSet.capacity * 2;
        const index2 = hashSet.hash("Han");
        expect(index2).toBeGreaterThanOrEqual(0);
        expect(index2).toBeLessThanOrEqual(hashSet.capacity - 1);

        hashSet.capacity = hashSet.capacity * 2;
        const index3 = hashSet.hash("Leia");
        expect(index3).toBeGreaterThanOrEqual(0);
        expect(index3).toBeLessThanOrEqual(hashSet.capacity - 1);
    })
    test("changing capacity changes hash of same key", () => {
        const hashSet = new HashSet();
        hashSet.capacity = 1;
        const key = "Luke";
        const index1 = hashSet.hash(key);
        hashSet.capacity = 2;
        const index2 = hashSet.hash(key);
        expect(index1).toBe(0);
        expect(index2).toBe(1);
    })
})

describe("hashSet (set)", () => {
    test("key is stored within bucket capacity" , () => {
        const hashSet = new HashSet();
        const key = "Luke";
        hashSet.set(key);
        expect(hashSet.has(key)).toBe(true);
    });
    test("handles collisions correctly when keys produce same hash", () => {
        const hashSet = new HashSet();
        const key1 = "Luke";
        const key2 = "Boba Fett";
        const index1 = hashSet.hash(key1);
        const index2 = hashSet.hash(key2);
        hashSet.set(key1);
        hashSet.set(key2);
        expect(index1).toBe(index2);
        expect(hashSet.buckets[index1].key).toBe("Luke");
        expect(hashSet.buckets[index1].next.key).toBe("Boba Fett");
    })
    test("capacity is doubled when loadFactor is exceeded", () => {
        const hashSet = new HashSet();
        const cap = 16;
        expect(hashSet.capacity).toBe(cap);
        const characters = [
            "Luke",
            "Han",
            "Leia",
            "Boba Fett",
            "Obi Wan",
            "Chewbacca",
            "R2D2",
            "C3PO",
            "Jabba",
            "Darth Vader",
            "Palpatine",
            "Lando",
            "Yoda"
        ];
        for (const c of characters) {
            hashSet.set(c);
        }
        expect(hashSet.capacity).toBe(cap * 2)
    })
})

describe("hashSet (has)", () => {
    test("returns false from empty hash map", () => {
        const hashSet = new HashSet();
        expect(hashSet.has("Luke")).toBe(false);
    })
    test("returns false from single node buckets", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        expect(hashSet.has("Han")).toBe(false);
    })
    test("returns false from multi node buckets", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        hashSet.set("Boba Fett");
        hashSet.set("Leia");
        expect(hashSet.has("Yoda")).toBe(false);
    })
    test("returns true from single node hash map", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        hashSet.set("Han");
        hashSet.set("Leia");
        expect(hashSet.has("Luke")).toBe(true);
    })
    test("returns true from multi node hash map", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        hashSet.set("Han");
        hashSet.set("Leia");
        hashSet.set("Boba Fett");
        expect(hashSet.has("Boba Fett")).toBe(true);
    })
})

describe("hashSet (remove)", () => {
    test("returns false from empty hash map", () => {
        const hashSet = new HashSet();
        const key = "Luke";
        const removed = hashSet.remove(key);
        expect(removed).toBe(false);
        expect(hashSet.has(key)).toBe(false);
    })
    test("returns false from single node hash map", () => {
        const hashSet = new HashSet();
        const key = "Han";
        hashSet.set("Luke");
        hashSet.set("Leia");
        const removed = hashSet.remove(key);
        expect(removed).toBe(false);
        expect(hashSet.has(key)).toBe(false);
    })
    test("returns false from multi node hash map", () => {
        const hashSet = new HashSet();
        const key = "Han";
        hashSet.set("Luke");
        hashSet.set("Leia");
        hashSet.set("Boba Fett");
        const removed = hashSet.remove(key);
        expect(removed).toBe(false);
        expect(hashSet.has(key)).toBe(false);
    })
    test("returns true from single node hash map", () => {
        const hashSet = new HashSet();
        const key = "Han";
        hashSet.set("Luke");
        hashSet.set(key);
        hashSet.set("Leia");
        const removed = hashSet.remove(key);
        expect(removed).toBe(true);
        expect(hashSet.has(key)).toBe(false);
    })
    test("returns true from multi node hash map and correctly removes 1st node from 2 node linked list", () => {
        const hashSet = new HashSet();
        const key1 = "Luke";
        const key2 = "Boba Fett";
        hashSet.set(key1);
        hashSet.set("Han");
        hashSet.set("Leia");
        hashSet.set(key2);
        const index = hashSet.hash(key1);
        const removed = hashSet.remove(key1);
        expect(removed).toBe(true);
        expect(hashSet.buckets[index].key).toBe(key2);
        expect(hashSet.buckets[index].next).toBeNull();
        expect(hashSet.has(key1)).toBe(false);
    })
    test("returns true from multi node hash map and correctly removes 2nd node from 2 node linked list", () => {
        const hashSet = new HashSet();
        const key = "Boba Fett";
        hashSet.set("Luke");
        hashSet.set("Han");
        hashSet.set("Leia");
        hashSet.set(key);
        const index = hashSet.hash(key);
        const removed = hashSet.remove(key);
        expect(removed).toBe(true);
        expect(hashSet.buckets[index].next).toBeNull();
        expect(hashSet.has(key)).toBe(false);
    })
    test("returns true from multi node hash map and correctly removes 2nd node from 3 node linked list ", () => {
        const hashSet = new HashSet();
        const key1 = "Boba Fett";
        const key2 = "Yoda";
        hashSet.set("Luke");
        hashSet.set("Han");
        hashSet.set("Leia");
        hashSet.set(key1);
        hashSet.set(key2);
        const index = hashSet.hash(key1);
        const removed = hashSet.remove(key1);
        expect(removed).toBe(true);
        expect(hashSet.buckets[index].next.key).toBe(key2);
        expect(hashSet.has(key1)).toBe(false);
    })
})

describe("hashSet (length)", () => {
    test("return length of emtpy hash map", () => {
        const hashSet = new HashSet();
        expect(hashSet.length()).toBe(0);
    })
    test("return length of single key", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        expect(hashSet.length()).toBe(1);
    })
    test("return length of multiple keys", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        hashSet.set("Han");
        hashSet.set("Leia");
        expect(hashSet.length()).toBe(3);
    })
    test("return length of multiple keys when stored within same buckets", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        hashSet.set("Han");
        hashSet.set("Leia");
        hashSet.set("Boba Fett");
        hashSet.set("Yoda");
        expect(hashSet.length()).toBe(5);
    })
})

describe("hashSet (clear)", () => {
    test("clears already empty hash map", () => {
        const hashSet = new HashSet();
        hashSet.clear();
        let key = null;
        hashSet.buckets.forEach(bucket => { 
            if (bucket) key = bucket.key;
        })
        expect(key).toBeNull();
    })
    test("clears single node hash map", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        hashSet.set("Han");
        hashSet.set("Leia");
        hashSet.clear();
        let key = null;
        hashSet.buckets.forEach(bucket => { 
            if (bucket) key = bucket.key;
        })
        expect(key).toBeNull();
    })
    test("clears multi node bucket hash map", () => {
        const hashSet = new HashSet();
        hashSet.set("Luke");
        hashSet.set("Han");
        hashSet.set("Leia");
        hashSet.set("Boba Fett");
        hashSet.set("Yoda");
        hashSet.clear();
        let key = null;
        hashSet.buckets.forEach(bucket => { 
            if (bucket) key = bucket.key;
        })
        expect(key).toBeNull();
    })
})

describe("hashSet (keys)", () => {
    test("returns an empty array from an empty hash map", () => {
        const hashSet = new HashSet();
        const array = hashSet.keys();
        expect(array).toEqual([]);
    })
    test("returns an array from single node bucket hash map", () => {
        const hashSet = new HashSet();
        const characters = [
            "Luke",
            "Han",
            "Leia"
        ];
        for (const c of characters) {
            hashSet.set(c);
        }
        const array = hashSet.keys();
        for (const c of characters) {
            expect(array).toContain(c);
        }
    })
    test("returns an array from multi node bucket hash map", () => {
        const hashSet = new HashSet();
        const characters = [
            "Luke",
            "Han",
            "Leia",
            "Boba Fett",
            "Yoda"
        ];
        for (const c of characters) {
            hashSet.set(c);
        }
        const array = hashSet.keys();
        for (const c of characters) {
            expect(array).toContain(c);
        }
    })
})