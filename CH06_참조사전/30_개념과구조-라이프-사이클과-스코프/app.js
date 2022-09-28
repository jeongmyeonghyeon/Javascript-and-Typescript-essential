let myname = "jeong"; // 전역 스코프 변수, 애플리케이션이 종료될 때까지 존재하는 변수.

function foo() {
  let x = 10;

  console.log(myname);
  console.log(x);

  bar();
  zoo();

  function bar() {
    let y = 10;

    console.log(x);
    console.log(myname);
  }

  const zoo = function () {};

  if (x === 10) {
    let x = 100;

    console.log(x);
  }

  bar();
}

foo();
console.log(x);
