import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, Button, Checkbox } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "./Guideline.css";
import { NodeData } from "model";

export interface GuideTreeNodeProps {
  item: NodeData;
  handleAddNewNode: any;
  handleDeleteNode: any;
  handleItemNameChanged: any;
  currentGuideNode: NodeData;
  guidelineViewMode: boolean;
}
const GuideTreeNode = ({
  item,
  handleAddNewNode,
  handleDeleteNode,
  handleItemNameChanged,
  currentGuideNode,
  guidelineViewMode,
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
      {!guidelineViewMode ? (
        <React.Fragment>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"small"}
            onClick={(e: any) => handleAddNewNode(item)}
          />

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
        </React.Fragment>
      ) : (
        <span>{item.name}</span>
      )}
    </div>
  );
};
export default connect((state: any) => {
  return {
    currentGuideNode: state.guideNode.currentGuideNode,
    guidelineViewMode: state.guideline.guidelineViewMode,
  };
}, {})(GuideTreeNode);
