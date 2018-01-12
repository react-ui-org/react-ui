import React from 'react';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';
import CheckboxField from '../components/CheckboxField';
import Radio from '../components/Radio';
import SelectField from '../components/SelectField';

const logger = event => console.log(event.target.value); // eslint-disable-line no-console

export default () => (
  <div>
    <TextField fieldId="textField" changeHandler={logger} />
    <TextArea
      fieldId="areaField"
      placeholder="Lorem Ipsum"
      changeHandler={logger}
    />
    <CheckboxField fieldId="checkboxField" changeHandler={logger} />
    <Radio
      changeHandler={logger}
      fieldId="Radio"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
      label="Choices"
    />
    <SelectField
      changeHandler={logger}
      fieldId="selectField"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
    />
  </div>
);
