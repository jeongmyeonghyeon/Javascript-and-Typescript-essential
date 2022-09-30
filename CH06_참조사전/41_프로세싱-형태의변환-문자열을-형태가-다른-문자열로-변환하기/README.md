#### 형태의 변환 - 문자열을 형태가 다른 문자열로 변환하기

---

```
1. 2개의 변환 함수
```

문자열을 camel case로 변환하기

**(1)**

```js
function convertCamelName(name) {
  let camelName = "";

  for (let i = 0, newSpace = false; i < name.length; i++) {
    if (name[i] == " ") {
      newSpace = true;
      continue;
    }

    if (newSpace) {
      camelName = camelName + name[i].toUpperCase();
      newSpace = false;
    } else {
      camelName = camelName + name[i].toLowerCase();
    }
  }

  return camelName;
}

const camelName1 = convertCamelName("Jeong myeong hyeon"); //'jeongMyeongHyeon'
```

<br />

**(2)**

```js
const simpleCamel = (text, splitter = " ") =>
  text
    .split(splitter)
    .map((word, wi) =>
      word
        .split(" ")
        .map((c, ci) =>
          wi > 0 && ci === 0 ? c.toUpperCase() : c.toLowerCase()
        )
        .join("")
    )
    .join("");

const camelName2 = simpleCamel("JEONG MYEONG HYEON"); //'jeongMyeongHyeon'
```

좋고 나쁘고에 차이보다는 스타일의 차이라,
함께하는 개발자분들이 더 선호하는걸 맞춰갈 수 있으려면
2개 모두 이해하고 있는 것이 더 좋을 것. ^^;
