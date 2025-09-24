# styledas

A feature limited preprocessor.

I want a css preprocessor which have some feature limited css, like:

```css
.user {
  color: black;
  &:hover {
    color: red;
  }
}
```

so will have enough performance to support runtime requirements. That is all.

# Usage

```node
let { styledas } = require('styledas');

let str = `.u{
    color: black;
    	&:hover {
        color: red;
    }
}`;

console.log(styledas(str)); // .u{color:black;}.u:hover{color:red;}
```

# Which feature support util now?

You can check it under the test directory. It is still developing.

# Credits

This repo was highly inspired by `styled-components` and `stylis` which are both awesome web tools.
