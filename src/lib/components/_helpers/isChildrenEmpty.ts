export const isChildrenEmpty = (children: React.ReactNode) => !children
    || (Array.isArray(children) && children.length === 0);
