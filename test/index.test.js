import { expect, test } from 'vitest';
import { styledas } from '../src/index';

let str = `.u{
    color: black;
    background-size: 1px 1px;
}`;

export default str;

test(str, () => {
  expect(styledas(str)).toBe('.u{color:black;background-size:1px 1px;}');
});
