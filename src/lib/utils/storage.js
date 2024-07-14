class GlobalStorage {
    constructor() {
        this.store = {};
    }

    setItem(key, value) {
        this.store[key] = value;
    }

    getItem(key) {
        return this.store[key];
    }

    clear() {
        this.store = {};
    }
}

const storage = new GlobalStorage();
export default storage;