import { expect, test } from "vitest";
import { styles } from "../src/index";

let str = `.u{
    // a
    color: black; // b
    	&:hover {
        color: red;
        // c
    }// d
}`;

export default str;

test(str, () => {
  expect(styles(str)).toBe(".u{color:black;}.u:hover{color:red;}");
});
