## 예외

```
1. do exception
2. try catch
3. 예외 vs 반환값 확인
```

<br />

**예외적인 상황?**

오류, 성공 또는 실패.

2가지 측면이 있을 수 있다. <br />
명확하게 '이건 어떤 오류야' 하고 반환 값을 주는 경우. <br />
하지만, 실질적으로 오류가 날지, 오류가 나지 않을지가 불명확한 상황들이 있을 수 있다.

```js
function doException() {
  throw new Error("와우! 오류야!");
}

function main() {
  doException();
}

main();
```

↑ 프로그램이 그냥 종료된다.
프로그램이 종료되는 시점이 언제일까? throw를 어디에서도 받아주지 않으면(!) 종료가 된다.

```js
// 받아주는(!) 코드
// 애플리케이션이 종료되는게 아니라, 오류를 처리한 코드.
// 사용자에게 피드백을 줄 수 있는 단단한(!) 애플리케이션 모양이 됐다.
function doException() {
  throw new Error("와우! 오류야!");
}

function noException() {
  return true;
}

function callException() {
  if (type === "do") {
    doException();
  } else {
    noException();
  }
}

function main() {
  try {
    // doException();
    // noException();

    // 뎁스에 상관없이, catch로 잡으면, 더 이상 바깥쪽으로 전파시키지 않는다.
    try {
      callException("do");
    }
  } catch (e) {
    console.log(e);
  } finally {
    console.log("done");
  }
}

main();
```

<br />

**예외 vs 반환값 확인**

```js
//...
function callException() {
  if (type === "do") {
    doException();
  } else {
    // 매번 오류를 이렇게 반환값으로 확인하는건... 😩
    if (noException() === false) {
      console.log("오류처리");
    }
  }
}
//...
```
