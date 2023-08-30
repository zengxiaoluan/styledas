interface Node {
  selector: string;
  content: string;
  subs: Node[];
}

class Node implements Node {
  selector: string = "";
  content: string = "";
  subs: Node[] = [];

  constructor() {}
}

export function parser(str) {
  let root = new Node();

  let cur = root;
  let characters = "";
  let stack: Node[] = [];
  let isContent = false;
  let isSelector = true;

  let position = 0; // 当前字符串位置指针
  let previous = "";
  let c = "";

  function next() {
    return str[position++];
  }

  function prev() {
    return str[--position];
  }

  function peek() {
    return str[position];
  }

  function whitespace(prev: string) {
    while (true) {
      let c = peek();
      if ([" ", "\n", "\t"].includes(c)) next();
      else break;
    }

    if ([":", "\n", "\t"].includes(prev)) return "";
    else return " ";
  }

  let scanning = true;
  while (scanning) {
    previous = c;
    c = next();
    if (c === void 0) break;

    switch (c) {
      case "{": {
        cur.selector = characters;
        stack.push(cur);

        characters = "";
        isContent = true;
        isSelector = false;
        break;
      }

      case ";": {
        characters += c;
        break;
      }
      case "}": {
        cur.content = characters;

        characters = "";
        isContent = true;

        stack.pop();

        let _ = stack[stack.length - 1];
        if (_) {
          cur = _;

          characters = cur.content;
        }
        break;
      }

      case ".":
        isSelector = true;
        characters += c;
        break;
      case "&": {
        let newRoot = new Node();
        cur.subs.push(newRoot);
        cur.content = characters;

        cur = newRoot;
        characters = "";
        isContent = false;
        isSelector = true;
        break;
      }

      case "\n":
        break;
      case "\t":
        break;
      case " ": {
        if (isSelector) break;
        c = whitespace(previous);
      }

      default: {
        characters += c;
        break;
      }
    }
  }

  return root;
}

export function stringify(node, pre) {
  let css = "";
  if (!node) return css;

  css += pre + node.selector + "{" + node.content + "}";
  for (const sub of node.subs) {
    css += stringify(sub, pre + node.selector);
  }

  return css;
}

export function styles(str) {
  let root = parser(str);
  return stringify(root, "");
}
