## 형태의 변환 - 문자열을 객체로 변환하기

'객체 → 문자열'의 변환도 흔하지만,<br />
'문자열 → 객체'의 변환도 아주 흔하다.

---

```
1. 객체 변환 클래스
```

<br />

```js
import MakeObject from "./make-object.js";

const movieData = `Title,Release,Ticketing Rate,Director
보헤미안 랩소디,2018.10.31,11.5% 브라이언 싱어
완벽한 타인,2018.10.31,4.6%,이재규
동네사람들,2018.11.07,0.5%,임진순`;

const movieList = new MakeObject(movieData);

console.log(movieList.toAllObject());

/*
 * 결과 데이터
[
  {
    "Ticketing Rate": "11.5% 브라이언 싱어",
    Release: "2018.10.31",
    Title: "보헤미안 랩소디",
  },
  {
    "Ticketing Rate": "4.6%",
    Director: "이재규",
    Release: "2018.10.31",
    Title: "완벽한 타인",
  },
  {
    "Ticketing Rate": "0.5%",
    Director: "임진순",
    Release: "2018.11.07",
    Title: "동네사람들",
  },
];
*/
```

### MakeObject 클래스와 그 부모 클래스 HeaderListData

```js
// make-object.js
class HeaderListData {
  constructor(source, separator = ",") {
    const rawData = source.split("\n");

    this.headers = rawData[0].split(separator);
    this.rows = rawData
      .filter((row, index) => index > 0)
      .map((row) => row.split(separator));
  }

  row = (index) => {
    return this.rows[index].map((row, index) => {
      return [this.headers[index], row];
    });
  };

  get length() {
    return this.rows.length;
  }

  get columnLength() {
    return this.headers.length;
  }
}

export default class MakeObject extends HeaderListData {
  toObject = (index) => {
    return this.row(index).reduce(
      (a, [key, value]) => ({ ...a, [key]: value }),
      {}
    );
  };

  toAllObject = () => {
    return Array(this.length)
      .fill(0)
      .map((item, index) => this.toObject(index));
  };
}
```

배열 연산 체이닝~~~ 😅😵‍💫
