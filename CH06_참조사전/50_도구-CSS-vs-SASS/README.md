#### CSS vs SASS

---

```
1. 변수
2. 중첩
3. 모듈
```

**변수**

- scss

  ```scss
  $font-stack: Helvetica, sans-serif;
  $primary-color: #333;

  body {
    font: 100% $font-stack;
    color: $primary-color;
  }
  ```

- css

  ```css
  body {
    font: 100% Helvetica, sans-serif;
    color: #333;
  }
  ```

변수를 사용할 수 있다는 것 하나만으로도 sass를 사용할 가치는 충분하다.

<br />

**중첩**

- scss

  ```scss
  nav {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: inline-block;
    }

    a {
      display: block;
      padding: 6px 12px;
      text-decoration: none;
    }
  }
  ```

- css

  ```css
  nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  nav li {
    display: inline-block;
  }
  nav a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
  ```

<br />

**모듈**

자바스크립트의 module과 거의 똑같은 기능이라고 할 수있다.

- scss

  ```scss
  // _base.scss
  $font-stack: Helvetica, sans-serif;
  $primary-color: #333;

  body {
    font: 100% $font-stack;
    color: $primary-color;
  }

  // styles.scss
  @use "base";

  .inverse {
    background-color: base.$primary-color;
    color: white;
  }
  ```

- css

  ```css
  body {
    font: 100% Helvetica, sans-serif;
    color: #333;
  }

  .inverse {
    background-color: #333;
    color: white;
  }
  ```
