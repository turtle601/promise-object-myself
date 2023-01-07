const MyPromise = require('../src/MyPromise');

function myPromiseFn() {
  return new MyPromise((resolve, reject) => {
    resolve('Promise 실행');
  });
}

describe('My Promise 테스트 동작 테스트 확인', () => {
  test('(단위) 비동기 제대로 실행되는지 확인', () => {
    console.log = jest.fn();

    myPromiseFn()
      .then((result) => console.log(result))
      .catch((result) => console.log(result));

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  test('(종합) 비동기 순서 + 체이닝이 제대로 실행되는지 확인', () => {
    const testLogic = () => {
      console.log('콜스택 실행 - 1');

      setTimeout(() => console.log('태스크 큐 실행'), 0);

      myPromiseFn()
        .then((result) => console.log(result))
        .catch((result) => console.log(result));

      console.log('콜스택 실행  - 2');
    };

    jest.useFakeTimers();
    console.log = jest.fn();

    testLogic();

    expect(console.log).toHaveBeenCalledWith('콜스택 실행 - 1');
    expect(console.log).toHaveBeenCalledWith('콜스택 실행 - 2');
    expect(console.log).toHaveBeenCalledWith('Promise 실행');
    expect(console.log).toHaveBeenCalledWith('태스크 큐 실행');
  });
});
