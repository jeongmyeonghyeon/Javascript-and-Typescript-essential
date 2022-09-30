#### 형태의 변환 - 문자열 변환 고급 기법 - 템플릿

템플릿 리터럴,
템플릿 고급 기능 😄

---

```
1. TaggedTemplate
```

템플린 문법의 `${}` 안에는 최종적으로 '값'으로만 수렴된다면 어떤 '수식'도 넣을 수 있다.

함수 호출을 넣은 예.

```js
const userName = "Jeong myeonghyeon";
const bolder = (text) => `<b>${text}</b>`;

console.log(`HI~ ${bolder(userName)}`);
```

<br />

**(조금 더) 고급 기능 - Tagged Template**

### 😵‍💫

```js
function div(strings, ...fns) {
  const flat = (s) => s.split("\n").join("");

  return function (props) {
    /* 
      strings는 ${}를 기준으로 2개의 값을 가진 배열로 들어온다. ['\nfont-size:20px;\ncolor:', ';\nborder:none;\n']
      console.log(flat(strings[0])); // 'font-size: 20px; color: '
      console.log(flat(strings[1])); // '; border: none;'
      console.log(fns[0]); // [Function] 
    */
    return `<div style="${
      flat(strings[0]) + (fns[0] && fns[0](props)) + flat(strings[1])
    }"</div>`;
  };
}

const Div = div`
    font-size: 20px;
    color: ${(props) => (props.active ? "white" : "gray")};
    border: none;
`; // 이 템플릿 리터럴은 어떻게 작동될까?
// (1) 일단 기본적으로 템플릿 리터럴에 넘어가 있는 데이터 문자열이 div 함수의 첫 번째 인자로 전달이 된다.
// (2) 템플릿 리터럴이니까 ${}(달러 브레이스)가 몇개든 간에 올 수 있는데, 달러 브레이스의 개수만큼 뒤쪽 가변 인자로 전달이 된다. 위 예제에서는 하나만 있으니까 '...fns'에 하나만 전달이 될 것이다. (배열 형태)

console.log(Div({ active: false }));
// '<div style="font-size: 20px;color: gray;border: none;"</div>'
```
