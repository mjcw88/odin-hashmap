import { HashMap } from "./hashmap.js";

describe("HashMap (hash)", () => {
    test("key returns same hash everytime", () => {
        const hashMap = new HashMap();
        const key = "Luke";
        const hashCode1 = hashMap.hash(key);
        const hashCode2 = hashMap.hash(key);
        const hashCode3 = hashMap.hash(key);
        expect(hashCode1).toBe(hashCode2);
        expect(hashCode2).toBe(hashCode3);
    })
    test("key returns a value within capacity limits", () => {
        const hashMap = new HashMap();
        const hashCode1 = hashMap.hash("Luke");
        expect(hashCode1).toBeGreaterThanOrEqual(0);
        expect(hashCode1).toBeLessThanOrEqual(hashMap.capacity - 1);

        hashMap.capacity = hashMap.capacity * 2;
        const hashCode2 = hashMap.hash("Han");
        expect(hashCode2).toBeGreaterThanOrEqual(0);
        expect(hashCode2).toBeLessThanOrEqual(hashMap.capacity - 1);

        hashMap.capacity = hashMap.capacity * 2;
        const hashCode3 = hashMap.hash("Leia");
        expect(hashCode3).toBeGreaterThanOrEqual(0);
        expect(hashCode3).toBeLessThanOrEqual(hashMap.capacity - 1);
    })
    test("changing capacity changes hash of same key", () => {
        const hashMap = new HashMap();
        hashMap.capacity = 1;
        const key = "Luke";
        const hashCode1 = hashMap.hash(key);
        hashMap.capacity = 2;
        const hashCode2 = hashMap.hash(key);
        expect(hashCode1).toBe(0);
        expect(hashCode2).toBe(1);
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
        const value2 = "Sith Lord";
        hashMap.set(key, value1);
        hashMap.set(key, value2);
        expect(hashMap.get(key)).toBe(value2);
    });
    test("handles collisions correctly when keys produce same hash", () => {
        const hashMap = new HashMap();
        const key1 = "Luke";
        const value1 = "Jedi";
        const key2 = "Boba Fett";
        const value2 = "Bounty Hunter"
        const hashCode1 = hashMap.hash(key1);
        const hashCode2 = hashMap.hash(key2);
        hashMap.set(key1, value1);
        hashMap.set(key2, value2);
        expect(hashCode1).toBe(hashCode2);
        expect(hashMap.buckets[hashCode1]).toContainEqual({
            key: key1,
            value: value1
        });
        expect(hashMap.buckets[hashCode1]).toContainEqual({
            key: key2,
            value: value2
        });
    })
    test("capacity is increased when loadFactor is exceeded", () => {
        const hashMap = new HashMap();
        const cap = 16;
        expect(hashMap.capacity).toBe(cap);
        const characters = [
            ["Luke", "Jedi"],
            ["Han", "Smuggler"],
            ["Leia", "Rebel Leader"],
            ["Anakin", "Sith Lord"],
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
        for(const c in characters) {
            hashMap.set(c[0], c[1]);
        }
        expect(hashMap.capacity).toBe(cap * 2)
    })
})

describe("HashMap (get)", () => {

})

describe("HashMap (has)", () => {

})

describe("HashMap (remove)", () => {

})

describe("HashMap (length)", () => {

})

describe("HashMap (clear)", () => {

})

describe("HashMap (keys)", () => {

})

describe("HashMap (values)", () => {

})

describe("HashMap (entries)", () => {

})