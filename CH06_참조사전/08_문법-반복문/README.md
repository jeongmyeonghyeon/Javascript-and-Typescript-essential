#### 반복문

```
1. for
2. while
3. for of
4. for in
```

컴퓨터의 가장 큰 장점?
사람과 달리 전기만 있으면 무한 반복해서
무언가의 일을 꾸준히, 정확히 할 수 있다는 것.

크게 2가지 종류가 있다.
'반복문'과 '식을 이용해서 반복하는 패턴'.

여기서는 '반복문'만. (JavaScript에서는 5가지의 반복문을 제공한다.)

**for**

```js
const arr = ["a", "b", "c", "d"];

// console.log(arr[1]);

// 배열의 값을 하나씩 '순회'.
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

**while**

```js
let i = 0;

while (i < arr.length) {
  console.log(arr[i]);
  i++;
}

i = 0;

do {
  console.log(arr[i]);
  i++;
} while (i < arr.length);
```

- while의 매번 변수를 초기화해야 하는 단점에 비해 for문은 () 안에서만 쓰고 바로 폐기해버린다는 점에서 훨씬 더 변수를 사용함에 있어서 유연성을 제공해 많이 쓰이게 되는 듯 하다. (반복문이 많아 졌을 때는 더더욱...😳)

**for of**

```js
for (const item of arr) {
  console.log(item);
}
```

- 배열의 특정위치에 별 관심이 없을 때, 쓰기가 편하다.

**for in**

```js
for (const index in arr) {
  console.log(arr[index]);
}
```

- Object든 Array든 그 '키'의 값을 하나씩 꺼내올 때 많이 쓰게 되는 반복문.

```js
const obj = {
  color: "red",
  width: 200,
  height: 200,
};

for (const key in obj) {
  console.log(key);
}
```
