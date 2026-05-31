export class HashSet {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity);
    }

    // Private helper functions
    #assignKey(key, buckets) {
        const index = this.hash(key);

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (!buckets[index]) {
            buckets[index] = { key, next: null };
            this.size++;
        } else {
            let current = buckets[index];
            let previous = null;

            while (current) {
                if (current.key === key) return;
                previous = current;
                current = current.next;
            }
            previous.next = { key, next: null }
            this.size++;
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
            if (bucket) {
                let current = bucket;
                while (current) {
                    this.#assignKey(current.key, newBuckets);
                    current = current.next;
                }
            }
        })
        this.buckets = newBuckets;
    }

    // Public methods
    hash(key) {
        const cap = this.capacity;
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % cap;
        }

        return hashCode;
    } 

    set(key) {
        this.#assignKey(key, this.buckets);
        if (this.#isAtCapacity()) this.#expandBuckets();
    }

    has(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (!this.buckets[index]) return false;

        let current = this.buckets[index];
        while (current) {
            if (current.key === key) return true;
            current = current.next;
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (!this.buckets[index]) return false;

        let previous = null;
        let current = this.buckets[index];
        while (current) {
            if (current.key === key) {
                if (previous) {
                    previous.next = current.next;
                } else {
                    this.buckets[index] = current.next;
                }
                this.size--;
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.size = 0;
        this.buckets.forEach((bucket, index) => {
            if (bucket) this.buckets[index] = null;
        })
    }

    keys() {
        const array = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                let current = bucket;
                while (current) {
                    array.push(current.key);
                    current = current.next;
                }
            }
        })
        return array;
    }
}
