import React from 'react';
import RUIContext from './RUIContext';

export default (Component, componentName) => {
  const WithGlobalPropsComponent = (props) => (
    <RUIContext.Consumer>
      {({ globalProps }) => {
        const contextGlobalProps = globalProps ? globalProps[componentName] : null;

        return (
          <Component
            {...contextGlobalProps}
            {...props}
          />
        );
      }}
    </RUIContext.Consumer>
  );

  return WithGlobalPropsComponent;
};
