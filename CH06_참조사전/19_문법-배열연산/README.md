#### 배열 연산

---

```
1. forEach
2. map
3. map & map
4. reduce
```

**forEach**

`for`, `for in`, `for of` 는 '문'을 이용한 반복이고,
`.forEach()`는 배열이 제공하는 함수를 통해서 '식'을 이용한 반복이다.

자바스크립트의 '호출하는 인자의 개수와 받는 쪽의 인자의 개수가 아무런 상관이 없다.'는 특징...
forEach의 2번째(index), 3번째(원본 배열) 인자는 필요시에만 사용하면 된다.

`return`이 없다.

`forEach`와 '문'을 이용한 반복과의 차이를 살펴보자면, 우선 변수가 없다.

대신 다량의 데이터가 됐을 때, for와 같은 전통적인 반복문이 훨씬 더 빠르다. (문법 사용의 선택 기준)
하지만 몇천건의 데이터에서는 유의미한 차이를 찾아보기 힘들기 때문에 편한것으로 사용해도 상관없다.

**map**

배열 안의 데이터를 다른 데이터 형태로 변환하는 용도로 많이 사용한다.

**map&map (method chaining)**

```ts
const ShakespeareOneBooks: Book[] = books
  .map((book: string) => ({
    title: book,
  }))
  .map((book: Book) => ({
    ...book,
    author: "William Shakespeare",
  }));
```

```ts
// 위 코드를 조금 더 재활용성이 좋은 코드로 작성하면 다음과 같다.
// 조금 더 복잡해보일 수는 있지만, 그 허들을 넘는다면 충분히 더 좋은 코드를 작성할 수 있는 것...
const bookTitleToBookObject = (book: string) => ({ title: book });
const makeAuthor = (name: string) => (book: Book) => ({
  ...book,
  author: name,
});

const shakespeareTwoBooks: Book[] = books
  .map(bookTitleToBookObject)
  .map(makeAuthor("William Shakespeare"));
```

**filter**

**reduce(누적 함수)**

사용 예 - 객체의 merge

```ts
type SomeObject = {
  [key: string]: string | number;
};

const someObjects: SomeObject[] = [
  { border: "none" },
  { fontSize: 24 },
  { className: "box sm-box" },
];

const someObject: SomeObject = someObjects.reduce(
  (a: SomeObject, b: SomeObject) => ({ ...a, ...b }),
  {}
);

console.log(someObjects); // {border: 'none', fontSize: 24, className: 'box sm-box'}
```

**유사 배열과 `Array.from`**

배열과 같은 형태의 자료 구조이지만, 배열이 갖고 있는 도구(메소드). 즉, map, filter, reduce, forEach와 같은 류의 도구들은 갖고 있지 않은 그런 자료 구조.

- arguments

유사 배열을 배열처럼 순회하고 싶을 때

```ts
Array.from(arguments);
```

하지만, 이는 대부분 전개 구문(`...`)으로 작성한다.
과거에 사용한 코드를 이해할 필요가 있을경우를 위해 알아는 둘 것. :)
