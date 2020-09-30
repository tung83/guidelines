import React from "react";
import { Row, Col } from "antd";
import "./Guideline.css";
import HtmlEditor from "./HtmlEditor";
import { Input } from "antd";
const { TextArea } = Input;

const GuideContent = () => {
  return (
    <Row>
      <Col span={24}>
        <TextArea className="text-guide-content" rows={6} />
      </Col>
      <Col span={24}>
        <HtmlEditor />
      </Col>
    </Row>
  );
};
export default GuideContent;
