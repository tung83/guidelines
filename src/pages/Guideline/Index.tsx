import React from "react";
import { Row, Col } from "antd";
import "./Guideline.css";
import GuideMain from "./GuideMain";
import GuideNav from "./GuideNav";
import GuideTree from "./GuideTree";
import GuideContent from "./GuideContent";

const Guideline = () => {
  return (
    <div className="guide-layout">
      <Row>
        <Col span={6}>
          <GuideNav />
          <GuideMain />
        </Col>
        <Col span={6}>
          <GuideTree />
        </Col>
        <Col span={24}>
          <GuideContent />
        </Col>
      </Row>
    </div>
  );
};
export default Guideline;
