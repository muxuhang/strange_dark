---
title: lexical 创建自定义块
date: "2023-05-04 17:31"
description: "lexical block 基本插入"
---

#### 版本号

```js
  "@lexical/react": "^0.10.0",
  "lexical": "^0.10.0",
```

#### editor.jsx

```jsx
const initialConfig = {
  nodes: [BlockDemo],
}
<TableContext>
  <SharedAutocompleteContext>
    ...
    <BlockDemoPlugin />
  </SharedAutocompleteContext>
</TableContext>
```

#### BlockDemoPlugin.ts

```jsx
import { useEffect } from "react"
import { createCommand } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodeToNearestRoot } from "@lexical/utils"
import { $insertNodes } from "../../lexical/src"
import { $createBlockDemoNode } from "./BlockDemoNode"

type CommandPayload = string
export const INSERT_BLOCKDEMO_COMMAND: LexicalCommand<CommandPayload> = createCommand(
  "INSERT_BLOCKDEMO_COMMAND"
)
export function BlockDemoPlugin(): ReactNode {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    // Similar with command listener, which returns unlisten callback
    const removeListener = editor.registerCommand(
      INSERT_BLOCKDEMO_COMMAND,
      payload => {
        const node = $createBlockDemoNode(payload)
        $insertNodeToNearestRoot(node)
        return true
      },
      0
    )
    return () => {
      removeListener()
    }
  }, [editor])
  return null
}
```

#### BlockDemoNode.tsx

```js
import { LexicalEditor, LexicalNode, TextNode } from 'lexical';
import {  SerializedTextNode, DOMConversionMap } from 'lexical';

function convertBlockDemoElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLElement) {
    const { text: text } = domNode;
    const node = $createBlockDemoNode({ text });
    return { node };
  }
  return null;
}

export class BlockDemoNode extends TextNode {
  __text: string;

  static getType(): string {
    return 'blockdemo';
  }

  static clone(node: BlockDemoNode): BlockDemoNode {
    return new BlockDemoNode(node.__text, node.__key);
  }

  constructor(text: string, key?: NodeKey) {
    super(key);
    this.__text = text;
  }

  static importJSON(serializedNode: SerializedTextNode): BlockDemoNode {
    const { text } = serializedNode;

    const node = $createImageNode({
      text,
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  exportJSON(): SerializedTextNode {
    return {
      text: this.__text
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    // span.style.textEmphasis = 'dot #333';
    // span.style.textEmphasisPosition = 'under';
    return span;
  }

  updateDOM(): false {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (node: Node) => ({
        conversion: convertBlockDemoElement,
        priority: 0,
      }),
    };
  }
  decorate(editor: LexicalEditor): ReactNode {
    return <span>{this.__text}</span>;
  }
}
export function $createBlockDemoNode(text: string): BlockDemoNode {
  return new BlockDemoNode(text);
}
export function $isBlockDemoNode(
  node: LexicalNode | null | undefined,
): node is BlockDemoNode {
  return node instanceof BlockDemoNode;
}

```

#### 使用

```js
const text = "demo"
editor.dispatchCommand(INSERT_BLOCKDEMO_COMMAND, text)
```
