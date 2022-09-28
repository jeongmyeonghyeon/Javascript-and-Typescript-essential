function doubleTypeFunction(a: number | string) {
  if (typeof a === "string") {
    return a.replace("x", "X");
  }

  return a.replace("Y", "y");
}

doubleTypeFunction(10);

function foo(a?: number | null) {
  if (a === null) return;

  console.log("display before");
  console.log(a?.valueOf());
  console.log("display after");
}

foo();

interface Foo {
  foo: string;
  common: string;
}

function isFoo(arg: any): arg is Foo {
  return arg.foo !== undefined;
}

console.log(isFoo({ foo: "ok", common: "wow", active: false }));
