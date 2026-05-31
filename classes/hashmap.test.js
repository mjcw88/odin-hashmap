import { HashMap } from "./hashmap.js";

describe("HashMap (hash)", () => {
    test("key returns same hash everytime", () => {
        const hashMap = new HashMap();
        const key = "Luke";
        const index1 = hashMap.hash(key);
        const index2 = hashMap.hash(key);
        const index3 = hashMap.hash(key);
        expect(index1).toBe(index2);
        expect(index2).toBe(index3);
    })
    test("key returns a value within capacity limits", () => {
        const hashMap = new HashMap();
        const index1 = hashMap.hash("Luke");
        expect(index1).toBeGreaterThanOrEqual(0);
        expect(index1).toBeLessThanOrEqual(hashMap.capacity - 1);

        hashMap.capacity = hashMap.capacity * 2;
        const index2 = hashMap.hash("Han");
        expect(index2).toBeGreaterThanOrEqual(0);
        expect(index2).toBeLessThanOrEqual(hashMap.capacity - 1);

        hashMap.capacity = hashMap.capacity * 2;
        const index3 = hashMap.hash("Leia");
        expect(index3).toBeGreaterThanOrEqual(0);
        expect(index3).toBeLessThanOrEqual(hashMap.capacity - 1);
    })
    test("changing capacity changes hash of same key", () => {
        const hashMap = new HashMap();
        hashMap.capacity = 1;
        const key = "Luke";
        const index1 = hashMap.hash(key);
        hashMap.capacity = 2;
        const index2 = hashMap.hash(key);
        expect(index1).toBe(0);
        expect(index2).toBe(1);
    })
})

describe("HashMap (set)", () => {
    test("key & value are stored within bucket capacity" , () => {
        const hashMap = new HashMap();
        const key = "Luke";
        const value = "Jedi";
        hashMap.set(key, value);
        expect(hashMap.get(key)).toBe(value);
    });
    test("value is overwritten if key already exists", () => {
        const hashMap = new HashMap();
        const key = "Anakin";
        const value1 = "Padawan";
        const value2 = "Jedi";
        hashMap.set(key, value1);
        expect(hashMap.get(key)).toBe(value1);
        hashMap.set(key, value2);
        expect(hashMap.get(key)).toBe(value2);
    });
    test("handles collisions correctly when keys produce same hash", () => {
        const hashMap = new HashMap();
        const key1 = "Luke";
        const value1 = "Jedi";
        const key2 = "Boba Fett";
        const value2 = "Bounty Hunter"
        const index1 = hashMap.hash(key1);
        const index2 = hashMap.hash(key2);
        hashMap.set(key1, value1);
        hashMap.set(key2, value2);
        expect(index1).toBe(index2);
        expect(hashMap.buckets[index1].key).toBe("Luke");
        expect(hashMap.buckets[index1].next.key).toBe("Boba Fett");
    })
    test("capacity is doubled when loadFactor is exceeded", () => {
        const hashMap = new HashMap();
        const cap = 16;
        expect(hashMap.capacity).toBe(cap);
        const characters = [
            ["Luke", "Jedi"],
            ["Han", "Smuggler"],
            ["Leia", "Rebel Leader"],
            ["Anakin", "Jedi"],
            ["Obi Wan", "Jedi"],
            ["Chewbacca", "Smuggler"],
            ["R2D2", "Droid"],
            ["C3PO", "Droid"],
            ["Jabba", "Crime Boss"],
            ["Darth Vader", "Sith Lord"],
            ["Palpatine", "Sith Lord"],
            ["Lando", "Smuggler"],
            ["Wicket", "Ewok"]
        ];
        for(const c of characters) {
            hashMap.set(c[0], c[1]);
        }
        expect(hashMap.capacity).toBe(cap * 2)
    })
})

describe("HashMap (get)", () => {
    test("returns null from empty hash map", () => {
        const hashMap = new HashMap();
        const value = hashMap.get("Luke");
        expect(value).toBeNull();
    })
    test("returns null from single node hash map", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Leia", "Rebel Leader");
        const value = hashMap.get("Han");
        expect(value).toBeNull();
    })
    test("returns null from multi node hash map", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.set("Boba Fett", "Bounty Hunter");
        const value = hashMap.get("Yoda");
        expect(value).toBeNull();
    })
    test("returns value from a single node bucket", () => {
        const hashMap = new HashMap();
        const key = "Luke";
        const value = "Jedi";
        hashMap.set(key, value);
        const returnedValue = hashMap.get(key);
        expect(returnedValue).toBe(value);
    })
    test("returns value from a multi node bucket", () => {
        const hashMap = new HashMap();
        const key1 = "Luke";
        const value1 = "Jedi";
        const key2 = "Boba Fett";
        const value2 = "Bounty Hunter";
        hashMap.set(key1, value1);
        hashMap.set(key2, value2);
        const returnedValue = hashMap.get(key2);
        expect(returnedValue).toBe(value2);
    })
})

describe("HashMap (has)", () => {
    test("returns false from empty hash map", () => {
        const hashMap = new HashMap();
        expect(hashMap.has("Luke")).toBe(false);
    })
    test("returns false from single node buckets", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        expect(hashMap.has("Han")).toBe(false);
    })
    test("returns false from multi node buckets", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Boba Fett", "Bounty Hunter");
        hashMap.set("Leia", "Rebel Leader");
        expect(hashMap.has("Yoda")).toBe(false);
    })
    test("returns true from single node hash map", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Han", "Smuggler");
        hashMap.set("Leia", "Rebel Leader");
        expect(hashMap.has("Luke")).toBe(true);
    })
    test("returns true from multi node hash map", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Han", "Smuggler");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.set("Boba Fett", "Bounty Hunter");
        expect(hashMap.has("Boba Fett")).toBe(true);
    })
})

describe("HashMap (remove)", () => {
    test("returns false from empty hash map", () => {
        const hashMap = new HashMap();
        const key = "Luke";
        const removed = hashMap.remove(key);
        expect(removed).toBe(false);
        expect(hashMap.has(key)).toBe(false);
    })
    test("returns false from single node hash map", () => {
        const hashMap = new HashMap();
        const key = "Han";
        hashMap.set("Luke", "Jedi");
        hashMap.set("Leia", "Rebel Leader");
        const removed = hashMap.remove(key);
        expect(removed).toBe(false);
        expect(hashMap.has(key)).toBe(false);
    })
    test("returns false from multi node hash map", () => {
        const hashMap = new HashMap();
        const key = "Han";
        hashMap.set("Luke", "Jedi");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.set("Boba Fett", "Bounty Hunter");
        const removed = hashMap.remove(key);
        expect(removed).toBe(false);
        expect(hashMap.has(key)).toBe(false);
    })
    test("returns true from single node hash map", () => {
        const hashMap = new HashMap();
        const key = "Han";
        hashMap.set("Luke", "Jedi");
        hashMap.set(key, "Smuggler");
        hashMap.set("Leia", "Rebel Leader");
        const removed = hashMap.remove(key);
        expect(removed).toBe(true);
        expect(hashMap.has(key)).toBe(false);
    })
    test("returns true from multi node hash map and correctly removes 1st node from 2 node linked list", () => {
        const hashMap = new HashMap();
        const key1 = "Luke";
        const key2 = "Boba Fett";
        hashMap.set(key1, "Jedi");
        hashMap.set("Han", "Smuggler");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.set(key2, "Bounty Hunter");
        const index = hashMap.hash(key1);
        const removed = hashMap.remove(key1);
        expect(removed).toBe(true);
        expect(hashMap.buckets[index].key).toBe(key2);
        expect(hashMap.buckets[index].next).toBeNull();
        expect(hashMap.has(key1)).toBe(false);
    })
    test("returns true from multi node hash map and correctly removes 2nd node from 2 node linked list", () => {
        const hashMap = new HashMap();
        const key = "Boba Fett";
        hashMap.set("Luke", "Jedi");
        hashMap.set("Han", "Smuggler");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.set(key, "Bounty Hunter");
        const index = hashMap.hash(key);
        const removed = hashMap.remove(key);
        expect(removed).toBe(true);
        expect(hashMap.buckets[index].next).toBeNull();
        expect(hashMap.has(key)).toBe(false);
    })
    test("returns true from multi node hash map and correctly removes 2nd node from 3 node linked list ", () => {
        const hashMap = new HashMap();
        const key1 = "Boba Fett";
        const key2 = "Yoda";
        hashMap.set("Luke", "Jedi");
        hashMap.set("Han", "Smuggler");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.set(key1, "Bounty Hunter");
        hashMap.set("Yoda", "Jedi");
        const index = hashMap.hash(key1);
        const removed = hashMap.remove(key1);
        expect(removed).toBe(true);
        expect(hashMap.buckets[index].next.key).toBe(key2);
        expect(hashMap.has(key1)).toBe(false);
    })
})

describe("HashMap (length)", () => {
    test("return length of emtpy hash map", () => {
        const hashMap = new HashMap();
        expect(hashMap.length()).toBe(0);
    })
    test("return length of single key", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        expect(hashMap.length()).toBe(1);
    })
    test("return length of multiple keys", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Han", "Leia");
        hashMap.set("Leia", "Rebel Leader");
        expect(hashMap.length()).toBe(3);
    })
    test("return length of multiple keys when stored within same buckets", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Han", "Leia");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.set("Boba Fett", "Bounty Hunter");
        hashMap.set("Yoda", "Jedi");
        expect(hashMap.length()).toBe(5);
    })
})

describe("HashMap (clear)", () => {
    test("clears already empty hash map", () => {
        const hashMap = new HashMap();
        hashMap.clear();
        let key = null;
        hashMap.buckets.forEach(bucket => { 
            if (bucket) key = bucket.key;
        })
        expect(key).toBeNull();
    })
    test("clears single node hash map", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Han", "Leia");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.clear();
        let key = null;
        hashMap.buckets.forEach(bucket => { 
            if (bucket) key = bucket.key;
        })
        expect(key).toBeNull();
    })
    test("clears multi node bucket hash map", () => {
        const hashMap = new HashMap();
        hashMap.set("Luke", "Jedi");
        hashMap.set("Han", "Leia");
        hashMap.set("Leia", "Rebel Leader");
        hashMap.set("Boba Fett", "Bounty Hunter");
        hashMap.set("Yoda", "Jedi");
        hashMap.clear();
        let key = null;
        hashMap.buckets.forEach(bucket => { 
            if (bucket) key = bucket.key;
        })
        expect(key).toBeNull();
    })
})

describe("HashMap (keys)", () => {

})

describe("HashMap (values)", () => {

})

describe("HashMap (entries)", () => {

})