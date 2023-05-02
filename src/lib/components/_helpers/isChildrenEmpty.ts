export const isChildrenEmpty = (children) => children == null
  || children === false
  || (Array.isArray(children) && children.length === 0);
