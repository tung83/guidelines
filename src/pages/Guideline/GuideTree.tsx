import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tree } from "antd";
import "./Guideline.css";
import {
  guideNodePut,
  guideNodePost,
  guideNodeDelete,
  resetGuideNodesInserted,
} from "../../store/guideNode/action";
import { guideNodeContentFetchDetail } from "../../store/guideNodeContent/action";
import { findNode, flatten, removeNode } from "utils/useArray";
import GuideTreeNode from "./GuideTreeNode";
import { NodeData } from "model";
const { TreeNode } = Tree;
const renderTreeNodes = (
  data: any,
  handleAddNewNode: any,
  handleDeleteNode: any,
  handleItemNameChanged: any,
  handleItemCheckChanged: any
): any => {
  return data?.map((item: any) => {
    if (!item.children || item.children.length === 0) {
      return (
        <TreeNode
          key={item.key}
          title={
            <GuideTreeNode
              item={item}
              handleAddNewNode={handleAddNewNode}
              handleDeleteNode={handleDeleteNode}
              handleItemNameChanged={handleItemNameChanged}
              handleItemCheckChanged={handleItemCheckChanged}
            />
          }
        />
      );
    }
    return (
      <TreeNode
        key={item.key}
        title={
          <GuideTreeNode
            item={item}
            handleAddNewNode={handleAddNewNode}
            handleDeleteNode={handleDeleteNode}
            handleItemNameChanged={handleItemNameChanged}
            handleItemCheckChanged={handleItemCheckChanged}
          />
        }
      >
        {renderTreeNodes(
          item.children,
          handleAddNewNode,
          handleDeleteNode,
          handleItemNameChanged,
          (handleItemCheckChanged = { handleItemCheckChanged })
        )}
      </TreeNode>
    );
  });
};

const GuideTree = ({
  currentChildNodes,
  guideNodePut,
  guideNodePost,
  guideNodeDelete,
  guideNodesInserted,
  guideNodeContentFetchDetail,
}: any) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [newIndex, setNewIndex] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    setTreeData(currentChildNodes.map((x: NodeData) => ({ ...x, key: x.Id })));
    setExpandedKeys(flatten(currentChildNodes));
  }, [currentChildNodes]);
  // update childnode of newly inserted
  useEffect(() => {
    guideNodesInserted.forEach((x: NodeData) => {
      let foundNode = findNode(
        treeData,
        (y: NodeData) => y.SupId === x.SupId && y.Order === x.Order
      );
      foundNode.Id = x.Id;
    });
    setTreeData([...treeData]);
  }, [guideNodesInserted]);

  const handleAddNewNode = (parent: any) => {
    if (!parent.children) {
      parent.children = [];
    }
    setNewIndex(newIndex - 1);
    const newKey = `${newIndex - 1}`;
    const order =
      parent.children.length === 0
        ? 1
        : parent.children[parent.children.length - 1].Order;
    const newItem = {
      Id: 0,
      Name: "",
      Order: order + 1,
      SupId: parent.Id,
      children: [],
    };
    parent.children.push({
      key: newKey,
      ...newItem,
    });
    setTreeData([...treeData]);
    setExpandedKeys([...expandedKeys, newKey]);
    guideNodePost(newItem);
  };
  const handleDeleteNode = (node: any) => {
    guideNodeDelete(node.Id);
    removeNode(treeData, node);
    setTreeData([...treeData]);
  };
  const handleItemNameChanged = (node: any) => {
    guideNodePut(node.Id, node);
  };
  const handleItemCheckChanged = (node: any) => {
    guideNodeContentFetchDetail(node.Id);
  };

  const onExpand = (newExpandedKeys: any) => {
    console.log("onExpand", newExpandedKeys);
  };

  return (
    <Tree
      onExpand={onExpand}
      switcherIcon={<div />}
      expandedKeys={expandedKeys}
    >
      {renderTreeNodes(
        treeData,
        handleAddNewNode,
        handleDeleteNode,
        handleItemNameChanged,
        handleItemCheckChanged
      )}
    </Tree>
  );
};

export default connect(
  (state: any) => {
    return {
      currentChildNodes: state.guideline.currentChildNodes,
      guideNodesInserted: state.guideNode.guideNodesInserted,
    };
  },
  {
    guideNodePost,
    guideNodePut,
    guideNodeDelete,
    resetGuideNodesInserted,
    guideNodeContentFetchDetail,
  }
)(GuideTree);
