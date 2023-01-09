## 기능 구현 목록

- [ ] Promise는 실행 상태를 나타낸다.

  - [ ] 실행 전: `pending`
  - [ ] 실행 후 성공했을 때 (resolve): `fulfilled`
  - [ ] 실행 후 실패했을 때 (rejected): `rejected`

- [ ] Promise 비동기 동작로 동작하게 하기

  - 마이크로태스크 큐, 태스크 큐의 구분 X

- [ ] 후속 처리 메서드

  - [ ] Promise.prototype.then

    - 기존 JS에서는 첫번째 인자(fulfilled fn)와 두번째 인자에 콜백함수(rejected fn)를 넣을 수 있다.
    - 하지만 이번 구현 사항에서는 첫번째 콜백함수 인자에 대한 구현만 할 예정이다.

    - [ ] 리턴값은 Promise 객체로 리턴

  - [ ] Promise.prototype.catch

    - [ ] Promise에서 발생하는 모든 콜백함수의 에러를 감지하는 catch 구문을 구현 (메서드 체이닝 구현 이후에 확인 가능)
    - [ ] 리턴값은 Promise 객체로 리턴

  - [ ] Promise.prototype.finally

    - [ ] finally 메서드는 하나의 콜백 함수를 인수로 받는다.
    - [ ] finalyy 메서드의 콜백함수는 성공, 실패와 상관없이 무조건 한 번 호출된다.
    - [ ] 리턴값은 Promise 객체로 리턴

- [ ] 프로토타입 메서드 체이닝

  - [ ] 프로미스 콜백 패턴 구현

---

- [ ] 프로미스 정적 메서드 (여유가 된다면)

  - [ ] Promise.resolve
  - [ ] Promise.reject
  - [ ] Promise.race
  - [ ] Promise.allSettled

---

단순 기능 구현목록만 보게 되면 무엇을 어떻게 해야할지 몰라 세부적으로 기능 구현 목표를 나누어서 구현

**1차 목표**
then, catch 함수 구현 + Promise 상태가 변경되는지

- then, catch 기능 구현 (콜백함수 실행되는지만)
- Promise 상태 변경되는 지 구현

- [ ] 프로미스 에러 처리 구현

  - 생각해야할 고려사항

    1. catch의 메서드 체이닝 고려

    - [Promise.prototype.catch 공식문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
    - case1: myPromiseFn().then().catch().then() 에서 myPromiseFn에서 에러 or reject 발생 시
      => catch 함수 실행 -> then 함수 실행 | 이때, catch 이후에 then의 value 값은 catch의 리턴값 허용

    - case2: myPromiseFn().then().catch().then() 에서 첫번째 then의 콜백에서 에러 발생 시
      => then -> catch -> then 함수 실행

    - case3: myPromiseFn().then().catch().then() 에서 첫번째 에러 발생 X
      => catch는 무시한 채 myPromiseFn().then().then()으로 동작한다.

  - [ ] catch 함수 구현

    - catch 함수는 then(undefined, 에러콜백함수)로 구현이 가능하다.

  - [ ] then 함수 수정

    - then 안에 콜백함수가 존재하지 않는다면??
