## 식별자 (Identifier)

ref.

[https://developer.mozilla.org/ko/docs/Glossary/Identifier](https://developer.mozilla.org/ko/docs/Glossary/Identifier)
[https://developer.mozilla.org/ko/docs/Glossary/Unicode](https://developer.mozilla.org/ko/docs/Glossary/Unicode)

---

```
1. 식별자의 정의
2. 코드로 이해하는 식별자
3. 객체 속성으로서의 식별자
4. 네이밍 컨벤션
```

- 식별자는 코드 내의 '변수', '함수', 혹은 '속성'을 식별하는 문자열이다.

- JavaScript의 식별자는 대소문자를 구별하며 유니코드 글자, `$`, `_`, 숫자(0-9)로 구성할 수 있지만, 숫자로 시작할 수는 없다.

  - (+) 공백 문자.
  - (+) 길이에 대해,
    - 특별히 길이를 제한을 두고 있진 않지만, 개발자가 쓰고 사용함에 있어 자연스럽게 길이가 제한이 되긴 한다. 통상적으로 JavaScript, Typescript 개발자들이 변수명을 길게 짓는 것을 선호하지 않는 경향성이 있어 보인다. (짧막짧막하게)

- 식별자는 코드의 일부이지만, 문자열은 데이터이기 때문에 식별자와 문자열은 다르다. JavaScript에서 식별자를 문자열로 변환하는 방법은 없지만, _어떤 경우 문자열을 분석해 식별자로 사용할 수 있다.(computed property)_

  - 데이터로 만들어진 식별자

    ```js
    const obj = {
      age: 10,
      ['myName']: 'J',
      ['123my Name']: 'J',
    }

    // 데이터가 식별자화 되었다. ^^;
    obj.myName;
    // 공백도 포함 가능하고, 숫자로도 시작할 수 있다.

    o.123my Name; // 은 코드 상의 식별자 명명 규칙에 어긋나므로

    // 만들었을 때의 똑같은 방식, 즉 데이터로써 브래킷을 이용한 속성 명 접근방법을 사용하면 접근이 가능하다.
    o['123my Name'];
    ```

- 변수명은 변수가 담고 있는 데이터를 잘 표현하는 이름.
- 함수명이라고 하면 그 함수가 하는 일을 잘 표현하는 이름.
- 객체 내의 속성명은 객체에 어떤 역할을 가지고 있는가의 관점에서 의미를 잘 표현해서.
- 다만, 관습적인 컨벤션이 있다.

  ```js
  // 상수 대문자
  const AGE = 10;

  // 단어의 구분 - 카멜 케이스
  function setAge() {}
  ```
