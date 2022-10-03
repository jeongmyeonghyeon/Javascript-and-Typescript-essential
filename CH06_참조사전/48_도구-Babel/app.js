class Double {
  x;

  constructor(x) {
    this.x = x;
  }

  getValue() {
    return this.x * 2;
  }
}

const d = new Double(10);

d.getValue();
