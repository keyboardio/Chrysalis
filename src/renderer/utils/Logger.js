class Logger {
  constructor() {
    if (!Logger.instance) {
      this.logs = [];
      Logger.instance = this;
    }
    return Logger.instance;
  }

  getLogs() {
    return this.logs;
  }

  log(message, data = null, level = "LOG") {
    const timestamp = new Date().toISOString();
    const origin = this.getCallSite();
    const logMessage = `[${timestamp}] [${level}] [${origin}]: ${message}`;

    if (data) {
      this.logs.push({ message: logMessage, data });
      console.log(logMessage, data);
    } else {
      this.logs.push(logMessage);
      console.log(logMessage);
    }
  }

  // Utilize log method for different levels to avoid code duplication
  debug(message, data = null) {
    this.log(message, data, "DEBUG");
  }

  info(message, data = null) {
    this.log(message, data, "INFO");
  }

  warn(message, data = null) {
    this.log(message, data, "WARN");
  }

  error(message, data = null) {
    this.log(message, data, "ERROR");
  }

  // Helper method to capture the call site
  getCallSite() {
    // Chromeish browsers
    const err = new Error();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(err, this.getCallSite);
    } else {
      // Firefox
      // just pull from err.stack
    }

    const stack = err?.stack.split("\n")[3];
    // Extract and format call site from stack trace
    return stack?.trim()?.replace(/^at\s+/g, "");
  }
}

const instance = new Logger();
Object.freeze(instance);

export default instance;
