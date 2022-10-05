## 형태의 변환 - 객체를 형태가 다른 객체로 변환하기

---

```
1. source, target 변환
```

#### 😵‍💫

```js
const sourceObject = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};

// 최종 목표 형태.
const targetObject = {
  aGroup: {
    a: 1,
    b: 2,
  },
  bGroup: {
    c: 3,
    d: 4,
    e: 5,
  },
};

const groupInfo = {
  aGroup: ["a", "b"],
  bGroup: ["c", "d", "e"],
};

function makeGroup(source, info) {
  const merge = (a, b) => ({ ...a, ...b });
  // console.log(Object.keys(info));
  return Object.keys(info)
    .map((group) => ({
      [group]: info[group].map((k) => ({ [k]: source[k] })).reduce(merge, {}),
    }))
    .reduce(merge, {});
}

console.log(makeGroup(sourceObject, groupInfo));
```

😵‍💫... 코드보다 기호가 많다...😅 연습!!!
