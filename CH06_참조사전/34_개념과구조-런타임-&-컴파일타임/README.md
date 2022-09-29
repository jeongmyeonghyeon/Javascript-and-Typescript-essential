#### 런타임 & 컴파일 타임

---

```
1. add 함수
2. TypeScript의 한계
```

작성 코드

```ts
function add(x: number, y: number): number {
  return x + y;
}

add(10, 20);
```

위 TypeScript 코드의 런타임 코드

```js
"use strict";
function add(x, y) {
  return x + y;
}
add(10, 20);
```

하지만, 위와 같이 변환된 런타임 코드에 서버로 부터 받아 온 잘못된 타입으로 데이터가 들어간다면?

**타입스크립트의 한계**

```ts
function add(x: number, y: number): number {
  return x + y;
}

type ObjType = {
  x: number;
  y: number;
};

const json = `{"x": "abc", "y": 20}`;
const obj: ObjType = JSON.parse(json) as ObjType;

add(10, 20);
```

이렇게 런타임 상황, 외부로부터 데이터를 공급받는 상황에
외부의 데이터 자체가 오염됐을 때는 문제가 생길 여지가 당연히 있다.

이와같은 어떤 데이터를 받고 그 데이터를 함수에 넘겨주는데 어떤식으로 방어 코드를 쓸 수 있을까
연구하고 그런 부분들을 많이 겪어보고 트러블슈팅을 하면서 마일리지를 쌓아나가야 할 것이다.

그 마일리지를 쌓기 전까지는 컴파일 타임과 런타임에 타입스크립트가 지켜 주지 못하는 상황도 있을 수 있다고 하는 명확한 인지를 하고 있는것도 굉장히 중요하다.
