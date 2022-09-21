##### Chapter 04. Hacker News Client - Typescript

##### 01. 타입스크립트를 위한 환경셋팅

```
1. Typescript 환경 설정
2. tsconfig.json
3. 첫 번째 실행
4. Source Map
```

**포팅**

A라는 언어로 개발된 앱을 B라는 언어로 완전히 바꾼다거나. (js → ts)
(요즘 잘 안쓰는 용어 😅)

- `.js` 확장자명을 `.ts`로 바꾸고
- `index.html`의 `<script>`의 src속성을 변경하면,
- 끝. 😳😄

**tsconfig.json**

- [What is tsconfig.json](https://www.typescriptlang.org/ko/docs/handbook/tsconfig-json.html)
- [컴파일렁 옵션](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES5",
    "module": "CommonJS",
    "alwaysStrict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "sourceMap": true,
    "downlevelIteration": true
  }
}
```

- strict: 타입스크립트의 기능을 얼마나 엄격하게 적용해서 변환시킬 것인지.

  \: 타입스크립트가 제공하는 기능 중에 가장 핵심적인 기능 → 자바스크립트의 타입 확장 구문을 제공하는 것.
  자바스크립트는 타입은 있지만, 문법으로 기술하고 있진 않지않음? 상황적으로 어떤 데이터 타입이구나 하고 자동으로 변환이 이루어지는 아주 느슨한 타입 체계를 갖고 있는데, 그러다 보니 자바스크립트 파일을 타입스크립트로 변환하겠다고 했을 때는 타입이 아무것도 정의되어 있지 않단 말임. 이럴 때 그 변환해야 되는 자바스크립트 파일의 코드 규모가 굉장히 크다면 굉장히 수정해야 될 것들이 많음.
  타입스크립트 팀 입장에서는 이미 자바스크립트로 웹 애플리케이션을 만들고 있는 세상에서 타입스크립트라고 하는 새로운 언어를 전파시키려면 전략적인 접근이 좀 필요했을 것 같음.
  처음부터 이렇게 변환에 엄격함만 추구한다고 하면 자바스크립트 개발자들이 아마 타입스크립트를 가지고 기존의 애플리케이션을 변환시키는 일을 잘 안했을 것. 하지만, 옵션을 제공함으로써 "처음엔 아무것도 안 해도 돼. 너희들이 바꿀 게 100개면 그중에 처음엔 한 2~3개 정도만 바꾸고 나머진 그대로 둔 상태에서도 작동시키게 해줄께. 그리고 시간이 나면 10개 바꾸고, 30개 바꾸고, 나중에 결국 100개 다 바꿔서 완전히 타입스크립트 파일로 전환시키는 작업이 가능할 수 있도록 그렇게 우리가 소프트 랜딩하게 해줄게." 라고 하는 전략을 취함.

  그것이 바로 이 `strict` 모드.

  디폴트로 False로 해놓으면, 마치 이게 타입스크립트 파일인지 자바스크립트 파일인지 구분하기 어려울 정도로 그냥 보통의 자바스크립트 파일에서도 아무런 오류 없이 잘 작동하는 모습을 볼 수 있음.

  True로 켜면, 타입스크립트가 뿜는 에러를 찾아가며 수정할 수 있는 것.

- noImplicitAny, noImplicitThis, ...

  \: strict의 세부 옵션들임.
  엄격한 옵션들 중에서도 특별한 옵션들 몇 가지를 세부적으로 세세하게 끄고 켤 수 있는 그런 옵션들. 여러가지가 있지만, 이 프로젝트에서는 2가지 정도만 씀.

- sourceMap

  \: dist라고 하는 디렉토리는 타입스크립트 컴파일러가 타입스크립트 파일을 변환한 결과를 여기다가 출력해 놓은 타겟 디렉토리라고 할 수 있음. 여기에 보면 `app.c61986b1.js`도 있고, `app.c61986b1.js.map` 파일도 있는걸 확인할 수 있음.
  그리고 또 `index.html`을 보면, 우리가 script태그에 `src="app.ts"`라고 해놓은 부분이 `src="/app.c61986b1.js"`로 변경되있는걸 볼수 있음.
  이때 `app.c61986b1.js.map`가 sourceMap 파일인 것.

  코드 작성은 타입스크립트. 브라우저 실행은 자바스크립트.
  하지만 자바스크립트 파일을 실행하는 가운데 만약 자바스크립트 코드에 문제가 있는 경우 그 변환된(직접 작성하지 않은) 코드로 문제를 발견하는 일은 쉽지 않을 것. 그럴 때 실제 브라우저에서 우리가 작성했던 원본 코드, 타입스크립트 코드를 보여 주면서 그 상태에서 문제점을 찾을 수 있게.
  실제 내부적으로 실행은 자바스크립트로 되지만, 그런 기능을 제공해 주기 위한 일종의 연결 정보를 갖고 있는 파일이라고 볼 수 있는 것. (소스의 지도)
  _개발자도구 Sources 탭에서 원본 .ts를 확인할 수 있게 해주는 것._

- target

  \: ts파일을 컴파일하면 나오는 자바스크립트의 문법 체계.

- module

**첫번째 실행**

parcel로 실행하고 나니까 `node_modules` / `dist` / `.cache` / `package.json`이 생성됨. parcel이 알아서 detect해서 패키지도 다운로드 하고 등등 셋팅!

---

##### 02. 변수에 타입 작성하기

```
1. 첫 번째 타입 지정
2. 타입 알리아스
3. 타입 추론
4. 타입 가드
```

---

##### 03. 함수의 규격 작성하기

```
1. 첫번째 함수
2. REST Client
3. 제네릭
4. 마무리 타이핑
```

- VS Code Extension - REST Client 👍🏻
- 제네릭
  - 굉장히 난이도가 높은 기술 중에 하나.
  - 타입스크립트만 제공하는 건 아니고 제네릭을 지원하는 많은 언어들이 있음.
    그런 언어들에서조차도 제네릭은 굉장히 유연하고 유용한 기능이긴 하지만,
    난이도가 상황에 따라 한도 끝도 없이 올라갈 수 있는 문법 요소 중 하나.

---

##### 04.타입과 인터페이스

```
1. 인터페이스와 타입 별칭
2. 인터페이스로 전환
3. 인터페이스 상속
4. 풍성한 타입 설명
```

- 타입 알리아스를 이용해서 지금까지는 타이핑을 해왔음.

  - 타입스크립트가 제공하는 기능을 이용해서 타입을 기술하는 방법 → 보통 '타이핑'한다고 얘기.
  - 뭔가 다른 방법도 있다는 뉘앙스...? → 👌🏻, 인터페이스.
  - 이때 중요한 키워드가 '일관성'. → 타입 알리아스 파 VS 인터페이스 파 😅

  ```typescript
  type NewsFeed = News & {
    comments_count: number;
    points: number;
    read?: boolean;
  };
  ```

  ```typescript
  interface NewsFeed extends News {
    comments_count: number;
    points: number;
    read?: boolean;
  }
  ```

  - 유니온 타입은 지원하지 않음. 이런 경우에는 쓰려면 타입 알리아스를 사용해야함. 그 외에는 인터페이스라고 하는 것을 주로 많이 쓰는 경향성이 좀 있음.

(1) 타입 알리아스 (기존)

```typescript
type Store = {
  currentPage: number;
  offset: number;
  limit: number;
  feeds: NewsFeed[];
};

type News = {
  id: number;
  time_ago: string;
  title: string;
  url: string;
  user: string;
  content: string;
};

type NewsFeed = News & {
  comments_count: number;
  points: number;
  read?: boolean;
};

type NewsDetail = News & {
  comments: NewsComment[];
};

type NewsComment = News & {
  comments: [];
  level: number;
};
```

(2) 인터페이스

```typescript
interface Store {
  currentPage: number;
  offset: number;
  limit: number;
  feeds: NewsFeed[];
}

interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}

interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  read?: boolean;
}

interface NewsDetail extends News {
  readonly comments: NewsComment[];
}

interface NewsComment extends News {
  readonly comments: [];
  readonly level: number;
}
```

---

##### 05. 상속과 믹스인

```
1. getData 클래스 변환
2. 공통요소 뽑아내기
3. 믹스인을 이용한 상속
4. applyApiMixins
```

**중복코드를 제거하는 기법**

코드를 작성하다보면 발생하는 중복코드.
지금까지는 이 중복코드를 함수로 묶어서 재사용하는 식으로 중복된 코드들을 제거하는 기법을 배웠음.

하지만, 코드베이스가 점점 커지고 애플리케이션 규모가 커지다 보면 중복 코드를 단순한 함수로만 묶어서는 온전히 다 제거하기는 쉽지 않음. (함수 자체가 무한정으로 늘어날 수도 있고, 그렇게 많이 늘어나는 함수들의 이름을 붙여주는 것도 보통일이 아닌 일 등)

일상에서의 물건 정리. → 범주화.

코드에서도 마찮가지로 그 목적에 부합되도록 분류하고,
그 분류 내에서 훨씬 더 의미를 잘 부여할 수 있게 중복된 코드를 제거할 수 있는 여러 가지 기능들을 제공함.

**상속**

예로, interface로 만들었던 News.
공통요소 → News
개별요소 → News로 부터 확장. → NewsFeed, NewsDetail, NewsComment

컨셉은 이와 동일함.
공통 요소를 뽑아놓고 공통 요소를 확장할 수 있는 개별 요소들을 만들게 되는식임. → 상속.

상속을 다루는 메커니즘은 크게 2가지.

① 클래스를 사용하는 방법.

- class로 상속을 하는 이유: 기존 중복코드를 제거한 함수인 `getData()`가 너무 일반화되어 있어서(이름) 정확히 NewsFeed의 데이터를 가져온다거나 NewsDetail의 내용을 가져온다거나 하는 의미를 갖고 있지는 않음. 그래서 이 부분을 좀 더 _의미화_ 하는 부분들을 추가하면서 코드의 구성도 더 깔끔해졌으면 좋겠다.

```javascript
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

하지만, 한편으로는 기존에는 함수가 하나여서 깔끔했는데... 뭔가 더 번잡스러워 진거 같은데...? 더 어려워진거 같은데...? 더 나빠진거 같은데...? 하는 생각.

- 어떤 경우에는 중복 코드를 제거함에 있어서 제거된 중복이 훨씬 더 코드가 무거워지는 경우가 있음. 그런 경향성은 코드 자체가 하는 일이 아주 작을 때 더 그러함.
- 기존의 단순 함수였던 코드를 이렇게 class 형태로 바꾼다는 것. → 이것은 어떤 '구조'를 갖는다는 것. 함수는 구조가 없음. 단독 함수일 뿐이니까. 클래스는 어떤 '구조'를 갖게 됨. &_'목적을 위한' 형식을 갖게 되는 것._
  - 이랬을 때의 이득은...? 이 코드가 나중에 더 많은 기능을 갖게 될 때, 초기의 복잡도는 유지하면서 바깥쪽에서 사용할 때는 그 단순함을 꾸준히 계속 유지할 수 있다는 장점이 생김.✨ (+ 이 코드가 점점 커진다고 했을 때)

※ class의 `protected` - class의 속성과 메소드를 등을 외부로 노출시키지 않는 지시어.

② 믹스인을 사용하는 방법.

믹스인: class를 이용해서 상속을 구현하지만, 방금 해봤던 class의 extends라고 하는 기능을 이용하지 않고 class를 마치 함수처럼 혹은 단독의 객체처럼 바라보면서 필요한 경우마다 class를 합성해서 새로운 기능으로 확장해 나가는 기법.

- 기존의 class를 이용하는 방법을 mixin기법으로 변경.
- extends처럼 직접적으로 지원하는게 아닌 코드 테크닉으로 전개되는 기법임.

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

"아니 언어가 문법으로 확장 기능을 제공해주고 있는데,
왜 이렇게 힘들게 이런 기능을 직접 만들어서 써야 하는걸까?"

① 유연성.

기존의 extends라고 하는 방식의 상속 방법은 코드에 적시되어야 하는 상속 방법임. → 상속의 '관계'를 바꾸고 싶으면 코드 자체를 바꿔야 된다는 뜻임. 관계를 '유연하게' 가져갈 수 없음. (extends와는 상당히 많이 다름.)

- ex. 어떨때는 a-b, 어떨때는 a-c 로 엮어서 사용하는게 '코드를 바꾸기 전에는' 불가능해지는 것.

② Javascript&Typescript의 extends 문법은 다중 상속을 지원하지 않음. (상위 클래스 n개를 상속받는 것이 문법적으로 불가능)

- ex. Api를 상속받고 있는 NewsFeedApi, 근데 이 상위 클래스가 여러개 이고 싶음. → 문법적으로 불가능함.
  - 믹스인은 '코드'로 만들어 놓은 기법으로 그런 것들이 가능해지는 것.
- class extends 만으로도 대부분의 경우는 충분하기 때문에 이런 번거롭고 어려운 측면들 때문에 특별하게 이유가 없다면, 믹스인을 쓰지 않는 경우들도 굉장히 많음.
- 코드베이스 자체에서 굉장한 유연성을 필요로 하는 경우에 적합함. (어플리케이션 상황, 개발자의 성향에 따라...)
- DRF의 mixin이 이런 느낌이였던거였나...

---

##### 05. 뷰 클래스로 코드 구조 개선 (✨메인 이벤트 세션✨)

```
1. 공통 요소 추출
2. 구조 분해 할당
3. 라우터 구현
4. 접근 제어
```

---
