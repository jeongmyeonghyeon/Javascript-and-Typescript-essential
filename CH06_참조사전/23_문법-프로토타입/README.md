## 포로토타입

흔히 프로토타입 기반 언어라고 말하는 자바스크립트.
이를 알아보자.

---

```
1. 3개의 서로 다른 객체
2. 객체의 `__proto__` 연결
3. 함수의 prototype
```

<br />

**프로토타입 체이닝(프로토타입 매커니즘)**

"모든 객체"는 `__proto__`라고 하는 굉장히 독특한 속성을 하나씩 갖고 있다.<br />
"이는 어떤 역할을 하는 것일까?" <br />
비밀은 바로 "어떤 객체"를 가리키고 있다.

"어떤 객체를 가리키고 있는가?"

모든 Object의 조상인 Object라고 하는 객체.

```js
console.log(c1.toString()); // [object Object]
```

그러면, 어떻게 일반 객체에서 Object의 `toString()` 메소드가 호출될까?

- c1이 갖고 있는 메소드 중에 `toString`이 있는가를 찾아보고
- 없으면, c1이 갖고 있는 `__proto__`가 가리키고 있는 객체에 `toString`이 있는지 찾아본다.
- 있다면, 동작. 없다면, undefined가 되는 것이다.

```js
const c1 = {
  name: "C1",
  color: "red",
};

const c2 = {
  name: "C2",
  width: 300,
};

const c3 = {
  name: "C3",
  height: 100,
};

console.log(c1);
console.log(c2);
console.log(c3);

c1.__proto__ = c2;
console.log(c1.width); // 300, 이건 c2의 width.
```

※ c1에서 width를 찾고, 없으면 c1의 프로토타입 속성이 가리키고 있는 객체가 있으면, 이 객체에서 width를 찾는다. 있으니까, c2.width인 300을 출력한다.

```js
c1.__proto__ = c3;
console.log(c1.width); // undefined.
```

"이런 매커니즘을 활용해볼 수 있는 방법은 뭐가 있을까?"

재활용.<br />

\: 객체 하나하나는 자기가 가지고 있으면 딱 좋을 데이터와 메소드만 가지고 있고,<br />
공통적으로 사용될 만한 것들은 상위 객체에 만들어 놓은 다음에 프로토타입을 연결만 시켜서 재활용을 할 수 있는 매커니즘이라고 보면 이해가 쉬울 것이다.

"이는 자바스크립트 객체에 모두 통용된다."

하지만, 조금 색다른 매커니즘이 있는데 바로 함수의 프로토타입 매커니즘이다.

<br />

**함수의 prototype**

```js
function Foo(name) {
  this.name = name;
  // (3) 함수도 일반 객체니까, __proto__를 당연히 가지고 있고, new 연산자가 여기에 prototype을 넣는 작업을 한다.
  this.__proto__ = Foo.prototype;
}

// (2) 함수는 객체와 다르게, prototype 이라고 하는 풀 네임의 속성을 가지고 있다.
Foo.prototype.lastName = "WooWa"; 

const f = new Foo("Jeong myeong hyeon");

console.log(f.name);
console.log(f.lastName); // (1) 어떻게 lastName에 접근이 가능할까?
```
