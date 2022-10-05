## 컨텍스트

자바스크립트와 타입스크립트를 학습할 때 기본적인 진입 장벽으로 작용하는 몇 가지 중 하나.<br />
배우기 어려운 것은 변화가 굉장히 무궁무진 하기 때문...

---

```
1. Person 객체
2. 두 가지 종류의 컨텍스트
3. 컨텍스트 객체 지정하기
4. 어휘 컨텍스트
```

(1)

```js
const person = {
  name: "Kim min tae",
  age: 40,
  getAge() {
    return this.age;
  },
};

person.age;
person.getAge(); // 40... (음... 당연하다?)
```

```js
const age = person.getAge;

age(); // undefined. (...!? 왜 이렇게는 접근을 못할까...? 이것이 바로 컨텍스트!)
```

<br />

**두가지 종류의 컨텍스트**

- execution 컨텍스트 (실행 컨텍스트, 기본 컨텍스트)

우선, 실행을 한다는 것은 어떤 뜻인지 살펴보면, 실제로 어떤 객체의 메소드에 접근을 한다는 뜻이다.<br />
즉, 호출한다는 뜻인 것. execution.<br />
위에서의 호출은 바로 `person.getAge();` 이다.<br />
이렇게 호출하는 맥락(컨텍스트)에서 이 호출 함수 안쪽에 그 맥락을 가리키는 지시어가 this인데,<br />
그러면 이 this라고 하는 객체의 맥락은 뭐냐고 하면,<br />
바로 '소유자'라고 하는 맥락이다. 이 함수를 소유하고 있는 소유자는 누구인가 라고하는 (...)

위 샘플코드에서 소유자는 person 객체 인데, <br />
코드상으로 보면 '아, 이 getAge의 소유자는 person객체야' 라고 알 수 있지만,<br />

자바스크립트는 실행 컨텍스트라고 하는 메커니즘을 갖고 있기 때문에 <br />
샘플 코드와 같이 person 객체의 소유물로 getAge를 만들어놨다고 하더라도 <br />
실제로는 '실행하는 순간' (소유자가) 결정이 된다.

```js
person.getAge(); // 에서는 소유자가 person이니까 getAge안에서 정상적으로 person의 age가 this로써 접근이 되는 것이다.
```

하지만, 아래의 코드에서는

```js
const age = person.getAge;

/**
 * age가 getAge인건 분명한데, 호출되는 맥락 상 소유자가 확인이 되는가?를 보면 소유자 확인이 되지 않고 있다. (소유자가 벗겨진다고 표현함.)
 * 즉, age 함수를 실행하는 순간에 소유자 확인이 안 되고 있는 것이다. 
 * 그래서 소유자가 없으니까. this.age가 없어서 undefined가 되는 것이다.
 */

age(); // undefined
```

<br />

**call과 apply로 컨텍스트 객체 지정하기**

함수라면 기본적으로 제공해주는 메소드. call과 apply

```js
const age = person.getAge;

age.call(person); // 40
```

<br />

**bind**

call, apply로 매번 호출할 때마다 지정해주는게 아니라 클래스를 만들 때 아예 고정시켜주는 방법.

```js
constructor(name: string, age: number){
    this.name = name;
    this.age = age;
    this.getAge = this.getAge.bind(this); // ✅
}
```

<br />

이거 말고 더 편리한 방법이 있는데,
그게 바로 lexical 컨텍스트다.

- lexical컨텍스트. (어휘 맥락)

우리가 코드로 보는 그 자체에서 `this`가 이 녀석이구나라고 알 수 있는, <br />
어휘적으로 확인되는 그 this로 언제나 고정되는 컨텍스트다.

이를 위해 필요한 특별한 문법이 있는데, 그것이 바로 애로우 함수다. <br />
애로우 함수로 매소드를 만들면,<br />
애로우 함수를 만드는 그 순간에 어휘적 공간에서의 this가 연결이 된다.

```js
class Person {
  // ...
  getName = () => this.name;
}

p1.getName();

const x = p1.getName;
x(); // ✅
```

this를 적극적으로 사용하지 않는다고하면, 애로우 함수를 이용하는 것이 편하다. <br />
왜 this를 고정하지 않지? 라고 생각할수도 있지만, <br />
그런 특성을 이용한 고급 테크닉들도 존재한다. :)
