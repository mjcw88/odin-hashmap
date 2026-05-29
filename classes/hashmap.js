export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        const cap = this.capacity;
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % cap;
        }

        return hashCode;
    } 

    set(key, value) {
        const hash = this.hash(key);
        if (!this.buckets[hash]) {
            this.buckets[hash] = { key, value, next: null };
        } else {
            // Loop through linked list of hash index to find if key already exists, if so overwrite, if not then save as new entry;
        }

        if (this.length() > this.capacity * this.loadFactor) this.capacity * 2;
    }

    get(key) {
        const hash = this.hash(key);
        return this.buckets[hash].value;
    }

    has(key) {

    }

    remove(key) {

    }

    length() {
        return this.buckets.filter(bucket => bucket.length > 0).length;
    }

    clear() {

    }

    keys() {

    }

    values() {

    }

    entries() {
        
    }
}
