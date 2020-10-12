import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "./Guideline.css";
import { NodeData } from "model";

export interface GuideTreeNodeProps {
  item: NodeData;
  handleAddNewNode: any;
  handleDeleteNode: any;
  handleItemNameChanged: any;
  guidelineViewMode: boolean;
}
const GuideTreeNode = ({
  item,
  handleAddNewNode,
  handleDeleteNode,
  handleItemNameChanged,
  guidelineViewMode,
}: GuideTreeNodeProps) => {
  const [nameValue, setNameValue] = useState("");
  const [oldText, setOldText] = useState<any>();
  useEffect(() => {
    setNameValue(item.name + ">>" + item.order);
    setOldText(item.name);
  }, [item]);

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
    guidelineViewMode: state.guideline.guidelineViewMode,
  };
}, {})(GuideTreeNode);
