import { expect, test } from "vitest";
import { styles } from "../src/index.js";

let str = `.u{
    color: black;
    background-size: 1px 1px;
}`;

export default str;

test(str, () => {
  expect(styles(str)).toBe(".u{color: black;background-size: 1px 1px;}");
});
