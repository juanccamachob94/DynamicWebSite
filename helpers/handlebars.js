module.exports = {
  and: (condition1, condition2) => {
    return condition1 && condition2;
  },
  different: (leftValue, rightValue) => {
    return leftValue != rightValue;
  },
  equals: (leftValue, rightValue) => {
    return leftValue == rightValue;
  },
  firstTransmisionMediastreamId: (transmissions) => {
    if (transmissions.length == 0)
      return undefined;
    return transmissions[0].videos.id;
  },
  hasDirectaTransmission: (transmissions) => {
    for (let transmission of transmissions)
      if (transmission.directa)
        return true;
    return false;
  },
  includes: (str, subStr) => {
    return str.toLowerCase().includes(subStr.toLowerCase());
  },
  increment: (val) => {
    return parseInt(val) + 1;
  },
  limit: (array, limit) => {
    if (!Array.isArray(array))
      return [];
    return array.slice(0, limit);
  },
  moduleSlug: (v) => require('slug')(v.replace(/\//g, '-')),
  not: (v) => {
    return !v;
  },
  setVar: (varName, varValue, options) => {
    options.data.root[varName] = varValue;
  },
  incompleteString: (str, limit) => {
    if(str.length <= limit)
      return str;
    return str.substring(0, limit) + "...";
  }
}
