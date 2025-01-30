export const classNames = (...classes) => {
  const filteredClassNames = classes.filter(
    (className) => typeof className === 'string'
    && className.trim().length > 0,
  );

  return filteredClassNames.length > 0 ? filteredClassNames.join(' ') : undefined;
};
