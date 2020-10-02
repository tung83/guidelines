import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const HtmlEditor = () => {
  const [editorState, setEditorState] = useState(
    "<p>tttThis is the initial content of the editor</p>"
  );
  const [oldText, setOldText] = useState<any>();

  const handleEditorChange = (content: any, editor: any) => {
    setEditorState(content);
  };

  const saveTextChanged = (event: any) => {
    if (oldText !== editorState) {
      setOldText(editorState);
      console.log("update name", oldText, editorState);
      //guidelinePut(1, { Content: editorState });
    }
  };
  const handleFocus = (event: any) => {
    if (oldText !== editorState) {
      setOldText(event.target.value);
    }
  };
  return (
    <Editor
      value={editorState}
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
      }}
      onEditorChange={handleEditorChange}
      onBlur={saveTextChanged}
      onFocus={handleFocus}
    />
  );
};
export default HtmlEditor;
