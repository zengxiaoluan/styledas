import { parser, stringify } from "./src/index.js";

let str = `.user{
    color: black;
    background-size: 1px 1px;
}`;

document.getElementById("pre").textContent = str;

console.time("time");
let root = parser(str);
console.log(root, stringify(root, ""));

console.timeEnd("time");

// https://www.youtube.com/watch?v=jGwO_UgTS7I
