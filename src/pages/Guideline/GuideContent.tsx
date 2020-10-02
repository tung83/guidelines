import React from "react";
import { Row, Col } from "antd";
import "./Guideline.css";
import HtmlEditor from "./HtmlEditor";

const GuideContent = () => {
  return (
    <Row>
      <Col span={24}>
        <HtmlEditor />
      </Col>
    </Row>
  );
};
export default GuideContent;
