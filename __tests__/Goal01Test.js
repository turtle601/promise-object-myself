const MyPromise = require('../src/MyPromise');
const { PROMISES_STATE } = require('../src/utils/constants');

const myPromiseFn = (input) => {
  return new MyPromise((resolve, reject) => {
    if (input === 1) {
      resolve('성공');
    } else {
      reject(new Error('실패'));
    }
  });
};

describe('My Promise 테스트 동작 테스트 확인', () => {
  test('resolve 테스트 - 상태 변경 + 값 들어왔는지 확인', () => {
    const promise = myPromiseFn(1);
    expect(promise.state).toEqual(PROMISES_STATE.fulfilled);
    expect(promise.value).toEqual('성공');
  });

  test('reject 테스트 - 상태 변경', () => {
    const promise = myPromiseFn(2);
    expect(promise.state).toEqual(PROMISES_STATE.rejected);
    expect(promise.value).toEqual(new Error('실패'));
  });

  test('then 함수 기본동작 확인', () => {
    const input = 1;

    console.log = jest.fn();
    myPromiseFn(input).then((value) => console.log(value));

    expect(console.log).toHaveBeenCalledWith('성공');
  });

  test('catch 함수 기본동작 확인', () => {
    const input = 2;

    console.log = jest.fn();
    myPromiseFn(input).catch((error) => console.log(error.message));

    expect(console.log).toHaveBeenCalledWith('실패');
  });
});
