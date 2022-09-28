let saveNumber = 1;

function increment() {
  return saveNumber++;
}

console.log(increment());
console.log(increment());

saveNumber = 200; // 변수를 보호하고 있지 못하다. 원천적으로 바깥쪽에서는 접근하지 못하게 만드는 방법이 필요하다!

console.log(increment());
