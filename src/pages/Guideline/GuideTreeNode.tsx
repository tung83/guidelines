import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, Button, Checkbox } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "./Guideline.css";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { NodeData } from "model";

export interface GuideTreeNodeProps {
  item: NodeData;
  handleAddNewNode: any;
  handleDeleteNode: any;
  handleItemNameChanged: any;
  handleItemCheckChanged: any;
  currentGuideNode: NodeData;
}
const GuideTreeNode = ({
  item,
  handleAddNewNode,
  handleDeleteNode,
  handleItemNameChanged,
  handleItemCheckChanged,
  currentGuideNode,
}: GuideTreeNodeProps) => {
  const [nameValue, setNameValue] = useState("");
  const [oldText, setOldText] = useState<any>();
  const [checkedValue, setCheckedValue] = useState(false);
  useEffect(() => {
    setNameValue(item.name);
    setOldText(item.name);
    if (currentGuideNode && item.key === currentGuideNode.key) {
      setCheckedValue(true);
    }
  }, [item]);

  // reset checkbox
  useEffect(() => {
    if (checkedValue) {
      if (!currentGuideNode || item.key !== currentGuideNode.key)
        setCheckedValue(false);
    }
  }, [currentGuideNode]);

  const handleChangeCheckboxTrigger = (e: any) => {
    const newCheckedValue = !checkedValue;
    setCheckedValue(newCheckedValue);
    handleItemCheckChanged(newCheckedValue ? item : null);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (oldText !== nameValue) {
      setOldText(nameValue);
      handleItemNameChanged({ ...item, name: nameValue });
    }
  };

  return (
    <div className="tree-node-guideline">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size={"small"}
        onClick={(e: any) => handleAddNewNode(item)}
      />
      <div className="checkbox-container">
        <Checkbox className="tree-node-guide-checkbox" checked={checkedValue} />
        <div
          className="checkbox-action"
          onClick={handleChangeCheckboxTrigger}
        ></div>
      </div>
      <Input
        className="tree-node-guide-text"
        value={nameValue}
        placeholder="Tiêu đề node"
        onChange={handleChangeName}
        onBlur={handleBlur}
      />
      <Button
        className="tree-node-guide-btn-delete"
        icon={<CloseOutlined />}
        size={"small"}
        onClick={(e: any) => handleDeleteNode(item)}
      />
    </div>
  );
};
export default connect((state: any) => {
  return {
    currentGuideNode: state.guideNode.currentGuideNode,
  };
}, {})(GuideTreeNode);
