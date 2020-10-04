import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import {
  guideNodeContentPut,
  guideNodeContentPost,
} from "../../store/guideNodeContent/action";

const HtmlEditor = ({
  currentGuideNodeContent,
  currentGuideNode,
  guideNodeContentPut,
  guideNodeContentPost,
}: any) => {
  const [editorState, setEditorState] = useState("");
  const [oldText, setOldText] = useState<any>();
  useEffect(() => {
    const htmlText =
      currentGuideNodeContent == null || !currentGuideNodeContent.Content
        ? ""
        : currentGuideNodeContent.Content;
    setEditorState(htmlText);
    setOldText(htmlText);
  }, [currentGuideNodeContent]);

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
            NodeId: currentGuideNode.Id,
            Id: 0,
            Content: editorState,
          });
    }
  };
  const handleFocus = (event: any) => {};
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
      currentGuideNode: state.guideNode.currentGuideNode,
    };
  },
  {
    guideNodeContentPut,
    guideNodeContentPost,
  }
)(HtmlEditor);
