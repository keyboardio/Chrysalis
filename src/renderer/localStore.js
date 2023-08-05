const LocalStore = {
  get: function (key, defaultValue) {
    const store = JSON.parse(localStorage.getItem("config") || "{}");
    return key in store ? store[key] : defaultValue;
  },
  set: function (key, value) {
    const store = JSON.parse(localStorage.getItem("config") || "{}");
    store[key] = value;
    localStorage.setItem("config", JSON.stringify(store));
  },
  delete: function (key) {
    const store = JSON.parse(localStorage.getItem("config") || "{}");
    delete store[key];
    localStorage.setItem("config", JSON.stringify(store));
  },
  clear: function () {
    localStorage.removeItem("config");
  },
};

module.exports = LocalStore;
