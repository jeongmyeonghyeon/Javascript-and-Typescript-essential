## RESTful

서버와 통신할 때, 가장 많이 쓰이는 방식인 RESTful API 방식.

---

```
1. HTTP
2. 무상태 비동기 프로토콜
3. Method
4. Clean URLs
```

### HTTP와 무상태 비동기 프로토콜

기본적으로 RESTful API는 웹의 근간인 HTTP 프로토콜 기반 위에서 작동하도록 설계된 기술이다.<br />
인터넷에서 html이나 이미지, 비디오 같은 것들을 송수신할 수 있는 규약, 통신 규약이라고 보면 된다.

ref.

[HTTP 개요](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)

위 문서에서 가장 중요한(!) [HTTP의 기초적인 측면](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview#http%EC%9D%98_%EA%B8%B0%EC%B4%88%EC%A0%81%EC%9D%B8_%EC%B8%A1%EB%A9%B4)을 보면,

- HTTP는 간단합니다.
- HTTP는 확장 가능합니다.
- HTTP는 상태가 없지만, 세션은 있습니다. (⭐️)
- HTTP와 연결
  ...

가 있는데, 이 때 "🤔 HTTP는 상태가 없다?"는 것은 뭘까?

HTTP는 전형적인 비동기 프로토콜이다.<br />
비동기라 하면, 데이터를 요청하고 그 응답을 주면 연결을 끊는다.

그렇다면, "동기 프로토콜이란 무엇일까?" <br />
대표적으로 전화를 예로 많이 든다. 전화는 전화를 걸고 상대가 말을하지 않아도(데이터를 송수신 하지 않아도) 전화를 끊기 전까지는 상대와의 연결을 유지하는데, 그렇기 때문에 내가 말을 안해도 상대에게 "거기있어?"라는 말을 안해도 그냥 얘기를 하면 상대가 듣는 것이다.

하지만, HTTP는 그러지 않는다는 것이다.<br />
마치 워키토키 같은 것이다... :)

예를 들어 로그인을 해야한다고 했을 때<br />
로그인 API를 통해 HTTP연결을 할텐데, 그 때 로그인을 한다고 아이디, 패스워드를 전달해주고 그 다음 페이지로 갔을 때 특별한 처리를 하지 않으면, <br />
웹 서버는 그 다음 페이지가 바로 앞페이지에서 로그인한 사용자인지 알지 못한다. <br />
왜냐하면, 상태를 갖고 있지 않기 때문에 그렇다.<br />
앞선 페이지에서 처리를 끝내고 연결을 끊어 버리고 그 다음 페이지에 들어왔을 때, <br />
이 사용자는 언제나 새로운 사용자다. (!)<br />
그래서 이런 처리를 하기 위해서 또 다른 특별한 기술들이 들어가게 되는 이유가 바로<br />
`HTTP가 상태를 갖고 있지 않은 비동기 프로토콜`기반이기 때문에 그렇다.<br />
(상태가 없다는 것에 대한 여파...)

"HTTP는 비동기 프로토콜이고 상태를 가지고 있지 않구나. 요청이 오면 요청 응답하고 바로 연결을 끊어 버리는구나." 는 것을 알고 있을 것 :)

<br />

### RESTful

4개의 동사와 url로 의미를 만들어내는 프로토콜이 REST API 핵심이다.

- Method
  - GET
  - POST
  - PUT
  - DELETE
  
ref.

[Representational state transfer](https://en.wikipedia.org/wiki/Representational_state_transfer)

<br />

### Clean URLs

서버가 가지고 있는 자원(리소스)를 url로 드러내고, 그 자원을 기준으로 클라이언트가 요청을 보내고 응답을 받는 식으로 데이터를 상호 교환하라고 하는 일종의 가이드라인이다.

| Original URL                                        | Clean URL                              |
| --------------------------------------------------- | -------------------------------------- |
| http://example.com/about.html                       | http://example.com/about               |
| http://example.com/user.php?id=1                    | http://example.com/user/1              |
| http://example.com/index.php?page=name              | http://example.com/name                |
| http://example.com/kb/index.php?cat=1&id=23         | http://example.com/kb/1/23             |
| http://en.wikipedia.org/w/index.php?title=Clean_URL | http://en.wikipedia.org/wiki/Clean_URL |

ref.

[Clean URL](https://en.wikipedia.org/wiki/Clean_URL)

<br />

### 정리

HTTP 기반 위에서 API를 만들 떄, '이런 형식으로 이런 컨셉으로 설계를 하라'고 하는 가이드라인이라고 볼 수 있다.<br />
서버개발자와 API를 개발하고 API를 연동하게 될 때, 서버개발자가 RESTful 방식으로 개발했다고 하면 대략 어떤 식의 url이 나올지, 어떤 패턴으로 만들어질지를 충분히 예측 가능해질 수 있다. 그리고 어떤 자원을 가지고 올 때 어떻게 url을 결합해서 가져오는 게 효과적인 디자인이겠구나. 라는 것도 예상해 볼 수 있어 서버 개발자와의 커뮤니케이션에도 도움이 될 수 있다. :)
