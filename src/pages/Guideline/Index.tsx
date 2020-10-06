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
        <Col className="guide-nav-col">
          <GuideNav />
          <GuideMain />
        </Col>
        <Col className="guide-tree-col">
          <GuideTree />
        </Col>
        <Col className="guide-content-col">
          <GuideContent />
        </Col>
      </Row>
    </div>
  );
};
export default Guideline;
