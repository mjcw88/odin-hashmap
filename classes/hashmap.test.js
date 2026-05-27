import { HashMap } from "./hashmap.js";

describe("HashMap (hash)", () => {
    test("key returns same hash everytime", () => {
        const hashMap = new HashMap();
        const key1 = "Luke";
        const key2 = "Luke";
        const key3 = "Luke";
        const hashCode1 = hashMap.hash(key1);
        const hashCode2 = hashMap.hash(key2);
        const hashCode3 = hashMap.hash(key3);
        expect(hashCode1).toBe(hashCode2);
        expect(hashCode2).toBe(hashCode3);
    })
    test("key returns a value within capacity limits", () => {
        const hashMap = new HashMap();
        const key1 = "Luke";
        const hashCode1 = hashMap.hash(key1);
        expect(hashCode1).toBeGreaterThanOrEqual(0);
        expect(hashCode1).toBeLessThanOrEqual(hashMap.capacity - 1);

        hashMap.capacity = hashMap.capacity * 2;
        const key2 = "Han";
        const hashCode2 = hashMap.hash(key2);
        expect(hashCode2).toBeGreaterThanOrEqual(0);
        expect(hashCode2).toBeLessThanOrEqual(hashMap.capacity - 1);

        hashMap.capacity = hashMap.capacity * 2;
        const key3 = "Leia";
        const hashCode3 = hashMap.hash(key3);
        expect(hashCode3).toBeGreaterThanOrEqual(0);
        expect(hashCode3).toBeLessThanOrEqual(hashMap.capacity - 1);
    })
    test("changing capacity changes hash of same key", () => {
        const hashMap = new HashMap();
        hashMap.capacity = 1;
        const key1 = "Luke";
        const hashCode1 = hashMap.hash(key1);
        hashMap.capacity = 2;
        const key2 = "Luke";
        const hashCode2 = hashMap.hash(key2);
        expect(hashCode1).toBe(0);
        expect(hashCode2).toBe(1);
    })
})

describe("HashMap (set)", () => {

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