import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import { guideNodeContentPut } from "../../store/guideNodeContent/action";
import { NodeContent } from "../../model";

export interface GuideContentProps {
  currentGuideNodeContent: NodeContent;
  guideNodeContentPut: any;
}
const GuideContent = ({
  currentGuideNodeContent,
  guideNodeContentPut,
}: GuideContentProps) => {
  const [editorState, setEditorState] = useState("");
  const [oldText, setOldText] = useState<any>();
  useEffect(() => {
    const htmlText =
      currentGuideNodeContent == null || !currentGuideNodeContent.content
        ? ""
        : currentGuideNodeContent.content;
    setEditorState(htmlText);
    setOldText(htmlText);
  }, [currentGuideNodeContent]);

  const handleEditorChange = (content: any, editor: any) => {
    setEditorState(content);
  };

  const saveTextChanged = (event: any) => {
    if (oldText !== editorState) {
      setOldText(editorState);
      guideNodeContentPut({
        nodeId: currentGuideNodeContent.nodeId,
        content: editorState,
      });
    }
  };
  const handleFocus = (event: any) => {};
  return (
    <Editor
      disabled={currentGuideNodeContent == null}
      value={editorState}
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: "calc(100vh - 102px)",
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
    };
  },
  {
    guideNodeContentPut,
  }
)(GuideContent);
