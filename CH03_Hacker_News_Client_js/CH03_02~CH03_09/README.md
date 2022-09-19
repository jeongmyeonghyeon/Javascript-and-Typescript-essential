##### Chapter 03. Hacker News Client

##### 02. 12줄의 코드로 시작하기.

```
1. 프로젝트 세팅
2. 수동 프로그래밍
3. 12줄 코드 프로그래밍
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
