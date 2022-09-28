function increment() {
  let saveNumber = 1;
  return function () {
    return saveNumber++;
  };
}

const inc = increment();

console.log(inc());
console.log(inc());
console.log(inc());

// saveNumber = 200; // 동작하지 않는 코드.
