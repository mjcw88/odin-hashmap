export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
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

    }

    get(key) {

    }

    has(key) {

    }

    remove(key) {

    }

    length() {

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