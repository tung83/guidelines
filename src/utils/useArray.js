export const flatten = (dataArray) => {
  let x = dataArray?.reduce((accumulator, currentValue) => {
    runFlatten(currentValue, accumulator);
    return accumulator;
  }, []);
  return x;
};
const runFlatten = (data, result) => {
  if (!data) return;
  if (data.children == null || data.children?.length === 0) {
    result.push(data.Id.toString());
  }
  runFlatten(data.children, result);
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
  if (level1Index) {
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
