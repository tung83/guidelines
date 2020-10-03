import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, Button, Checkbox } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "./Guideline.css";
import {
  guideNodeFetch,
  guideNodePut,
  guideNodePost,
  guideNodeDelete,
} from "../../store/guideNode/action";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
const GuideTreeNode = ({
  item,
  handleAddNewNode,
  handleDeleteNode,
  handleItemNameChanged,
  handleItemCheckChanged,
}: any) => {
  const [nameValue, setNameValue] = useState("");
  const [oldText, setOldText] = useState<any>();
  useEffect(() => {
    setNameValue(item.Name);
    setOldText(item.Name);
  }, [item]);
  const handleChangeCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    handleItemCheckChanged(item);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (oldText !== nameValue) {
      handleItemNameChanged({ ...item, Name: nameValue });
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
      <Checkbox
        className="tree-node-guide-checkbox"
        onChange={handleChangeCheckbox}
      />
      <Input
        className="tree-node-guide-text"
        value={nameValue}
        placeholder="Guideline name"
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
export default connect(
  (state: any) => {
    return {
      currentChildNodes: state.guideline.currentChildNodes,
      onGuidelineSelected: state.guideline.onGuidelineSelected,
    };
  },
  {
    guideNodeFetch,
    guideNodePost,
    guideNodePut,
    guideNodeDelete,
  }
)(GuideTreeNode);
