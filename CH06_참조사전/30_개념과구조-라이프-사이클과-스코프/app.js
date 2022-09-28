let myname = "jeong";

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
