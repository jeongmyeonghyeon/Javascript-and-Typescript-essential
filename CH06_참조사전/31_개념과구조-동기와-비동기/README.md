## 동기와 비동기

비동기 코드에 대한,<br />
특히, Promise에 대해 알아보자.

---

```
1. 동기 코드란?
2. 비동기 코드
3. Promise
```

<br />

### 동기 코드란?

```js
function double(x) {
  return x * 2;
}

const x = double(100); // 이 라인의 실행이 완료되기 전에
const y = x; // 이 라인의 코드가 실행될 수 없는 것.
```

앞의 코드가 확정(완료)되기 전에는 그 다음 일을 수행(실행)할 수 없는(상태) 것이다.<br />
앞에 코드와 다음 코드가 종속성을 갖게 되는 것이다.<br />
동기적 상황. 앞뒤가 완전히 묶여 있다는 측면에서 동기 코드라고 부른다.

그래서 동기 코드는 '순차적으로' 실행이 될 수밖에 없는 것이다.

<br />

### 비동기 코드

그러면 '비동기 코드'는 무엇일까? <br />
앞에 상황이 확정되지 않아도 그냥 그 다음으로 다음 코드도 실행할 수 있는,<br />
동시에 실행될 수 있는 코드를 비동기 코드라고 할 수 있다.<br />
그러니까, 실행의 흐름을 막을 수가 없는 것이다.

자바스크립트는 정상적으로 비동기 코드를 만들어 낼 수가 없다.<br />
코드를 중간에 멈추게 할 수가 없기때문에 '연출'이 필요하다.

```js
function calcValue(a, b) {
  setTimeout(() => {
    return a + b; // 반환해도 받아줄 변수가 없다. 이미 실행되고 지나갔다 🚌💨💨💨
  }, 100);
}

const r = calcValue(10, 20); // calcValue에 명시적 return이 없어 undefined가 반환.
const z = r; // z에도 undefined 반환.
```

calcValue의 코드 흐름과 안쪽 코드의 실행 흐름이 맞지 않는 것.

<br />

### 비동기코드와 콜백함수

```js
function calcValue(a, b, cb) {
  setTimeout(() => {
    cb(a + b);
  }, 100);
}

const r = calcValue(10, 20, (result) => {
  console.log(result); // 30, const z = r; 이 실행되고 한참 후(!)인 0.1ms후에 실행된다.
});
const z = r;
```

이 비동기 코드와 콜백함수가 많아지면 굉장히 복잡해진다.<br />
그래서 나온 것이 Promise 규격이다.

<br />

### Promise

- 인스턴스 객체를 만들게 되어있다. (`new 연산자`)
- Promise에 정의한 함수에는 2개의 인자가 주어진다. (resolve와 reject, 둘 모두 함수다.)
- 성공의 의미로 `resolve()`를 실행하면, 인스턴스 객체의 `.then()`의 '인자 함수'(function)의 '인자'(parameter)로 받아진다.
- `reject()`를 실행하면? `.catch()`가 받는다.

```js
const p = new Promise((resolve, reject) => {
  resolve("OK");
  // reject("실패");
});

p.then(function (ok) {
  console.log(ok); // OK.
}).catch(function (error) {
  console.log(error); // '실패'
});
```

콜백 함수보다 좋은 이유는, 바로 `.then()` 체이닝 때문~

```js
p.then(function (ok) {
  console.log("첫번째 성공");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("두번째 성공");
    }, 3000);
  });
}).then(function (ok) {
  console.log(ok);
});
```

<br />

async/await을 이해하는 백그라운드... :)
