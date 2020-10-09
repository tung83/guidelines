import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import { guideNodeContentPut } from "../../store/guideNodeContent/action";
import { NodeContent } from "../../model";
import { TinyAPIKey } from "utils/constants";

export interface GuideContentProps {
  currentGuideNodeContent: NodeContent;
  guideNodeContentPut: any;
  guidelineViewMode: boolean;
}
const GuideContent = ({
  currentGuideNodeContent,
  guideNodeContentPut,
  guidelineViewMode,
}: GuideContentProps) => {
  const [editorState, setEditorState] = useState("");
  const [runInterval, setRunInterval] = useState(false);

  const [oldText, setOldText] = useState<any>();

  useEffect(() => {
    if (runInterval) {
      setRunInterval(false);
      saveTextChanged(null);
    }
  }, [runInterval]);
  useEffect(() => {
    const timer = setInterval(() => {
      setRunInterval(true);
    }, 10000);
    return () => clearInterval(timer);
  }, []);
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
    if (oldText && oldText !== editorState) {
      setOldText(editorState);
      guideNodeContentPut({
        nodeId: currentGuideNodeContent.nodeId,
        content: editorState,
      });
    }
  };
  function createMarkup() {
    return { __html: editorState };
  }
  return !guidelineViewMode ? (
    <Editor
      apiKey={TinyAPIKey}
      disabled={currentGuideNodeContent == null}
      value={editorState}
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: "calc(100vh - 102px)",
        plugins: [
          "print preview paste importcss searchreplace directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        ],
        menubar: "file edit view insert format tools table help",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",

        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_sticky: true,
      }}
      onEditorChange={handleEditorChange}
      onBlur={saveTextChanged}
    />
  ) : (
    <div dangerouslySetInnerHTML={createMarkup()} />
  );
};
export default connect(
  (state: any) => {
    return {
      currentGuideNodeContent: state.guideNodeContent.currentGuideNodeContent,
      guidelineViewMode: state.guideline.guidelineViewMode,
    };
  },
  {
    guideNodeContentPut,
  }
)(GuideContent);
