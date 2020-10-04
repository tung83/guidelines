import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Tree } from "antd";
import { nodeNavTurn } from "../../store/nodeNav/action";
import "./Guideline.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  guideNodePut,
  guideNodePost,
  guideNodeDelete,
  resetGuideNodesInserted,
  guideNodeSetCurrent,
} from "../../store/guideNode/action";
import { guideNodeContentFetchDetail } from "../../store/guideNodeContent/action";
import {
  findNode,
  flatten,
  removeNode,
  moveNode,
  orderNode,
} from "../../utils/useNode";
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
  const orderedData = orderNode(data);
  return orderedData.map((item: any) => {
    if (!item.children || item.children.length === 0) {
      return (
        <TreeNode
          key={`${item.key}-${item.Order}`}
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
        key={`${item.key}-${item.Order}`}
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
          handleItemCheckChanged
        )}
      </TreeNode>
    );
  });
};

const GuideTree = ({
  guidelineSelected,
  currentChildNodes,
  guideNodePut,
  guideNodePost,
  guideNodeDelete,
  guideNodesInserted,
  guideNodeContentFetchDetail,
  guideNodeSetCurrent,
  nodeNavDirection,
  currentGuideNode,
  nodeNavTurn,
}: any) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [newIndex, setNewIndex] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    const dataList = currentChildNodes.map((x: NodeData) => ({
      ...x,
      key: x.Id.toString(),
    }));
    setTreeData(dataList);
    setExpandedKeys(flatten(dataList));
  }, [currentChildNodes]);
  // update childnode of newly inserted
  useEffect(() => {
    guideNodesInserted.forEach((x: NodeData) => {
      let foundNode = findNode(treeData, (y: NodeData) => y.key === x.key);
      foundNode.Id = x.Id;
    });
    setTreeData([...treeData]);
  }, [guideNodesInserted]);
  //move node
  useEffect(() => {
    if (nodeNavDirection) {
      nodeNavTurn(null);
      moveNode(treeData, currentGuideNode, nodeNavDirection);
      setTreeData([...treeData]);
      setExpandedKeys(flatten(treeData));
      guideNodePut(currentGuideNode.Id, currentGuideNode);
    }
  }, [nodeNavDirection]);

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
    const newItem: NodeData = {
      key: newKey,
      Id: 0,
      Name: "",
      Order: order + 1,
      SupId: parent.Id,
      children: [],
    };
    parent.children.push(newItem);
    processAddNewNode(treeData, newItem);
  };

  const handleAddNewNodeInRoot = () => {
    setNewIndex(newIndex - 1);
    const newKey = `${newIndex - 1}`;
    const order =
      treeData.length === 0 ? 1 : treeData[treeData.length - 1].Order + 1;
    const newItem: NodeData = {
      key: newKey,
      Id: 0,
      Name: "",
      Order: order,
      SupId: guidelineSelected.Id,
      children: [],
    };
    treeData.push(newItem);
    processAddNewNode(treeData, newItem);
  };
  const processAddNewNode = (newTreeData: any, newItem: NodeData) => {
    setTreeData([...newTreeData]);
    setExpandedKeys([...expandedKeys, `${newItem.key}-${newItem.Order}`]);
    guideNodePost(newItem);
  };
  const handleDeleteNode = (node: any) => {
    guideNodeDelete(node.Id);
    removeNode(treeData, node);
    setTreeData([...treeData]);
  };
  const handleItemNameChanged = (node: any) => {
    let foundNode = findNode(treeData, (y: NodeData) => y.key === node.key);
    foundNode.Name = node.Name;
    setTreeData([...treeData]);
    guideNodePut(node.Id, node);
  };
  const handleItemCheckChanged = (node: any) => {
    guideNodeContentFetchDetail(node.Id);
    guideNodeSetCurrent(node);
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
      <TreeNode
        key={"root"}
        title={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"small"}
            onClick={(e: any) => handleAddNewNodeInRoot()}
          />
        }
      >
        {renderTreeNodes(
          treeData,
          handleAddNewNode,
          handleDeleteNode,
          handleItemNameChanged,
          handleItemCheckChanged
        )}
      </TreeNode>
    </Tree>
  );
};

export default connect(
  (state: any) => {
    return {
      guidelineSelected: state.guideline.guidelineSelected,
      currentChildNodes: state.guideline.currentChildNodes,
      guideNodesInserted: state.guideNode.guideNodesInserted,
      currentGuideNode: state.guideNode.currentGuideNode,
      nodeNavDirection: state.nodeNav.direction,
    };
  },
  {
    guideNodePost,
    guideNodePut,
    guideNodeDelete,
    resetGuideNodesInserted,
    guideNodeContentFetchDetail,
    guideNodeSetCurrent,
    nodeNavTurn,
  }
)(GuideTree);
