#### 타입가드

타입스크립트 내에서 어떤 변수가 2개 이상의 타입을 갖게 되는 경우가 있을 때,
코드 상에서 a라는 타입이 들어왔을 때 작동될 수 없는 코드에 대해서 경고를 해 주거나,
혹은 그것을 원천적으로 막을 수 있는 코드 테크닉,
혹은 코드 방식을 타입 가드라 한다.

---

```
1. 함수 내의 타입 가드
2. 인터페이스를 활용한 타입가드
```

**함수 내의 타입 가드**

```ts
function doubleTypeFunction(a: number | string) {
  if (typeof a === "string") {
    return a.replace("x", "X");
  }

  return a.replace("Y", "y"); // 타입스크립트 Error.
}

doubleTypeFunction(10);
```

```ts
function foo(a?: number | null) {
  if (a === null) return;

  console.log("display before");
  console.log(a?.valueOf());
  console.log("display after");
}

foo();
```

※ 위 샘플 코드의 `a?.valueOf`에 대해...

`?`를 통해 타입스크립트 에러표시도 없애고, 프로그래밍이 죽지는 않는다.
근데 이게 좋은걸까? 모르겠다.
애플리케이션이 '종료가 되어야 할 때는 종료가 되어야' 한다.
왜냐하면 정상 동작이 아닌채로 종료가 안돼서 아래에 있는 코드가 실제로 작동되면 안 되는 상황이 있을 수 있다.
그런 경우에는 종료가 되는 게 불필요한 오작동을 막을 수 있는 길인 것인다.

그래서 위 코드에서의 `?`는 사실 그렇게 적절한 기능 같지는 않다.

**인터페이스를 활용한 타입가드**

```ts
interface Foo {
  foo: string;
  common: string;
}

// is... 타입스크립트의 타입 가드용 체크 함수를 기술하는 방법.
function isFoo(arg: any): arg is Foo {
  return arg.foo !== undefined;
}

console.log(isFoo({ foo: "ok", common: "wow"));
console.log(isFoo({ foo: "ok", common: "wow", active: false })); // active라는 속성이 Foo에 없음애도 불구하고, 타입가드에서는 확인하지 못하는 한계는 존재한다.
```
