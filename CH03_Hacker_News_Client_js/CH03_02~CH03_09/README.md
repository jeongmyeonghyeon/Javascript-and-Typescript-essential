##### Chapter 03. Hacker News Client

##### 02. 12줄의 코드로 시작하기.

```
1. 프로젝트 세팅
2. 수동 프로그래밍
3. 12줄 코드 프로그래밍
```

```javascript
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

##### 03. 두 개의 화면을 가진 웹앱

```
1. 두 번째 API 연동
2. 이벤트로 UI 연동
3. 두 번째 화면 추가
4. 중복 코드 제거
```

- "개인적으로 클라이언트 애플리케이션을 만들 때 제일 관심을 갖게 되는 것이 '화면 전환' / 화면을 어떻게 처리하는가 / 화면의 네비게이션을 어떻게 처리하는가 / 그 구조는 어떻게 만들어지는가 를 이해하는게 그 플랫폼의 특성을 빠르게 이해하는 데 도움이 많이 되는 것 같다."

- 오호...

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

##### 04. 문자열을 활용한 HTML 다루기

```
1. 문제점 확인
2. DOM API 제거하기
3. 중복 코드 제거하기
```
