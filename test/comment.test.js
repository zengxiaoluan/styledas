import { expect, test } from 'vitest';
import { styles } from '../src/index';

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

export default str;

test(str, () => {
  expect(styles(str)).toBe('.u{color:black;}.u:hover{color:red;}');

  expect(styles(str2)).toBe('.u{}');
});
