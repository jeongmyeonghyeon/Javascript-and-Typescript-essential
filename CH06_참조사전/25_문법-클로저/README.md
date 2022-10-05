## 클로저

---

```
1. 1씩 큰 값을 반환하는 함수
2. 값 보호하기
3. 클로저 확인하기
4. 타입스크립트의 객체 속성 보호
```

<br />

### 예제 케이스 - 1씩 큰 값을 반환하는 함수

```js
let saveNumber = 1;

function increment() {
  return saveNumber++;
}

console.log(increment());
console.log(increment());

saveNumber = 200; // ✅

console.log(increment());
```
변수를 보호하지 못하고 있다. 원천적으로 바깥쪽에서는 접근하지 못하게 만드는 방법이 필요하다!

<br />

### 값 보호하기

```js
function increment() {
  let saveNumber = 1;
  // 함수를 반환한다.
  return function () {
    return saveNumber++;
  };
}

const inc = increment();

console.log(inc());
console.log(inc());
console.log(inc());

// saveNumber = 200; // 동작하지 않는 코드.
```

<br />

🤔 "실행 시점상 사라진(!) 바깥 함수의 내부의 변수가 어떻게 되살아나서 호출되는 것일까?"

함수 내부에서 함수가 호출 될 때, <br />
반환하는 함수가 만들어지는 상황에서 함수 안쪽에 있는 코드 중에 바깥 함수에 있는 변수에 접근을 하게 되면, <br />
_이 접근한 변수를 `클로저`라고 하는 특별한 공간에 저장을 해둔다._ <br />

![VS Code Debugger console](https://user-images.githubusercontent.com/19165916/192702416-61a5aed3-2d87-462e-a38a-37cfc6df1ef0.png)

그러고 나서 함수가 반환되고나면 함수 바깥에 있던 함수의 지역 공간은 사라져서 <br />
바깥 함수에 있던 변수(`saveNumber`)는 사라지지만, <br />
안쪽 함수, 즉 반환하는 함수가 만들어지면서 옮겨졌던 클로저라는 공간에는 <br />
여전히 바깥 함수에 있던 변수(`saveNumber`)가 유지되고 있다.

<br />

### 타입스크립트의 객체 속성 보호

```ts
class MyObj {
  private saveNumber = number;
}
```
