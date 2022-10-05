## 형태의 변환 - 객체를 문자열로 변환하기

애플리케이션을 작성하다 보면 '객체'를 '문자열'로 변환해야 하는 경우들이 많다.<br />
단순히 JSON.stringify라고 하는 형태로 문자열로 변환해도 되지만,<br />
이는 객체를 다시 객체화하기 위해서 '임시 저장하기 위한 객체 형태로 문자열 변환'이고,<br />
여기서는 객체를 완전히 다른 형태의 문자열로<br />
예를 들면, 엑셀 같은 csv 형태로 변환한다거나 이런 용도의 변환 과정을 다뤄 볼 것이다.

---

```
1. 명령형과 함수형 스타일
```

<br />

### 명령형(전통적인 형식의 반복문을 활용한 방법)

문자열 포맷: id,item,price,discount

```js
const cartItem = [
  { id: 1, item: "핸드밀", price: 40000, discount: 0 },
  { id: 2, item: "A4용지", price: 4000, discount: 0 },
  { id: 3, item: "수영복", price: 120000, discount: 0 },
  { id: 4, item: "색연필72색", price: 150000, discount: 0 },
];

const cartItemsArray = [];
for (const item of cartItems) {
  const row = [];

  // entries 반환 형태, ['id', 1]
  for (const [, value] of Object.entries(item)) {
    row.push(value);
  }

  cartItemsArray.push(row.join());
}

console.log(cartItemsArray.join("===")); // '1,핸드밀,40000,0===2,A4용지,4000,0===3,수영복,120000,0===4,색연필72색,150000,0'
```

<br />

### 함수형 스타일

```js
const extractValueInObject = (obj) =>
  Object.entries(obj).map(([, value]) => String(value));

const cartItemString = cartItems.map(extractValueInObject).join("===");

console.log(cartItemString); // '1,핸드밀,40000,0===2,A4용지,4000,0===3,수영복,120000,0===4,색연필72색,150000,0'
```

명령형보다 장점이라고 한다면, 여러 변수를 선언해서 꽤 복잡하게 해야했던 코드가<br />
함수형을 통해 배열 연산, 함수 연산을 이용하면 굉장히 간단한 코드로도 변환을 수행할 수 있다.

물론 이 코드가 어렵냐/쉽냐에 대한 부분은<br />
entries, map, join, 이 메소드들을 체이닝 걸어서 연결하는 것에 얼마나 능숙하게 연습되어 있느냐에 굉장히 다르게 느껴질 것이다.<br />
연습이 되어있지 않다면, 읽기 조차 힘들고 어떻게 작동되는 건지 잘 모르겠고 하는 느낌을 받을 수 있을 것이다.<br />
하지만, 연습이 되어 있다면 직관적으로 가볍게 '아 변환을 하내~?' 하는 생각이 들 수도 있다.
