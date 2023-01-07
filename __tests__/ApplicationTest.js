const MyPromise = require('../src/MyPromise');

function myPromiseFn() {
  return new MyPromise((resolve, reject) => {
    resolve('Promise 실행');
  });
}

describe('MyPromise 테스트 동작 테스트 확인', () => {
  test('(단위) 프로미스 체이닝이 제대로 실행되는지', () => {
    jest.useFakeTimers();
    console.log = jest.fn();

    myPromiseFn()
      .then((result) => console.log(result))
      .catch((result) => console.log(result));

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledTimes(1);
    }, 0);

    jest.runAllTimers();
  });

  test('(종합) Promise가 우선순위에 의해 제대로 실행되는지', () => {
    const testLogic = () => {
      console.log('콜스택 실행 - 1');

      setTimeout(() => console.log('태스크 큐 실행'), 0);

      myPromiseFn()
        .then((result) => console.log(result))
        .catch((result) => console.log(result));

      console.log('콜스택 실행 - 2');
    };

    const results = [
      '콜스택 실행 - 1',
      '콜스택 실행 - 2',
      'Promise 실행',
      '태스크 큐 실행',
    ];

    jest.useFakeTimers();
    console.log = jest.fn();

    testLogic();

    setTimeout(() => {
      results.forEach((result) => {
        expect(console.log).toHaveBeenCalledWith(result);
      });
    }, 1);

    jest.runAllTimers();
  });
});
