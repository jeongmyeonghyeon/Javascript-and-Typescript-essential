## 속성과 메소드

객체 안에 들어가 있는 2가지 종류의 데이터다. <br />
- 순수 데이터: 속성
- 코드의 묶음인 함수가 들어가 있는 속성: 메소드

속성과 메소드의 형태적 차이와 구성 정보를 어떻게 컨트롤 할 수 있는지를 살펴본다.

---

```
1. 축약형 메소드
2. Getter, Setter
3. 객체 구성
```

<br />

```js
const obj = {
  name: "Myeong Hyeon",
  age: 13,
  getFamilyName: function () {
    return "Jeong";
  },
  getMbti() {
    // 위 메서드의 축약형. 우리의 손은 소중하니까~
    return "ISFP";
  },
  getLastName: () => "Jeong", // context에 따라 다른 동작을 한다.
};

obj.name;
obj.age;
obj.getFamilyName();
obj.getMbti();
```

<br />

**Getter, Setter**

```js
obj.age = 200;
obj.age = -500;
```

위와 같은 입력을 막고싶을 때, 속성으로 막을 방법은 없다. <br />
그래서 객체 내부적으로는 실제 함수인데 <br />
객체 외부에서는 속성처럼 보이게 하는 것을 사용한다. 바로 Getter와 Setter. <br />

객체를 만드는 다른 방법가운데 class가 있다.

```js
class Person {
  _bloodType: string;

  constructor(bloodType: string) {
    this._bloodType = bloodType;
  }

  /**
   * Setter
   * 
   * bloodType(bloodType: string) {
   *   this._bloodType = bloodType;
   * }
   * 
   * 위 함수를 p1.bloodType() = 'C' 가 아니라,
   * p1.bloodType = 'C'과 같이 속성에 넣듯이 하고 싶으면,
   * 함수 앞에 'set'을 붙인다.
   */
  set bloodType(bType: string) {
    // 방어코드
    if (bType === "A" || bType == "B" || bType === "O" || bType === "AB") {
      this._bloodType = bType;
    }
  } 
  /**
   * Getter
   *  
   * 이때 p1.bloodType은 작동을 하지 않는다.
   * 그래서, 밖에서 값을 읽을 수 있는 Getter를 만들어준다.
   */
  get bloodType() {
    return `${this._bloodType}`;
  }
}

const p1 = new Person("A");

p1.bloodType = "C";
```

<br /> 

**객체구성과 추가&삭제**

```js
const obj = {
  name: "Myeong Hyeon",
  age: 13,
  getFamilyName: function () {
    return "Jeong";
  },
  getMbti() {
    // 위 메소드명: function() { ... }의 축약형. 우리의 손은 소중하니까~
    return "ISFP";
  },
  getLastName: () => "Jeong", // context에 따라 다른 동작을 한다. (※ 실행컨텍스트)
};

obj.bloodType = "A"; // 추가 - 자바스크립트의 동적 바인딩 기능을 이용해서 자동으로 추가된다.
delete obj.bloodType; // 삭제
```

<br />

**경우에 따라 `delete` 연산자로 객체의 속성을 삭제가 안되게 하고 싶을 경우, 2가지 방법**

(1) 타이핑

```ts
type MyObject = {
  name: string;
  age: number;
  getFamilyName: () => string;
  getLastName: () => string;
  getMbti: () => string;
};

const obj: MyObject = {
  name: "Myeong Hyeon",
  age: 13,
  getFamilyName: function () {
    return "Jeong";
  },
  getMbti() {
    return "ISFP";
  },
  getLastName: () => "Jeong",
};

delete obj.name; // ✅ 타입스크립트 에러가 난다.
// 만약 Error를 없애고 싶은 경우(삭제를 허용할 경우)에는 name을 옵셔널로 변경한다. → name?: string;
```

(2) Object.create

```js
// 첫 번째 인자는 부모 객체로서 작동되게 될 객체를 입력받는다. (프로토타입 관련, 일단은 null)
// 두 번째 인자가 구성 객체이다.
const myObj = Object.create(null, {
  name: {
    value: "Myeong Hyeon",
    writable: false, // readonly
    configurable: false, // 속성을 지울 수 없다.
  },
});

myObj.name;
```

그냥 객체를 선언하는 것보다 복잡해서 잘 쓰이지는 않지만, <br />
자바스크립트만으로 제약을 주고 싶은 경우 사용한다.
