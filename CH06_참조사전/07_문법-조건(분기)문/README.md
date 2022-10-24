## 조건(분기)문

```
1. if 문
2. 값의 논리 판정
3. switch 문
4. if vs switch
```

<br />

조건문은 대표적으로 2가지가 있다.
그 유명한(!) if문과 switch문.

<br />

**if 문**

```js
let age = 10;

if (age === 10) {
  console.log("나이는 10세");
} else {
  console.log("모르겠습니다.");
}
```

```js
let age = 10;

if (age === 10 || age > 20) {
  // ...
} else {
  // ...
}

// else if → n개로 확장 가능하다.
// else → 생략 가능하다.
if (age === 10) {
  // ...
} else if (age === 20) {
  // ...
} else {
  // ...
}

if (age === 10) // ... 도 가능하지만, 권장하진 않는 컨베션이다.
```

- 0 외에 모든 숫자는 참으로 판정한다.
- ''(빈문자열) 외에 모든 문자열은 참으로 판정한다.

외 부정적인 뉘앙스의 값들... null, undefined, ...

- {} 객체는 모두 참으로 판정한다.

<br />

**switch 문**

```js
let age = 1;

switch (age) {
  case 1:
    console.log(1);
  case 2:
    console.log(2);
  case 3:
    console.log(3);
  default:
    console.log("??");
    break;
}

// 1
// 2
// 3
// ??
// → break(중단점이 있는 데 까지 실행한다)

// break를 넣어서...
let age = 1;

switch (age) {
  case 1:
    console.log(1);
    break;
  case 2:
    console.log(2);
    break;
  case 3:
    console.log(3);
    break;
  default:
    console.log("??");
    break;
}

// 1 → Good.
```
