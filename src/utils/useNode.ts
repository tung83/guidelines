import { NodeData } from "../model";
export const flatten = (treeNodes: NodeData[]): string[] => {
  let x = treeNodes?.reduce(
    (accumulator, currentValue) => {
      runFlatten(currentValue, accumulator);
      return accumulator;
    },
    ["root"]
  );
  return x;
};
const runFlatten = (data: NodeData, result: string[]) => {
  if (!data) return;
  result.push(data.key);
  return data.subNodes?.reduce((accumulator, currentValue) => {
    runFlatten(currentValue, accumulator);
    return accumulator;
  }, result);
};

export const findNode = (
  treeNodes: NodeData[],
  predicator: any
): NodeData | undefined => {
  const item = treeNodes.find((x) => predicator(x));
  if (item) return item;
  for (let i = 0; i < treeNodes.length; i++) {
    let itemFound = runFindNode(treeNodes[i], predicator);
    if (itemFound) return itemFound;
  }
};

export const removeNode = (treeNodes: NodeData[], node: NodeData) => {
  // if in first array
  let level1Index = treeNodes.findIndex((x) => x._id === node._id);
  if (level1Index !== -1) {
    treeNodes.splice(level1Index, 1);
    return;
  }
  let supNode = findNode(treeNodes, (x: NodeData) => x._id === node.supId);
  if (!supNode || !supNode.subNodes) return;
  let childIndex = supNode?.subNodes.findIndex((x) => x._id === node._id);
  if (childIndex !== -1) {
    supNode.subNodes.splice(childIndex, 1);
  }
};

const runFindNode = (data: NodeData, predicator: any): NodeData | undefined => {
  if (!data || !data.subNodes) return undefined;
  const item = data.subNodes.find((x) => predicator(x));
  if (item) {
    return item;
  } else {
    for (let i = 0; i < data.subNodes.length; i++) {
      let itemFound = runFindNode(data.subNodes[i], predicator);
      if (itemFound) return itemFound;
    }
  }
};

export const moveNode = (
  treeNodes: NodeData[],
  node: NodeData,
  direction: string
): NodeData[] | undefined => {
  if (direction === "up" || direction === "down") {
    let level1Index = treeNodes.findIndex((x) => x._id === node._id);
    if (level1Index !== -1) {
      return swapPostion(treeNodes, level1Index, direction);
    }
    let supNode = findNode(treeNodes, (x: NodeData) => x._id === node.supId);
    if (!supNode || !supNode.subNodes) return;
    let childIndex = supNode?.subNodes.findIndex((x) => x._id === node._id);
    if (childIndex !== -1) {
      return swapPostion(supNode.subNodes, childIndex, direction);
    }
  } else if (direction === "out") {
    let supNode = findNode(treeNodes, (x: NodeData) => x._id === node.supId);
    if (!supNode) return;
    let childIndex = supNode.subNodes.findIndex((x) => x._id === node._id);
    supNode.subNodes.splice(childIndex, 1);
    if (supNode != null) {
      let grandParentNode = findNode(
        treeNodes,
        (x: NodeData) => x._id === supNode?.supId
      );
      if (!grandParentNode) {
        const lastNode = treeNodes[treeNodes.length - 1];
        node.order = lastNode.order + 1;
        node.supId = lastNode.supId;
        treeNodes.push(node);
      } else {
        node.order =
          grandParentNode.subNodes[grandParentNode.subNodes.length - 1].order +
          1;
        node.supId = grandParentNode._id;
        grandParentNode.subNodes.push(node);
      }
      return [node];
    }
  } else if (direction === "in") {
    let supNode = findNode(treeNodes, (x: NodeData) => x._id === node.supId);
    let subNodes = treeNodes;
    if (supNode) subNodes = supNode.subNodes;
    let childIndex = subNodes.findIndex((x) => x._id === node._id);
    if (childIndex > 0) {
      subNodes.splice(childIndex, 1);
      const previousNode = subNodes[childIndex - 1];
      if (!previousNode.subNodes) previousNode.subNodes = [];

      node.order =
        previousNode.subNodes.length === 0
          ? 1
          : previousNode.subNodes[previousNode.subNodes.length - 1].order + 1;
      node.supId = previousNode._id;
      previousNode.subNodes.push(node);
      return [node];
    }
  }
};
const swapPostion = (
  treeNodes: NodeData[],
  index: number,
  direction: string
): NodeData[] | undefined => {
  if (direction === "up") {
    if (index > 0) {
      treeNodes[index - 1].order++;
      treeNodes[index].order--;
      return [treeNodes[index - 1], treeNodes[index]];
    }
  }
  if (direction === "down") {
    if (index < treeNodes.length - 1) {
      treeNodes[index + 1].order--;
      treeNodes[index].order++;
      return [treeNodes[index], treeNodes[index + 1]];
    }
  }
};
export const orderNode = (treeNodes: NodeData[]): NodeData[] => {
  const result = treeNodes.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });
  for (let i = 0; i < result.length; i++) {
    if (result[i].subNodes) result[i].subNodes = orderNode(result[i].subNodes);
  }
  return result;
};
export const updateNodeKey = (treeNodes: NodeData[]): NodeData[] => {
  let result = treeNodes.map((x: NodeData) => ({
    ...x,
    key: x._id,
  }));
  for (let i = 0; i < result.length; i++) {
    if (result[i].subNodes)
      result[i].subNodes = updateNodeKey(result[i].subNodes);
  }
  return result;
};
