import React from 'react';

const RUIContext = React.createContext({
  translations: {
    Alert: {
      close: 'Close',
    },
    Modal: {
      close: 'Close',
    },
    ScrollView: {
      next: 'Next',
      previous: 'Previous',
    },
  },
});

export default RUIContext;
