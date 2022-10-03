#### JavaScript는 어떻게 변해갈까?

나온지 거의 20년, 30년 가까이 돼 가고 있는 상황... :)

---

```
1. 과거와 현대의 비교
2. JavaScript 변화의 방향
```

**과거와 현대의 비교**

- 가변 인자

  ```js
  // 기존
  function foo() {
    for (let i = 0; i < arguments.length; i++) {
      arguments[i];
    }
  }

  // 현대
  function Foo(...args) {
    for (let i = 0; i < args.length; i++) {
      args[i];
    }
  }

  // 같이 놓고 비교 - 다음 중 가변인자를 처리할 것 같은 함수는...? 😅
  function foo() {}
  function Foo(...args) {}
  ```

<br />

- 배열

  ```js
  const arr = [1, 2, 3, 4];

  // 기존
  const newArray = arr.concat([5, 6, 7, 8]);
  console.log(newArray); // [1, 2, 3, 4, 5, 6, 7, 8]

  // 현재
  const NewArray = [...arr, 5, 6, 7, 8];
  console.log(newArray); // [1, 2, 3, 4, 5, 6, 7, 8]

  // 같이 놓고 비교
  const _newArray = arr.concat([5, 6, 7, 8]); // concat을 모른다면...? 😅
  const _NewArray = [...arr, 5, 6, 7, 8];
  ```

<br />

- 객체

  ```js
  const obj = {
    a: 1,
    b: 2,
  };

  // 기존
  console.log(Object.assign({}, obj, { a: 10, c: 3, d: 4 })); // { a: 10, b: 2, c: 3, d: 4 }

  // 현재
  console.log({ ...obj, a: 10, c: 3, d: 4 }); // { a: 10, b: 2, c: 3, d: 4 }

  // // 같이 놓고 비교 - Object.assign을 모른다면? 각 인자에 대한 정보... → '학습 비용'으로 이어진다.
  Object.assign({}, obj, { a: 10, c: 3, d: 4 });
  ({ ...obj, a: 10, c: 3, d: 4 });
  ```

<br />

- 클래스

  (기존)

  ```js
  function Baz() {
    this.name = "baz";
  }

  Baz.prototype.getName = function () {
    return this.name;
  };
  // 추가 메소드가 필요할 때마다 prototype이 계속 반복될 것이다.

  const baz = new Baz(); // new 연산자를 빼먹는 순간, 전혀 의도한대로 동작하지 않는다.
  baz.getName();

  // 어떤 측면에서는 불안정하고, 불편한 측면이 있다.
  ```

  (현재)

  ```js
  class Baz() {
    constructor() {
      this.name = 'baz';
    }

    getName() {
      return this.name;
    }
  }
  ```

<br />

- 특정 변수를 보호하고 싶은 경우

  (기존)

  ```js
  function makeObject() {
    let save = true;

    return {
      setSave: function (s) {
        save = s;
      },
    };
  }

  const mo = makeObject();

  mo.save; // 클로저영역에 잡혀있어서, 당연히 접근이 불가능 :)
  mo.setSave(true); // 제한적인 접근만 허용한다.
  ```

  (현재)

  ```js
  class MakeObject {
    #save;

    constructor() {
      this.#save = true;
    }

    setSave(s) {
      this.#save = s;
    }
  }

  const MO = new MakeObject();
  MO.setSave(false);
  MO.# // 이미 error ^^; 왜 굳이 #이였을까 😅
  ```

<br />

**JavaScript 변화의 방향**

자바스크립트의 스펙은 표현력이 명시적이고 풍성한 형태로,
그리고 누가 봐도 이 코드가 어떤 일을 하는지를 명확하게 알 수 있는 형태로 발전하고 있는 것 같다.
그래서 새로운 문법을 학습하거나 코드를 작성할 때도
자바스크립트의 변화 흐름에 맞춰서 누가 봐도 명확하고, 어떤 의도인지를 분명하게 드러낼 수 있는 코드를 작성하는 연습을 해 보는게 훨씬 좋을 것이고, 또 새로운 문법이 나왔을 때도 그런 문법들이 왜 나왔는지,
분명히 이 흐름에 맞춰서 "의도를 조금 더 분명하게 드러내기 위한 용도로 나왔을 수도 있겠구나." 라는 맥락으로 문법을 한번 살펴보고 학습해 보면 훨씬 더 빠르게 익히고 이해를 빨리 할 수 있을거라고 생각한다.
흐름을 안다는 것은 그만큼 중요한 측면이 있다는 것~~~

100% 맞는 다는 보장은 없지만, 😅
이런 흐름이 보이는 듯하다.
