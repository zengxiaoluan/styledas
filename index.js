let str = `.u{
    a:1;
    & ~ h{
        a:2;
        & > d{
          d:1;
        }
    }
    &:hover{
      color:red;
    }
    b:1;
}`;

document.getElementById("pre").textContent = str;

function parser(str) {
  let root = {
    selector: "",
    subs: [],
    content: [],
  };
  let cur = root;
  let selector = "";
  let stack = [];
  let content = [];
  let isContent = false;
  let isSelector = true;

  for (let c of str) {
    switch (c) {
      case "{": {
        cur.selector = selector;
        stack.push(cur);

        selector = "";
        isContent = true;
        content = "";
        break;
      }
      case "}": {
        cur.content = content;

        content = "";
        isContent = true;

        stack.pop();

        let _ = stack[stack.length - 1];
        if (_) {
          cur = _;

          content = cur.content;
        }
        break;
      }
      case "\n":
      case " ": {
        break;
      }
      case "&": {
        let newRoot = {
          subs: [],
        };
        cur.subs.push(newRoot);
        cur.content = content;

        cur = newRoot;
        selector = "";
        content = "";
        isContent = false;
        isSelector = true;
        break;
      }

      default: {
        if (isContent) {
          content += c;
        } else if (isSelector) {
          selector += c;
        }
        break;
      }
    }
  }

  return root;
}

function stringify(node, pre) {
  let css = "";
  if (!node) return css;

  css += pre + node.selector + "{" + node.content + "}";
  for (const sub of node.subs) {
    css += stringify(sub, pre + node.selector);
  }

  return css;
}

console.time("time");
let root = parser(str);
console.log(root, stringify(root, ""));

console.timeEnd("time");

// https://www.youtube.com/watch?v=jGwO_UgTS7I
