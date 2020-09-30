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
        <Col span={5}>
          <GuideNav />
          <GuideMain />
        </Col>
        <Col span={7}>
          <GuideTree />
        </Col>
        <Col span={12}>
          <GuideContent />
        </Col>
      </Row>
    </div>
  );
};
export default Guideline;
