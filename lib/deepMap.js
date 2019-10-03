const deepMap = (obj, fn, baseDimens) => {
  const deepMapper = val =>
    isObject(val) ? deepMap(val, fn, baseDimens) : fn(val, baseDimens);
  if (Array.isArray(obj)) {
    return obj.map(deepMapper);
  }
  if (isObject(obj)) {
    return mapObject(obj, deepMapper, baseDimens);
  }
  return obj;
};

const mapObject = (obj, fn, baseDimens) =>
  Object.keys(obj).reduce((res, key) => {
    res[key] = fn(obj[key]);
    return res;
  }, {});

const isObject = myVar => myVar && typeof myVar === "object";

module.exports = deepMap;
