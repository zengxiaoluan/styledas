import { parser, stringify, styles } from './src/index';

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
    /*
    color: black; // b
    	&:hover {
        color: red;
        // c
    }*/
}`;

document.getElementById('pre')!.textContent = str;

console.time('time');
let root = parser(str);
console.log(root);
console.log(stringify(root, ''));
console.timeEnd('time');

// https://www.youtube.com/watch?v=jGwO_UgTS7I
