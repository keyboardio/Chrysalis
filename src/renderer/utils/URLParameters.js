class URLParameters {
  constructor() {
    this.vid = null;
    this.pid = null;
    this.version = null;
  }

  parseFromURL(searchString) {
    // Handle both ? and ; separated parameters
    const params = searchString
      .replace("?", "")
      .split(";")
      .reduce((acc, param) => {
        const [key, value] = param.split("=");
        if (key && value) acc[key] = value;
        return acc;
      }, {});

    // Parse VID (handle both "0x3496" and "3496" formats)
    if (params.vid) {
      this.vid = parseInt(params.vid.replace("0x", ""), 16);
    }

    // Parse PID (handle both "0x0005" and "0005" formats)
    if (params.pid) {
      this.pid = parseInt(params.pid.replace("0x", ""), 16);
    }

    // Parse version
    this.version = params.version || null;

    return this;
  }

  clear() {
    this.vid = null;
    this.pid = null;
    this.version = null;
  }

  hasDeviceIdentifiers() {
    return this.vid !== null && this.pid !== null;
  }
}

// Create a singleton instance
const urlParameters = new URLParameters();
export default urlParameters;
