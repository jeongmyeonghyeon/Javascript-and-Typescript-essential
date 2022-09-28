const c1 = {
  name: "C1",
  color: "red",
};

const c2 = {
  name: "C2",
  width: 300,
};

const c3 = {
  name: "C3",
  height: 100,
};

console.log(c1);
console.log(c2);
console.log(c3);

// Object;

// c1.__proto__

// console.log(c1.toString());

c1.__proto__ = c2;
console.log(c1.width);

c3.__proto__ = c2;

function Foo(name) {
  this.name = name;
  this.__proto__ = Foo.prototype;
}

Foo.prototype.lastName = "WooWa";

const f = new Foo("Jeong myeong hyeon");

console.log(f.name);
console.log(f.lastName);
