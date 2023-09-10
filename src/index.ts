interface Node {
  selector: string;
  content: string[];
  subs: Node[];
  parent: Node | null;
}

class Node implements Node {
  selector: string = "";
  content: string[] = [];
  subs: Node[] = [];
  parent: Node | null = null;

  constructor() {}
}

export function parser(str) {
  let dummy: Node = new Node();
  let cur: Node = dummy;
  let characters = "";
  let stack: Node[] = [];
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

  function comment() {
    while (true) {
      let c = peek();
      if (["\n"].includes(c)) break;
      else next();
    }

    return "";
  }

  let scanning = true;
  while (scanning) {
    previous = c;
    c = next();
    if (c === void 0) break;

    switch (c) {
      case "{": {
        let node = new Node();
        cur.subs.push(node);
        node.parent = cur;

        cur = node;

        if (cur.parent && cur.parent !== dummy && characters.startsWith(".")) characters = " " + characters;

        cur.selector = characters.replace("&", "");
        stack.push(cur);

        characters = "";
        isSelector = false;
        break;
      }

      case ";": {
        characters += c;
        cur.content.push(characters);
        characters = "";
        break;
      }
      case "}": {
        cur.content.push(characters);

        characters = "";

        stack.pop();

        let _ = stack[stack.length - 1];
        if (_) {
          cur = _;
        }
        break;
      }

      case ".":
        isSelector = true;
        characters += c;
        break;
      case "&": {
        characters = c;
        isSelector = true;
        break;
      }

      case "/":
        if (peek() === "/") comment();
        break;

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

  return dummy.subs[0];
}

export function stringify(node: Node, preSelector: string) {
  let css = "";
  if (!node) return css;

  css += preSelector + node.selector + "{" + node.content.join("") + "}";
  for (const sub of node.subs) {
    css += stringify(sub, preSelector + node.selector);
  }

  return css;
}

export function styles(str) {
  let root = parser(str);
  return stringify(root, "");
}
