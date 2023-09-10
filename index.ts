import { parser, stringify, styles } from "./src/index";

export default styles;

/*
let str = `.user{
    color: black;
    .h{
    color: red;
    }
}`;
*/

let str = `.u{
    o: k;
    &.h{
    r: r;
    }
    .a{
    c: r;
    }
}`;

document.getElementById("pre")!.textContent = str;

console.time("time");
let root = parser(str);
console.log(root);
console.log(stringify(root, ""));
console.timeEnd("time");

// https://www.youtube.com/watch?v=jGwO_UgTS7I
