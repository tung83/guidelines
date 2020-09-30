import React, { useState } from "react";
import { Row, Col } from "antd";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./Guideline.css";

const GuideContent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleEditorStateChange = (newEditor) => {
    setEditorState(editorState);
  };

  return (
    <Row>
      <Col span={24}>col-8</Col>
      <Col span={24}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleEditorStateChange}
        />
      </Col>
    </Row>
  );
};
export default GuideContent;
