# 자바스크립트 프로미스 객체 직접 구현하기

## 📚 학습목표

- [x] Promise 객체에 대해 공부하고 구현하면서 Promise를 좀 더 정확하게 이해한다.
- [x] 비동기 테스트 코드 작성 방법을 익힌다.
- [x] 비동기 동작 과정에 대해 좀 더 정확하게 이해한다.

## 📌 요구사항 정리
1. Promise는 실행 상태를 나타낸다.
- 실행 전: pending
- 실행 후 성공했을 때 (resolve): fulfilled
- 실행 후 실패했을 때 (rejected): rejected

2. Promise는 JS 이벤트 루프에서 Microtask Queue에서 비동기적으로 동작한다.

3. 후속 처리 메서드
- Promise.prototype.then
  - then함수는 첫번째 인자(fulfilled function), 두번째 인자(rejected function)를 넣어서 해당 함수를 동작시킨다.

- Promise.prototype.catch
  - catch메서드는 하나의 콜백함수를 인자로 받는다.
  - catch메서드 이후에도 메서드 체이닝이 가능하다. (then과 동일)
  - Promise에서 발생하는 모든 에러 처리를 담당한다.

- Promise.prototype.finally
  - catch메서드는 하나의 콜백함수를 인자로 받는다.
  - finally는 Promise가 settled 된 상태에서 무조건 한 번 실행된다.
  - 콜백함수의 리턴값이 적용 X

4. Promise 메서드 체이닝 구현
- 후속 처리 메서드인 then, catch, finally의 리턴값을 Promise 객체로 구현

5. Promise 정적 메서드 (구현 X)
- Promise.race(), Promise.all() 함수 등 

### 참고 자료

[Promise 직접 구현해보기](https://velog.io/@elrion018/%EA%B0%84%EB%8B%A8%ED%95%9C-%ED%94%84%EB%A1%9C%EB%AF%B8%EC%8A%A4Promise-%EC%95%BD%EC%86%8D%EC%9D%84-%EC%A7%81%EC%A0%91-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EC%9E%90)

[Promise 직접 구현한 코드 with Typescript](https://github.com/elrion018/my-promise)

[Promise 직접 구현 - 개발자 정현민](https://blog.hyunmin.dev/14)

[Promise 직접 만들기 - 문서포트님](https://moonsupport.oopy.io/post/27)
