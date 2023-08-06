export class Store {
  constructor() {
    this.store = JSON.parse(localStorage.getItem("config") || "{}");
  }

  get(key, defaultValue) {
    return key in this.store ? this.store[key] : defaultValue;
  }

  set(key, value) {
    this.store[key] = value;
    localStorage.setItem("config", JSON.stringify(this.store));
  }

  delete(key) {
    delete this.store[key];
    localStorage.setItem("config", JSON.stringify(this.store));
  }

  clear() {
    localStorage.removeItem("config");
    this.store = {};
  }
}
