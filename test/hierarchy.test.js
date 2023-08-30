import { expect, test } from "vitest";
import { styles } from "../src/index";

let str = `.user{
    color: black;
    &.h{
    color: red;
    }
}`;

export default str;

test(str, () => {
  expect(styles(str)).to.be.string;
});
