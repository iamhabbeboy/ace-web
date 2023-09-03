interface InputValue {
  [key: string]: string;
}

export class BrowserSession {
  /**
   * Get browser session value
   * @param key
   * @returns
   */
  get(key: string) {
    if (!key) {
      throw new Error("Invalid key.");
    }
    return sessionStorage.getItem(key);
  }
  /**
   * Store the session value
   * @param key
   * @param value
   * @returns
   */
  set(key: string, value: string) {
    if (!sessionStorage.getItem(key)) {
      return;
    }
    console.log("Hello world")
    sessionStorage.setItem(key, value);
  }
  /**
   * Delete session value
   * @param key
   */
  delete(key: string) {
    if (!key) {
      throw new Error("Invalid key.");
    }
    if (!this.get(key)) {
      throw new Error("Key does not exist in session");
    }
    sessionStorage.removeItem(key);
  }
}
