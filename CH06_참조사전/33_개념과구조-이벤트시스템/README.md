#### 이벤트 시스템

브라우저가 제공하는 시스템.

특정 UI가 사용자와 인터랙션 할 때 실행해야 될 코드가 있는데,
사용자가 언제 UI에 반응할지 알 수 없어
이 실행해야 될 코드를 코드 상으로 특정할 수 없다.
그래서 등장한 것이 이벤트 시스템.

`addEventListner`라고 하는 이벤트 리스너를 이용해서
"어떤 DOM로드에 어떤 이벤트가 발생하면, 어떤 함수 좀 호출해 줘."라고 등록하는 형태를 취하고 있다.

이벤트를 등록하고 난 후에 중첩되있는 html의 node에서 이벤트들이 어떻게 발생하고, 어떻게 전파되는지 그리고 그렇게 중복적으로 전파됐을 때 정확하게 어떤 노드가 이벤트를 발생시켰는지 알 수있는 방법은 없는지
혹은 그걸 알 수 있게 하기 위한 내부적인 메커니즘은 없는지를 살펴보는 시간~

---

```
1. 버블링 이벤트
2. 캡처링 이벤트
3. 이벤트 루프
```

**`addEventListner`의 3번째 인자**

'이벤트가 중첩됐을 때, 어떻게 전파될 것인가' 하는 메커니즘을 결정하는 옵션.
(default - false(Bubbling) / true - (Capturing))

```js
const BUBBLING_PHASE = false;
const CAPTURING_PHASE = true;
const PHASE_NAME = ["NONE", "CAPTURING", "TARGET", "BUBBLING"];

div.addEventListener("click", eventLogger, BUBBLING_PHASE);
```

![](https://user-images.githubusercontent.com/19165916/192979434-b9c298bc-5317-4e19-ba20-ae0e2f9adeac.png)

**버블링**

안 쪽에 있는 요소가 클릭되었을 때, 클릭 이벤트가 바깥쪽으로 확산되어 나가는 것.
(탄산수 아래에서 거품이 뽀글뽀글 위로 올라가듯이 ^^;)

```
console.log(
  `${target.dataset.name}, ${currentTarget.dataset.name}, ${PHASE_NAME[eventPhase]}`
);

실제로 이벤트가 발생한 건 항상 이 target.
직접적으로 그 노드가 클릭돼서 이벤트가 발생된 게 아니라 전파돼서 발생된 것(여기서는 Bubbling)은 currentTarget. 을 통해서 알 수가 있다.


yellow, yellow, TARGET
yellow, blue, BUBBLING
yellow, red, BUBBLING
```

**캡처링**

버블링과 정확하게 반대로 작동한다.
맨 안쪽을 클릭하면, 맨 바깥에서부터 이벤트가 발생해서 안쪽으로 전파가 된다.

```
yellow, red, CAPTURING
yellow, blue, CAPTURING
yellow, yellow, TARGET
```

**이벤트 루프**

이벤트 시스템이라고 하는 근간에 브라우저가 갖고 있는 메커니즘.
내용이 꽤 까다롭고, 이해할 내용이 좀 많이 있다.

[어쨌든 이벤트 루프는 무엇입니까? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
