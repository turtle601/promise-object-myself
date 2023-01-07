const { PROMISES_STATE } = require('./utils/constants');

class MyPromise {
  constructor(executor) {
    this.state = PROMISES_STATE.pending;
    this.value = null;
    this.lastcalls = [];

    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (error) {
      this.#reject(error);
    }
  }

  #resolve(value) {
    queueMicrotask(() => {
      this.state = PROMISES_STATE.fulfilled;
      this.value = value;
      this.lastcalls.forEach((lastcall) => lastcall());
    });
  }

  #reject(error) {
    queueMicrotask(() => {
      this.state = PROMISES_STATE.rejected;
      this.value = error;
      this.lastcalls.forEach((lastcall) => lastcall());
    });
  }

  #asyncResolve(callback) {
    if (this.state === PROMISES_STATE.pending) {
      return new MyPromise((resolve) =>
        this.lastcalls.push(() => resolve(callback(this.value)))
      );
    }

    return null;
  }

  #syncResolve(callback) {
    if (this.state === PROMISES_STATE.fulfilled) {
      return new MyPromise((resolve) => resolve(callback(this.value)));
    }

    return null;
  }

  then(callback) {
    return this.#asyncResolve(callback) || this.#syncResolve(callback);
  }

  catch(callback) {
    if (this.state === PROMISES_STATE.rejected) {
      callback(this.value);
    }

    return this;
  }
}

module.exports = MyPromise;
