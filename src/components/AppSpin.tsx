import { Spin } from "antd";
import React, { FC, useState } from "react";
import "./AppSpint.css";

const AppSpin: FC = () => {
  const [saving, setSaving] = useState(false);
  return <Spin tip="Saving..." spinning={saving}></Spin>;
};
export default AppSpin;
