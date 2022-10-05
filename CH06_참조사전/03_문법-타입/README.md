## 타입

---

```
1. 간단한 함수 addAge
2. 버그 만들기
3. 방어코드
4. TypeScript
```

<br />

**JavaScript 의 Type과 TypeScript의 Type.**

```js
function addAge(age) {
  return age + 1;
}

let age = addAge(30);
console.log(age); // 30

let age = addAge("30");
console.log(age); // 301

// 방어코드
function addAge(age) {
  if (typeof age === "number") {
    return age + 1;
  } else {
    // ??? ㅠㅠ 상황.
    // return 0? '안되요~'? throw? 코드 흐름을 여기서 끝내도 되나? ㅠㅠ 상황.
  }
}
```

- 자바스크립트는 변수의 타입을 매번 데이터가 들어가는 시점에 자유롭게 바꾸는 매커니즘이다.
- 느슨한 관리와 그 불안정성을 갖는다.
- 오류가 런타임에서 발생한다.

```ts
function addAge(age: number): number {
  return age + 1;
}

let age: number = addAge(30);
console.log(age);

let age: number = addAge("30"); // 당연하지만 바로 Error~
```

- 느슨한 관리와 그 불안정성. → 타입스크립트가 온전히 해결해 주고 있다.
- 당연하다고 할 수 있지만, 오류가 개발자가 개발하고 있는 순간 컴파일에서에서 발견할 수 있다는게 타입스크립트의 가장 중요한 가치다. ⭐️⭐️⭐️
