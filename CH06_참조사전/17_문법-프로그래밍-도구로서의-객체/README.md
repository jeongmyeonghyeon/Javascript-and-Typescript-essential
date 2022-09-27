#### 객체 - 프로그래밍 도구로서의 객체

객체의 2가지 측면으로 바라볼 수 있을 것이다.
데이터로서의 객체와 프로그래밍 도구로서의 객체.

---

```
1. Circle 클래스
2. Rect 클래스
3. 도구 함수의 사용
4. private 속성
```

객체가 순수하게 데이터만 담고 있는 경우도 많이 있겠지만,
실제로 프로그래밍을 하다 보면
어떤 대상을 '객체화'하여 그 대상을 표현하는 경우도 많이 있다.

대상을 표현한다는건 어떤걸까?

어떤 대상(!)이 데이터도 갖고 있겠지만,
어떤 행위나 동작 요소를 갖고 있는 경우들도 있는데
이런 부분들을 어떻게 어떻게(!) 객체를 통해서 프로그래밍 하는 거라고 볼 수 있다.

```ts
const circle = new Circle(50);
const rect = new Rect(150, 200);

// 반지름을 넘겨줘야 한다는 걸 알고 있어야하고... 이 면적을 구하는 함수가 뭔지도 알아야 하고... 사용하는 쪽이 너무 많은 정보를 알고 있어야 한다.
console.log(calculateCircleArea(circle.radius));
console.log(calculateRectArea(rect.width, rect.height));

// ...굿(!)
console.log(circle.area());
console.log(rect.area());
```

**+JavaScript의 private 지원 문법 추가 → `#`**

```js
class Rect {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  area = () => this.#width * this.#height;
}
```
