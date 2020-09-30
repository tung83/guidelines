import React from "react";
import { Editor, EditorState } from "draft-js";

const HtmlEditor = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const editor = React.useRef<any>(null);

  function focusEditor() {
    if (editor && editor.current) editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor();
  }, []);

  return (
    <div onClick={focusEditor}>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={(editorState) => setEditorState(editorState)}
      />
    </div>
  );
};
export default HtmlEditor;
