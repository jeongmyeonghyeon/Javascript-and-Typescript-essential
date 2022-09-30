class HeaderListData {
  constructor(source, separator = ",") {
    const rawData = source.split("\n");

    this.headers = rawData[0].split(separator);
    this.rows = rawData
      .filter((row, index) => index > 0)
      .map((row) => row.split(separator));
  }

  row = (index) => {
    return this.rows[index].map((row, index) => {
      return [this.headers[index], row];
    });
  };

  get length() {
    return this.rows.length;
  }

  get columnLength() {
    return this.headers.length;
  }
}

export default class MakeObject extends HeaderListData {
  toObject = (index) => {
    return this.row(index).reduce(
      (a, [key, value]) => ({ ...a, [key]: value }),
      {}
    );
  };

  toAllObject = () => {
    return Array(this.length)
      .fill(0)
      .map((item, index) => this.toObject(index));
  };
}
