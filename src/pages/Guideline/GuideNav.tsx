import React from "react";
import { Button } from "antd";
import { nodeNavTurn } from "../../store/nodeNav/action";
import {
  RightOutlined,
  LeftOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./Guideline.css";
import { connect } from "react-redux";

const GuideNav = ({ nodeNavTurn }: any) => {
  return (
    <React.Fragment>
      <div className="left-right-nav">
        <Button
          type="primary"
          icon={<LeftOutlined />}
          onClick={(e: any) => nodeNavTurn("out")}
        />
        <Button
          type="primary"
          icon={<RightOutlined />}
          onClick={(e: any) => nodeNavTurn("in")}
        />
      </div>
      <div className="up-down-nav">
        <Button
          type="primary"
          icon={<UpOutlined />}
          onClick={(e: any) => nodeNavTurn("up")}
        />
        <Button
          type="primary"
          icon={<DownOutlined />}
          onClick={(e: any) => nodeNavTurn("down")}
        />
      </div>
    </React.Fragment>
  );
};

export default connect(
  (state: any) => {
    return {};
  },
  {
    nodeNavTurn,
  }
)(GuideNav);
