## 일급 함수

프로그래밍 언어에서 함수라고 하는 코드의 묶음을 일반적인 값처럼 취급하는 개념을 뜻한다.

(그게 무슨 뜻이죠...? 😂)
→ '변수로 넣을 수 있다.'는 뜻 ^^;

---

```
1. 인자로 전달되는 함수
2. 반환 값으로 전달되는 함수
3. 표현력의 차이
```

<br />

**반환 값으로 전달되는 함수**

표현력의 차이
\: 다음 중 가장 표현력이 좋아보이는 함수는? ^^;

```ts
function salePrice(discountRate, price) {
  return price - price * (discountRate * 0.01);
}

// (1)
console.log(salePrice(10, 567000)); 
console.log(salePrice(30, 567000));

function discountPrice(discountRate) {
  return function (price) {
    return price - price * (discountRate * 0.01);
  };
}

// (2)
console.log(discountPrice(30)(567000)); 
console.log(discountPrice(10)(567000));

let summerPrice = discountPrice(30);
let winterPrice = discountPrice(10);

// (3) ✅
console.log(summerPrice(567000));
console.log(winterPrice(567000));

```
