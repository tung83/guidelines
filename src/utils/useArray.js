export const flatten = (data) => {
  let result = [];
  while (data) {
    result.push({ name: data.name, config: data.config });
    data = data.prev;
  }
  return result;
};
