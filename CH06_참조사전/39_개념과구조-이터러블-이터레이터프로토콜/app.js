const myIterable = {};

// Symbol - 언어 구조에서 유일한 값을 만들어내는 기능.
// 아래와 같이 특별한 key를 만들 때 문자열로 만들면 똑같은 문자열로 다른 내용을 만들어 낼 수도 있는데, 이런 것들을 제한하기 위해서 unique한 value를 만들어내는 용도의 기본 값. 그중에 iterator는 시스템에서 정의하고 있는 값들 가운데 하나다.
// - myIterable 객체에 Symbol.iterator key를 주고 이터레이션 프로토콜을 준수하는 함수를 넣어줬다.
myIterable[Symbol.iterator] = function* () {
  let i = 1;
  while (i <= 100) {
    yield i++;
  }
};

// .next()를 호출하지 않았음에도 불구하고 1부터 100까지 출력한다.
for (const n of myIterable) {
  console.log(n);
}
