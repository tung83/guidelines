export const flatten = (dataArray) => {
  let x = dataArray?.reduce(
    (accumulator, currentValue) => {
      runFlatten(currentValue, accumulator);
      return accumulator;
    },
    ["root"]
  );
  return x;
};
const runFlatten = (data, result) => {
  if (!data) return;
  result.push(`${data.key}-${data.Order}`);
  return data.children?.reduce((accumulator, currentValue) => {
    runFlatten(currentValue, accumulator);
    return accumulator;
  }, result);
};

export const findNode = (dataArray, predicator) => {
  const item = dataArray.find((x) => predicator(x));
  if (item) return item;
  for (let i = 0; i < dataArray.length; i++) {
    let itemFound = runFindNode(dataArray[i], predicator);
    if (itemFound) return itemFound;
  }
};

export const removeNode = (dataArray, node) => {
  // if in first array
  let level1Index = dataArray.findIndex((x) => x.Id === node.Id);
  if (level1Index !== -1) {
    dataArray.splice(level1Index, 1);
    return;
  }
  let supNode = findNode(dataArray, (x) => x.Id === node.SupId);
  if (!supNode || !supNode.children) return;
  let childIndex = supNode?.children.findIndex((x) => x.Id === node.Id);
  if (childIndex !== -1) {
    supNode.children.splice(childIndex, 1);
  }
};

const runFindNode = (data, predicator) => {
  if (!data || !data.children) return null;
  const item = data.children.find((x) => predicator(x));
  if (item) {
    return item;
  } else {
    for (let i = 0; i < data.children.length; i++) {
      let itemFound = runFindNode(data.children[i], predicator);
      if (itemFound) return itemFound;
    }
  }
};

export const moveNode = (dataArray, node, direction) => {
  if (direction === "up" || direction === "down") {
    let level1Index = dataArray.findIndex((x) => x.Id === node.Id);
    if (level1Index !== -1) {
      swapPostion(dataArray, level1Index, direction);
      return;
    }
    let supNode = findNode(dataArray, (x) => x.Id === node.SupId);
    if (!supNode || !supNode.children) return;
    let childIndex = supNode?.children.findIndex((x) => x.Id === node.Id);
    if (childIndex !== -1) {
      swapPostion(supNode.children, childIndex, direction);
    }
  } else if (direction === "out") {
    let supNode = findNode(dataArray, (x) => x.Id === node.SupId);
    if (!supNode) return;
    let childIndex = supNode.children.findIndex((x) => x.Id === node.Id);
    supNode.children.splice(childIndex, 1);
    let grandParentNode = findNode(dataArray, (x) => x.Id === supNode.SupId);
    if (!grandParentNode) {
      const lastNode = dataArray[dataArray.length - 1];
      node.Order = lastNode.Order + 1;
      node.SupId = lastNode.SupId;
      dataArray.push(node);
    } else {
      node.Order =
        grandParentNode.children[grandParentNode.children.length - 1].Order + 1;
      node.SupId = grandParentNode.Id;
      grandParentNode.children.push(node);
    }
  } else if (direction === "in") {
    debugger;
    let supNode = findNode(dataArray, (x) => x.Id === node.SupId);
    if (!supNode) return;
    let childIndex = supNode.children.findIndex((x) => x.Id === node.Id);
    if (childIndex > 0) {
      supNode.children.splice(childIndex, 1);
      const previousNode = supNode.children[childIndex - 1];
      if (!previousNode.children) previousNode.children = [];

      node.Order =
        previousNode.children.length === 0
          ? 1
          : previousNode.children[previousNode.children.length - 1].Order + 1;
      node.SupId = previousNode.Id;
      previousNode.children.push(node);
    }
  }
};
const swapPostion = (array, index, direction) => {
  if (direction === "up") {
    if (index > 0) {
      array[index - 1].Order++;
      array[index].Order--;
    }
  }
  if (direction === "down") {
    if (index < array.length - 1) {
      array[index + 1].Order--;
      array[index].Order++;
    }
  }
};
export const orderNode = (dataArray) => {
  const result = dataArray.sort((a, b) => {
    if (a.Order < b.Order) return -1;
    if (a.Order > b.Order) return 1;
    return 0;
  });
  for (let i = 0; i < result.length; i++) {
    if (result[i].children) result[i].children = orderNode(result[i].children);
  }
  return result;
};
