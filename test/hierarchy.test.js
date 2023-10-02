import { expect, test } from 'vitest';
import { styledas } from '../src/index';

let str = `.user{
    color: black;
    .h{
    color: red;
    }
}`;

export default str;

test(str, () => {
  expect(styledas(str)).toBe('.user{color:black;}.user .h{color:red;}');
});
