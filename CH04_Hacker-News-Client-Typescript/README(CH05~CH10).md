## 05. 상속과 믹스인

```
1. getData 클래스 변환
2. 공통요소 뽑아내기
3. 믹스인을 이용한 상속
4. applyApiMixins
```

### 중복코드를 제거하는 기법

코드를 작성하다보면 발생하는 중복코드.<br />
지금까지는 이 중복코드를 함수로 묶어서 재사용하는 식으로 중복된 코드들을 제거하는 기법을 배웠다.<br />

하지만, 코드베이스가 점점 커지고 애플리케이션 규모가 커지다 보면 중복 코드를 단순한 함수로만 묶어서는 온전히 다 제거하기는 쉽지 않다. (함수 자체가 무한정으로 늘어날 수도 있고, 그렇게 많이 늘어나는 함수들의 이름을 붙여주는 것도 보통일이 아닌 일 등)

일상에서의 물건 정리. → 범주화 하여 정리한다.

코드에서도 마찮가지로 그 목적에 부합되도록 분류하고,<br />
그 분류 내에서 훨씬 더 의미를 잘 부여할 수 있게 중복된 코드를 제거할 수 있는 여러 가지 기능들을 제공한다.

### 상속

예로, interface로 만들었던 News.<br />
공통요소 → News<br />
개별요소 → News로 부터 확장. → NewsFeed, NewsDetail, NewsComment

컨셉은 이와 동일하다.<br />
공통 요소를 뽑아놓고 공통 요소를 확장할 수 있는 개별 요소들을 만들게 되는식이다. → 상속.

상속을 다루는 메커니즘은 크게 2가지가 .<br />

① 클래스를 사용하는 방법.

- class로 상속을 하는 이유<br />
  : 기존 중복코드를 제거한 함수인 `getData()`가 너무 일반화되어 있어서(이름) 정확히 NewsFeed의 데이터를 가져온다거나 NewsDetail의 내용을 가져온다거나 하는 의미를 갖고 있지는 않다. 그래서 이 부분을 좀 더 _의미화_ 하는 부분들을 추가하면서 코드의 구성도 더 깔끔해졌으면 좋겠다.

```js
class Api {
  ajax: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.ajax = new XMLHttpRequest();
    this.url = url;
  }

  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open('GET', this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response) as AjaxResponse;
  }
}

class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}

// 사용 - 1 newsFeed
function newsFeed(): void {
  let api = new NewsFeedApi(NEWS_URL); // 가독성면에서 '조금' 향상된 것 같은 느낌~~
  // ...
  if (newsFeed.length === 0) {
    newsFeed = store.feeds = makeFeeds(api.getData()); // 사용하는 쪽에서 아주 깔끔하게 사용가능해짐~~~
  }
  // ...
}

// 사용 - 2 newsDetail
function newsDetail(): void {
  const id = location.hash.substr(7);
  const api = new NewsDetailApi(CONTENT_URL.replace('@id', id));
  const newsDetail: NewsDetail = api.getData();
  //...
}

```

하지만, 한편으로는 기존에는 함수가 하나여서 깔끔했는데... 뭔가 더 번잡스러워 진거 같은데...? 더 어려워진거 같은데...? 더 나빠진거 같은데...? 하는 생각이 들기도 한다. <br />
- 어떤 경우에는 중복 코드를 제거함에 있어서 제거된 중복이 훨씬 더 코드가 무거워지는 경우가 있다. 그런 경향성은 코드 자체가 하는 일이 아주 작을 때 더 그러하다.
- 기존의 단순 함수였던 코드를 이렇게 class 형태로 바꾼다는 것. → 이것은 어떤 '구조'를 갖는다는 것을 의미한다. 함수는 구조가 없다. 단독 함수일 뿐이니까. 하지만 클래스는 어떤 '구조'를 갖게 된다. &_'목적을 위한' 형식을 갖게 되는 것이다._
  - 이랬을 때의 이득은...? 이 코드가 나중에 더 많은 기능을 갖게 될 때, 초기의 복잡도는 유지하면서 바깥쪽에서 사용할 때는 그 단순함을 꾸준히 계속 유지할 수 있다는 장점이 생긴다.✨ (+ 이 코드가 점점 커진다고 했을 때)
> ※ class의 `protected` - class의 속성과 메소드를 등을 외부로 노출시키지 않는 지시어.

<br />

② 믹스인을 사용하는 방법.

믹스인<br />
\: class를 이용해서 상속을 구현하지만, 방금 해봤던 class의 extends라고 하는 기능을 이용하지 않고 `class를 마치 함수처럼 혹은 단독의 객체처럼 바라보면서 필요한 경우마다 class를 합성해서 새로운 기능으로 확장해 나가는 기법`을 말한다.

- 기존의 class를 이용하는 방법을 mixin기법으로 변경.
- extends처럼 직접적으로 지원하는게 아닌 코드 테크닉으로 전개되는 기법이다.

```typescript
// Typescript 공식문서에도 mixin 관련으로 있는 내용~~~
// https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
function applyApiMixins(targetClass: any, baseClasses: any[]): void {
  baseClasses.forEach((baseClass) => {
    Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
      const descriptor = Object.getOwnPropertyDescriptor(
        baseClass.prototype,
        name
      );

      if (descriptor) {
        Object.defineProperty(targetClass.prototype, name, descriptor);
      }
    });
  });
}

// 클래스 자체를 훨씬 더 독립적인 주체로 바라봄. (constructor 제거)
class Api {
  getRequest<AjaxResponse>(url: string): AjaxResponse {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", url, false);
    ajax.send();

    return JSON.parse(ajax.response) as AjaxResponse;
  }
}

// 클래스 자체를 훨씬 더 독립적인 주체로 바라봄.
class NewsFeedApi {
  getData(url: string): NewsFeed[] {
    return this.getRequest<NewsFeed[]>(url);
  }
}

// 클래스 자체를 훨씬 더 독립적인 주체로 바라봄.
class NewsDetailApi {
  getData(url: string): NewsDetail {
    return this.getRequest<NewsDetail>(url);
  }
}

// extends를 사용하지 않고 있기 때문에,
// typescript의 interface상속으로 합성 사실(!)을 typescript compiler에게 알려줘야 함.
// (안그러면 Error 뿜뿜~~~)
interface NewsFeedApi extends Api {}
interface NewsDetailApi extends Api {}

applyApiMixins(NewsFeedApi, [Api]); // 상위클래스를 여러개 둘 수 있기에, 두번째 인자를 배열로...!
applyApiMixins(NewsDetailApi, [Api]);

// 사용 - 1 newsFeed
function newsFeed(): void {
  let api = new NewsFeedApi();
  // ...
  if (newsFeed.length === 0) {
    newsFeed = store.feeds = makeFeeds(api.getData(NEWS_URL));
  }
  // ...
}

// 사용 - 2 newsDetail
function newsDetail(): void {
  const id = location.hash.substr(7);
  const api = new NewsDetailApi();
  const newsDetail: NewsDetail = api.getData(CONTENT_URL.replace("@id", id));
  //...
}
```

#### 🤔 "아니 언어가 문법으로 확장 기능을 제공해주고 있는데,<br />
왜 이렇게 힘들게 이런 기능을 직접 만들어서 써야 하는걸까?"

① 유연성.

기존의 extends라고 하는 방식의 상속 방법은 코드에 적시되어야 하는 상속 방법이다. 이는 상속의 '관계'를 바꾸고 싶으면 코드 자체를 바꿔야 된다는 뜻이다. 즉, 관계를 '유연하게' 가져갈 수 없다. (extends와는 상당히 많이 다르다.)
> ex. 어떨때는 a-b, 어떨때는 a-c 로 엮어서 사용하는게 '코드를 바꾸기 전에는' 불가능해지는 것.

② Javascript&Typescript의 extends 문법은 다중 상속을 지원하지 않는다. (상위 클래스 n개를 상속받는 것이 문법적으로 불가능하다)

- ex. Api를 상속받고 있는 NewsFeedApi, 근데 이 상위 클래스가 여러개 이고 싶은 경우, 이는 문법적으로 불가능하다.
  - 믹스인은 '코드'로 만들어 놓은 기법으로 그런 것들이 가능해지는 것이다.
- class extends 만으로도 대부분의 경우는 충분하기 때문에 이런 번거롭고 어려운 측면들 때문에 특별하게 이유가 없다면, 믹스인을 쓰지 않는 경우들도 굉장히 많다.
- 코드베이스 자체에서 굉장한 유연성을 필요로 하는 경우에 적합하다. (어플리케이션 상황, 개발자의 성향에 따라...)
(Djaogn, DRF의 mixin이 이런 느낌이였던거같다...)

<br />

## 06. 뷰 클래스로 코드 구조 개선 (✨메인 이벤트 세션✨)

```
1. 공통 요소 추출
2. 구조 분해 할당
3. 라우터 구현
4. 접근 제어
```

UI를 업데이트하는 코드를 개선.

<br />

## 07. 파일의 분리, 더욱 성장할 앱을 위한 준비

```
1. 디렉토리 구조 생성
2. 모듈
3. 디렉토리 캡슐화
4. 전역 스토어 만들기
```

<br />

## 08. 안전한 전역 상태 관리

```
1. 스토어 클래스 만들기
2. 스토어 공급하기
3. 클래스 인터페이스
```

<br />

## 09. XHR to Fetch & Promise

```
1. 비동기 옵션
2. 콜백 함수
3. fetch API
```

<br />

## 10. 콜백 함수 없는 비동기 코드 작성법

```
1. 새로운 tsconfig 옵션
2. 비동기 함수
```

###tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "module": "CommonJS",
    "sourceMap": true,
    "lib": ["es6", "dom"]
  }
}
```

