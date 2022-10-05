## 값(Value)

JavaScript, TypeScript의 값이라고 하는 주제는 굉장히 광범위한 주제다. <br />
(100시간 정도를 강의해도 모자를 정도로 내용이 방대하고 양도 많고 ^^;) → 꾸준히 자가학습해야 한다는 것!

ref.

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)

[https://typescript-kr.github.io/pages/basic-types.html](https://typescript-kr.github.io/pages/basic-types.html)

---

```
1. JavaScript 기본 자료형
2. TypeScript 자료형
3. 열거형 (Enum)
4. 그 외의 값
```

<br />

**JavaScript**

- Boolean <br />
  \: True/False
- Null <br />
  \: 값이없다.
- Undefined <br /> 
  \: 값이 정의되어 있지 않다. (자바스크립트에만 있는 특별한 데이터 타입 중 하나다.)
- Number <br /> 
  \: 숫자 (자바스크립트는 정수, 소수점이 있는 실수를 동일하게 취급한다.)
- Bight - (추가됐내...?)
- String <br />
  \: 문자
- Symbol
- 별도로, Object <br />
  \: 위 기본형 외에 거의 모든 데이터 타입은 Object라고 보면 된다. <br />
  즉 *javascript에서는 왠만하면 모두 다 object으로 취급*한다는 걸 알 수 있고, 배열뿐만 아니라 함수조차도 object으로 취급한다. <br />
  이 자체로는 어렵지 않지만, 이걸 활용/응용하는 측면에서 굉장히 다양한 테크닉들이 등장해 그것을 학습하기가 굉장히 까다롭다.

<br />

**TypeScript**

1. Boolean
2. Number
3. String
4. Array
   (여기까지는 자바스크립트와 동일하다.)
5. Tuple <br />
   \: 배열 내의 원소의 타입을 제한하고 싶을 때 사용한다.
6. Enum <br />
   \: 타입스크립트만 제공하는 타입 중 하나다.

   ```js
   // javascript
   const Color = {
     Red: 1,
     Blue: 2,
     Green: 3,
   };

   Color.Red;
   ```

   ```ts
   // 위 코드와 동일한 코드를 타입스크립트로 작성했을 때
   enum Color {
     Red,
     Blue,
     Green,
   }

   Color.Red;
   ```

   - 개인적으로는 그렇게 enum을 많이 선호하지는 않는다. <br />
     객체는 데이터일 수 있지만, enum은 '코드'기 때문에 만약에 서버나 외부로부터 어떤 데이터를 가지고 오고, 그 데이터를 객체로 표현해서 실제로 UI에서 다루게 될 때 '변환'해서 사용하는 것이 Object에 비해 어려움이 따른다.
   - enum을 사용할 때, enum이라고 하는 데이터가 실제로 주고받는 용도의 데이터 일 수 있는지 아닌지, 코드 내에서만 존재하면 되는지를 잘 판단해서 사용해야 한다.

   ```ts
   enum Color = {
     Red,
     Blue,
     Green,
   }
   // 유연하다고 볼수도 있지만, 코드내에 Color가 정의되어 있지 않은 경우 이게 enum인지 배열인지 헷갈릴 수도 있어서 이런 부분은 취향을 탈수도 ^^;
   let colorName: string = Color[2];

   console.log(colorName); // Green.
   ```

7. Any <br />
   \: 이것도 타입스크립트에만 있는 타입 중 하나다. <br />
   모든 데이터 타입이라는 뜻을 가지고 있다. <br />
   → 타입스크립트가 자바스크립트 개발자한테 타입스크립트로의 전환을 조금 더 점진적으로 안전하게 할 수 있게 하기 위한, 어떤 면에선 일종의 미끼 상품(^^;) 같은 타입이다.

   타이핑을 일일히 다 하지 않아도 자바스크립트와 똑같이 동작한다고 했을 때, 내부적인 논리적 근거다.

8. Void <br />
   \: 자바스크립트에서도 있던 타입이지만, 아주 특수한 경우에만 사용해왔던 일반적이지는 않은 데이터 타입이다. <br />
   타입스크립트에서는 굉장히 많이 사용한다. 함수에서 'return값이 없는 경우'에 사용하는 것이 대표적인 사용 케이스다.

9. Null and Undefined <br />
   \: 자바스크립트에도 그대로 있는 값이다. 타입스크립트에서는 이를 타입으로도 제공한다.

10. Never <br />
    \: 절대 발생할 수 없는 타입? (뭔가 철학적? 🤔)

    ```ts
    function error(message: string): never {
      throw new Error(message);
    }

    function fail() {
      return error("Something failed");
    }

    function infiniteLoop(): never {
      while (true) {}
    }
    ```

11. Object <br />
    \: 기본 값을 제외한 거의 모든 값이다.

<br />

**한 가지 꼭 알아야 할 원칙**

자바스크립트의 원칙이고, 이것을 그대로 계승하고 있는 타입스크립도 마찬가지인 한 가지 꼭 알아야 할 원칙이 있다.

"언어 레벨에서 `값`으로 `취급`하는 것은 `무엇이든 변수에 넣을 수 있다.`"

는 것이다.

- "값은 데이터니까 변수에 담는게 당연한거 아니야?" 라고 볼수도 있지만, 자바스크립트와 타입스크립트가 이 '값'이라고 하는 측면을 데이터보다 훨씬 더 확장해놨다.
- Object도 값으로 취급한다. 이 Object 안에는 데이터도 들어가 있지만, '코드'(코드의 묶음인 method. 함수.)도 들어가 있다.
- 이를 가지고 할 수 있는 프로그래밍 테크닉이 엄청나게 많기 때문에, `이 원칙을 잘 기억하고` 어떻게 이 개념을 확장해서 다양한 테크닉 또는 구조로 코드를 작성하는지를 잘 학습해야 할 것! (ex. callback 함수)
