## 형태의 변환 - 객체의 병합 (merge)

a와 b, 혹은 n개의 객체를 다른 하나의 객체를 만들어서 합치는 작업을 굉장히 많이 하게 된다.<br />
이때 가장 많이 신경써야 하는 부분은, 객체는 '참조용(원본 데이터의 위치값만 이동)'이라고 하는 것이다.<br />
_실제로 복사된 것 같지만 복사되지 않고, 복사됐다고 생각한 데이터가 바뀌면 원본도 같이 바뀌어서 모든 데이터가 바뀌어 버리는 문제가 발생한다._<br />

이런 부분이 객체를 병합할 때, 신경써서 병합하지 않으면 문제가 발생하고 곧 버그로 이어질 수 있기 때문에 '객체 병합'/'객체 복사'는 중요한 이슈 중에 하나다.

---

```
1. 병합 연산
```

<br />

### 객체의 2depth 부터 생기는 문제, "얕은 복사(shallow copy)와 깊은 복사(deep copy)." 🙂

```js
const sourceObject = {
  traits: {
    first_name: {
      value: "Bob",
      source_id: 1,
      updated_at: 1623238587468,
    },
    emails_opened_last_30_days: {
      value: 33,
      source_id: 2,
      updated_at: 1623238601089,
    },
  },
  cursor: {
    url: "/v1/spaces/lgJ4AAjFN4",
    has_more: false,
    next: "",
  },
};

/*
[깊은 복사]
객체의 데이터가 좀 크면 성능이 상당히 떨어진다. 
작은 객체를 깊은 복사를 할 때는 가장 간단한 방법이긴 하지만
객체의 데이터가 크다면 선택지가 고민이 되는 방법이라고 할 수 있다.
*/
const newObject1 = JSON.parse(JSON.stringify(sourceObject));
// [얕은 복사]
const newObject2 = Object.assign({}, sourceObject);
const newObject3 = { ...sourceObject };

console.log(sourceObject.traits.first_name.source_id); // 1

newObject1.traits.first_name.source_id = 100;

console.log(sourceObject.traits.first_name.source_id); // 1

newObject2.traits.first_name.source_id = 100;

console.log(sourceObject.traits.first_name.source_id); // 100 😵

newObject3.traits.first_name.source_id = 500;

console.log(sourceObject.traits.first_name.source_id); // 500 😵
```

<br />

### `JSON.parse&stringify`를 쓰지 않고 깊은 복사 하는 함수 만들기 (성능 🙂)

```js
function deepCopyObject(obj) {
  const clone = {};
  for (const key in obj) {
    if (typeof obj[key] == "object" && obj[key] != null) {
      clone[key] = deepCopyObject(obj[key]); // 재귀 호출
    } else {
      clone[key] = obj[key];
    }
  }
  return clone;
}

const newObject4 = deepCopyObject(sourceObject);

console.log(sourceObject.traits.first_name.source_id); // 1

newObject4.traits.first_name.source_id = 1000;

console.log(sourceObject.traits.first_name.source_id); // 1
```

<br />

### 기존 객체의 일부는 유지하고, 일부를 변경하기

```js
const store = {
  user: null,
  cart: [],
  config: {
    multiDevice: false,
    lastLoginDate: "Wed Jun 09 2021 20:46:55 GMT+0900",
  },
};

const newObject5 = {
  ...deepCopyObject(store),
  config: {
    ...store.config,
    lastLoginDate: new Date(), // ES5 까지는 중복된 속성명으로 합치면 에러가 발생했지만 ES6 부터는 허용된다.
  },
};

console.log(newObject5);
```

<br />

### 객체에 기본값 주기

```js
const DefaultStyle = {
  color: "#fff",
  contColor: "#999",
  fontSize: 14,
  fontWeight: 200,
};

function createParagraph(config) {
  config = { ...DefaultStyle, ...config };

  console.log(config);
}

createParagraph({ fontSize: 12 });
```
