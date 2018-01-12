import React from 'react';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';

export default () => (
  <div>
    <TextField required fieldId="textField" />
    <TextArea disabled fieldId="areaField" placeholder="Hello World"/>
  </div>
);
