import { expect, test } from "vitest";
import { styles } from "../src/index";

let str = `.u{
    color: black;
    	&:hover {
        color: red;
    }
}`;

export default str;

test(str, () => {
  expect(styles(str)).toBe(".u{color:black;}.u:hover{color:red;}");
});
