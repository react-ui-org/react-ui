export const classNames = (...classes: (string | null | boolean | undefined | 0 | 0n)[]) => {
  const filteredClassNames = classes.filter(
    (className) => typeof className === 'string'
    && className.trim().length > 0,
  );

  return filteredClassNames.length > 0
    ? filteredClassNames.join(' ')
    // React does not render attributes whose value is `undefined` and we do not want an empty `class` attribute in HTML
    : undefined;
};
