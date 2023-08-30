import { parser, stringify } from "./src/index";

let str = `.user{
    color: black;
    .h{
    color: red;
    }
}`;

document.getElementById("pre")!.textContent = str;

console.time("time");
let root = parser(str);
console.log(root);
console.log(stringify(root, ""));
console.timeEnd("time");

// https://www.youtube.com/watch?v=jGwO_UgTS7I
