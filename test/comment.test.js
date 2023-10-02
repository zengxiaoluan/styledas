import { expect, test } from 'vitest';
import { styledas } from '../src/index';

let str = `.u{
    // a
    color: black; // b
    	&:hover {
        color: red;
        // c
    }// d
}`;

let str2 = `.u{
    /*
    color: black; // b
    	&:hover {
        color: red;
        // c
    }*/
}`;

let str3 = `.a{
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

export default str;

test(str, () => {
  expect(styledas(str)).toBe('.u{color:black;}.u:hover{color:red;}');

  expect(styledas(str2)).toBe('.u{}');

  expect(styledas(str3)).toBe(
    '.a{color:red;}.a button{color:blue;}.a button{color:red;}.a h1{color:red;color:red;}',
  );
});
