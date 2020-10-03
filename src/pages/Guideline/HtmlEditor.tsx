import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import {
  guideNodeContentPut,
  guideNodeContentPost,
} from "../../store/guideNodeContent/action";

const HtmlEditor = ({
  currentGuideNodeContent,
  currentGuideNodeContentId,
  guideNodeContentPut,
  guideNodeContentPost,
}: any) => {
  const [editorState, setEditorState] = useState("");
  useEffect(() => {
    setEditorState(
      currentGuideNodeContent == null ? "" : currentGuideNodeContent.Content
    );
  }, [currentGuideNodeContent]);
  const [oldText, setOldText] = useState<any>();

  const handleEditorChange = (content: any, editor: any) => {
    setEditorState(content);
  };

  const saveTextChanged = (event: any) => {
    if (oldText !== editorState) {
      setOldText(editorState);
      console.log("update name", oldText, editorState);
      currentGuideNodeContent?.Id > 0
        ? guideNodeContentPut(currentGuideNodeContent.Id, {
            ...currentGuideNodeContent,
            Content: editorState,
          })
        : guideNodeContentPost({
            NodeId: currentGuideNodeContentId,
            Id: 0,
            Content: editorState,
          });
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
export default connect(
  (state: any) => {
    return {
      currentGuideNodeContent: state.guideNodeContent.currentGuideNodeContent,
      currentGuideNodeContentId:
        state.guideNodeContent.currentGuideNodeContentId,
    };
  },
  {
    guideNodeContentPut,
    guideNodeContentPost,
  }
)(HtmlEditor);
