const { PROMISES_STATE } = require('./utils/constants');

class MyPromise {
  constructor(executor) {
    this.state = PROMISES_STATE.PENDING;
    this.value = null;

    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (error) {
      this.#reject(error);
    }
  }

  #resolve(value) {
    this.state = PROMISES_STATE.fulfilled;
    this.value = value;
  }

  #reject(error) {
    this.state = PROMISES_STATE.rejected;
    this.value = error;
  }

  then(callback) {
    callback(this.value);

    return this;
  }

  catch(callback) {
    callback(this.value);

    return this;
  }
}

module.exports = MyPromise;
