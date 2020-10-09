import React, { useEffect } from "react";
import { Row, Col } from "antd";
import "./Guideline.css";
import GuideMain from "./GuideMain";
import GuideNav from "./GuideNav";
import GuideTree from "./GuideTree";
import GuideContent from "./GuideContent";
import { connect } from "react-redux";

import { onIsViewOnlyMode } from "../../store/guideline/action";
export interface GuidelineProps {
  isViewOnly?: boolean | null;
  onIsViewOnlyMode: any;
}
const Guideline = ({ onIsViewOnlyMode, isViewOnly = null }: GuidelineProps) => {
  useEffect(() => {
    onIsViewOnlyMode(isViewOnly);
  }, [isViewOnly]);
  return (
    <div className="guide-layout">
      <Row>
        <Col className="guide-nav-col">
          {!isViewOnly && <GuideNav />}
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

export default connect(
  (state: any) => {
    return {};
  },
  {
    onIsViewOnlyMode,
  }
)(Guideline);
