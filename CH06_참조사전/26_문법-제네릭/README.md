#### 제네릭

타입스크립트가 제공하는 타이핑 방법 가운데 고급 기법이라고 할 수 있는 제네릭.

굉장히 편리한 문법이지만 적응하는 데 조금 시간이 걸리고, 학습이 꽤 많이 필요한 용법. 😅

---

```
1. 제네릭 정의
2. 제네릭의 사용
3. 클래스 제네릭
4. 인터페이스 제네릭
```

```ts
type User = {
  id: number;
  name: string;
};

type Address = {
  zipcode: string;
  address: string;
};

function pipeOne(value: any): any {
  return value;
}

function pipeTwo<T>(value: T): T {
  return value;
}

let p1 = pipeOne(10);
let p2 = pipeTwo("10");
let p3 = pipeTwo(true);
```

...🤔? 사용하고 안하고가 별 차이가 없는데...?
실제 제네릭의 차이가 명확하게 드러나는 것은 바로 '객체'를 쓸 때.

```ts
const pipeObjectOne = <T>(obj: T): T => {
  return obj;
};

let po1 = pipeObjectOne({ id: 1, name: "김", zipcode: 50213 });
let po2 = pipeObjectOne<User>({ id: 1, name: "김", zipcode: 50213 }); // zipcode에서 에러. :)
```

**클래스 제네릭**

```ts
class State<S, Config = {}> {
  private _state: S;
  config: Config;

  constructor(state: S, config: Config) {
    this._state = state;
    this.config = config;
  }

  getState(): S {
    return this._state;
  }
}

let s1 = new State<Address, { active: boolean }>(
  {
    zipcode: 50213,
    address: "서울시",
  },
  {
    active: true,
  }
);

const s1Data = s1.getState();

console.log(s1Data.zipcode, s1Data.address, s1.config.active);
```

굉장히 편리한 문법이지만 적응하는 데 조금 시간이 걸리고, 학습이 꽤 많이 필요한 용법. 😅

조금 더(!) 고급 기법.

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m"); // 타입 체크.
```

**인터페이스 제네릭**

인터페이스에서도 제네릭의 활용이 가능하다.

```ts
interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kv1: KeyPair<number, string> = { key: 1, value: "Kim" };
let kv2: KeyPair<number, number> = { key: 2, value: 12345 };
```

...활용처가 무궁무진...
고급 기법은 굉장히 어렵다.
