## Chapter 03. Hacker News Client - Javascript

<br />

### 01. Hacker news 클라이언트 앱

```
1. 해커뉴스 클라이언트 앱
2. 앱을 만드는 이유
3. 제약 사항
4. 3장의 진행 방식
```

<br /> 

#### 애플리케이션의 본질(?!)

- 입력된 데이터를 (어떤 형태의 처리 과정을 거쳐서) 출력으로 바꾸는 것.
- 애플리케이션의 핵심적인 감각 연습 :-)

- [https://github.com/HackerNews/API](https://github.com/HackerNews/API)
- [tailwindcss](https://tailwindcss.com/)
- 비동기는 제외 🥲

<br />

### 02. 12줄의 코드로 시작하기.

```
1. 프로젝트 세팅
2. 수동 프로그래밍
3. 12줄 코드 프로그래밍
```

<br />

```js
const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");

for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");

  li.innerHTML = newsFeed[i].title;

  ul.appendChild(li);
}

document.getElementById("root").appendChild(ul);
```

<br />

### 03. 두 개의 화면을 가진 웹앱

```
1. 두 번째 API 연동
2. 이벤트로 UI 연동
3. 두 번째 화면 추가
4. 중복 코드 제거
```

<br />

> "개인적으로 클라이언트 애플리케이션을 만들 때 제일 관심을 갖게 되는 것이 '화면 전환'(화면을 어떻게 처리하는가 / 화면의 네비게이션을 어떻게 처리하는가 / 그 구조는 어떻게 만들어지는가)를 이해하는게 그 플랫폼의 특성을 빠르게 이해하는 데 도움이 많이 되는 것 같다."

  ```javascript
  window.addEventListener("hashchange", function () {
    const id = location.hash.substring("1");
    ajax.open("GET", CONTENT_URL.replace("@id", id), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response);
    const title = document.createElement("h1");

    title.innerHTML = newsContent.title;

    content.appendChild(title);
    console.log(newsContent);
  });
  ```

<br />

### 04. 문자열을 활용한 HTML 다루기

```
1. 문제점 확인
2. DOM API 제거하기
3. 중복 코드 제거하기
```

<br />

- UI를 개선하는 리팩토링도 있겠지만, UI, 즉 최종적인 결과물은 변화가 거의 보이지 않지만 내부적인 개선도 굉장히 많이 일어날 수 있는 개선 활동도 있다.😄

<br />

### 05. 라우터? 화면 처리기 만들기

```
1. 첫번째: 구조 구축
2. 두번째: 함수 분리
3. 라우터 작성
```

<br />

### 06. 페이징 구현하기

```
1. 페이징
2. 결함 수정
3. 방어 코드 작성
```

<br />

### 07. 복잡한 UI 구현을 위한 준비 작업 - 템플릿

```
1. 템플릿 렌더링
2. tailwind css
3. 스타일링 맛보기
```

- 코드의 양이 늘어난다고 해서 복잡도가 늘어나게 만들면 굉장히 안 좋은 구조의 코드...!! → 템플릿 컨셉(!)

<br />

### 08. 댓글 목록이 표시되는 아름다운 UI 만들기

```
1. 템플릿 방식의 단점
2. UI 라이브러리
3. 디자인 입히기
4. 댓글, 대댓글 구현
```

#### 템플릿 방식의 단점

- 뉴스 목록인 `<li></li>` 같은 경우에는 여전히 for문으로 넣어야하고,
- 마킹된 값의 개수가 많아질수록 `.repace()`를 추가적으로 늘려나가면서 써야한다.

→ [Handlebars.js](https://handlebarsjs.com/) 적용.

#### 디자인

- 아이콘, 폰트, ...
  - [아이콘](https://fontawesome.com/)

#### 대댓글 재귀구조

```js
function makeComment(comments, called = 0) {
  const commentString = [];

  for (let i = 0; i < comments.length; i++) {
    commentString.push(`
      <div style="padding-left: ${called * 40}px;" class="mt-4">
        <div class="text-gray-400">
          <i class="fa fa-sort-up mr-2"></i>
          <strong>${comments[i].user}</strong> ${comments[i].time_ago}
        </div>
        <p class="text-gray-700">${comments[i].content}</p>
      </div>      
    `);

    if (comments[i].comments.length > 0) {
      commentString.push(makeComment(comments[i].comments, called + 1));
    }
  }

  return commentString.join("");
}
```

<br />

## 09. 상태를 가져보자, 읽은 글 표시하기.

```
1. 상태 처리 흐름 정의
2. 상태의 위치
3. 새로운 상태 추가
4. 상태와 UI 연결
```

- 다만, 규모가 커지더라도 복잡도가 복잡해지지 않도록 하는 코드 구조를 찾는게 개발자의 일. 또 그런 것들을 잘 할 수 있는 개발자가 역량 있는 개발자라고 평가 받는것이다.
- 근데, 왜 복잡도가 높아지면 안되는 걸까? → 변경하는 걸 쉽게 변경할 수 있도록 하기 위함.
- '어떻게 하면 복잡도를 높이지 않고 규모를 키울 수 있을까?' 라고 하는 부분들이 큰 연구 주제 중 하나.

