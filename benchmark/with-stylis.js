let { styledas } = require('styledas');
let { compile, serialize, stringify } = require('stylis');

let str = `.a{
        // line comment
        // color: red;
        /**
         * removes block comments and line comments,
         * there's a fire in the house // there is
         */
        button /*
          // what's
          xxx
          */
        {color: blue;}
        // hello
        button /* 1 */
        {
          color: red; /* 2 */
        }
        /*! 1 */
        color: red;
        /*! 2 */
        h1 {
          /*! 1 */
          color: red;
          /*! 2 */
          color: red;
          /*! 3 */
        }}
      `;

console.time('styledas');
console.log(styledas(str));
console.timeEnd('styledas');

console.time('stylis');
console.log(serialize(compile(str), stringify));
console.timeEnd('stylis');
