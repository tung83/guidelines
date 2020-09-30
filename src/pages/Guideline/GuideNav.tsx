import React from "react";
import { Button } from "antd";
import {
  RightOutlined,
  LeftOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { CgMoveRight } from "react-icons/cg";
import "./Guideline.css";

const GuideNav = () => {
  return (
    <React.Fragment>
      <div className="left-right-nav">
        <Button type="primary" icon={<CgMoveRight />}></Button>
        <Button type="primary" icon={<LeftOutlined />} />
        <Button type="primary" icon={<RightOutlined />} />
      </div>
      <div className="up-down-nav">
        <Button type="primary" icon={<UpOutlined />} />
        <Button type="primary" icon={<DownOutlined />} />
      </div>
    </React.Fragment>
  );
};
export default GuideNav;
