import { expect, test } from 'vitest';
import { styledas } from '../src/index';

let str = `.u{
    color: black;
    	&:hover {
        color: red;
    }
}`;

export default str;

test(str, () => {
  expect(styledas(str)).toBe('.u{color:black;}.u:hover{color:red;}');
});
