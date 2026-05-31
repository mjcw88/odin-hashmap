export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity);
    }

    #assignKey(key, value, buckets) {
        const index = this.hash(key);
        if (!buckets[index]) {
            buckets[index] = { key, value, next: null };
            this.size++;
        } else {
            let current = buckets[index];
            let previous = null;

            while (current) {
                if (current.key === key) {
                    current.value = value;
                    break;
                }; 
                previous = current;
                current = current.next;
            }

            if (!current) {
                previous.next = { key, value, next: null }
                this.size++;
            };
        }
    }

    #isAtCapacity() {
        return this.size > this.capacity * this.loadFactor;
    }

    #expandBuckets() {
        this.size = 0;
        this.capacity *= 2;
        const newBuckets = new Array(this.capacity);

        this.buckets.forEach(bucket => {
            if (bucket?.key) {
                let current = bucket;
                while (current) {
                    this.#assignKey(current.key, current.value, newBuckets);
                    current = current.next;
                }
            }
        })
        this.buckets = newBuckets;
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
        this.#assignKey(key, value, this.buckets);
        if (this.#isAtCapacity()) this.#expandBuckets();
    }

    get(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) return null;

        let current = this.buckets[index];
        while (current) {
            if (current.key === key) return current.value;
            current = current.next;
        }
    }

    has(key) {

    }

    remove(key) {

    }

    length() {
        return 0;
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
