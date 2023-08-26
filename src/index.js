export function parser(str) {
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
  let keepSpace = false;

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
      case ":": {
        if (isContent) {
          content += c;
          keepSpace = true;
        } else if (isSelector) {
          selector += c;
        }
        break;
      }
      case ";": {
        if (isContent) {
          content += c;
          keepSpace = false;
        } else if (isSelector) {
          selector += c;
        }
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
        break;
      case "\t":
        break;
      case " ": {
        if (isContent && keepSpace) {
          content += c;
        }
        break;
      }
      case ".":
        isSelector = true;
        selector += c;
        break;
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
  return root, stringify(root, "");
}
