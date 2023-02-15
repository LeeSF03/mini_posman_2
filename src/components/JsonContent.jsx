import { React, useRef, useEffect } from "react";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { keymap, EditorView } from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import "./JsonContent.css";

function JsonContent(props) {
  const editor = useRef();

  const onUpdate = EditorView.updateListener.of((view) => {
    const text = view.state.doc.toString();
    /* console.log(text) */
    props.getData(text);
  });

  useEffect(() => {
    const requestEditor = new EditorView({
      state: EditorState.create({
        doc: "{\n\t\n}",
        extensions: [
          basicSetup,
          keymap.of([indentWithTab, defaultKeymap]),
          json(),
          EditorState.tabSize.of(2),
          onUpdate,
        ],
      }),
      parent: editor.current,
    });

    return () => {
      requestEditor.destroy();
    };
  });

  return (
    <div
      className="tab-pane show"
      id="json"
      role="tabpanel"
      aria-labelledby="json-tab"
    >
      <div data-json-body className="overflow-auto mh-50 mb-3">
        <div ref={editor}></div>
      </div>
    </div>
  );
}

export default JsonContent;
