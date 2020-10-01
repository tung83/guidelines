import React, { useEffect, useState } from "react";
import { Tree, Input, Button, Checkbox } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "./Guideline.css";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
const { TreeNode } = Tree;
const treeDataSample = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
];

const renderTreeNodes = (
  data: any,
  handleAddNewNode: any,
  handleDeleteNode: any
): any => {
  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const renderTitle = (item: any) => (
    <div className="tree-node-guideline">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size={"small"}
        onClick={(e: any) => handleAddNewNode(item)}
      />
      <Checkbox
        className="tree-node-guide-checkbox"
        onChange={onChangeCheckbox}
      />
      <Input
        className="tree-node-guide-text"
        value={item.title}
        placeholder="Guideline name"
      />
      <Button
        className="tree-node-guide-btn-delete"
        icon={<CloseOutlined />}
        size={"small"}
        onClick={(e: any) => handleDeleteNode(item)}
      />
    </div>
  );
  return data.map((item: any) => {
    if (!item.children) {
      return <TreeNode key={item.key} title={renderTitle(item)} />;
    }
    return (
      <TreeNode title={renderTitle(item)} key={item.key}>
        {renderTreeNodes(item.children, handleAddNewNode)}
      </TreeNode>
    );
  });
};

const GuideTree = () => {
  const [treeData, setTreeData] = useState<any[]>(treeDataSample);
  const [newIndex, setNewIndex] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([
    "0-1-0-0",
    "0-1-0-0",
    "0-0-0-0",
  ]);
  const handleAddNewNode = (parent: any) => {
    if (!parent.children) {
      parent.children = [];
    }
    setNewIndex(newIndex + 1);
    parent.push({
      key: `${parent.key}-new-${newIndex}`,
      title: "",
      children: [],
    });
    setTreeData([...treeData]);
  };
  const onExpand = (newExpandedKeys: any) => {
    console.log("onExpand", newExpandedKeys);
    //setExpandedKeys(expandedKeys);
  };
  return (
    <Tree
      onExpand={onExpand}
      switcherIcon={<div />}
      expandedKeys={expandedKeys}
    >
      {renderTreeNodes(treeData, handleAddNewNode, handleDeleteNode)}
    </Tree>
  );
};
export default GuideTree;
