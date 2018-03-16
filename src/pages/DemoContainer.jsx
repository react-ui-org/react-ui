import React from 'react';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';
import CheckboxField from '../components/CheckboxField';
import Radio from '../components/Radio';
import SelectField from '../components/SelectField';

const logger = event => console.log(event.target.value); // eslint-disable-line no-console

export default () => (
  <div>
    <TextField
      fieldId="textField"
      changeHandler={logger}
      label="TextField"
    />
    <TextField
      fieldId="textFieldDisabled"
      changeHandler={logger}
      label="TextField with hidden label"
      isLabelVisible={false}
      placeholder="This field is disabled"
      disabled
    />
    <TextField
      fieldId="textFieldDescription"
      changeHandler={logger}
      label="TextField with description text"
      description="Fill in your real name"
      placeholder="This field is required"
      required
    />
    <TextField
      fieldId="textFieldError"
      changeHandler={logger}
      label="TextField with error"
      description="Fill in your real name"
      error="This is not your real name"
      value="I. C. Wiener"
    />
    <TextArea
      fieldId="areaField"
      label="TextArea"
      placeholder="Lorem Ipsum"
      changeHandler={logger}
    />
    <TextArea
      fieldId="areaFieldDescriptionRows"
      label="TextArea with description and 5 rows"
      placeholder="Lorem Ipsum"
      changeHandler={logger}
      description="Describe yourself"
      rows={5}
    />
    <TextArea
      fieldId="areaFieldDescriptionError"
      label="TextArea with description and error"
      placeholder="Lorem Ipsum"
      changeHandler={logger}
      description="Describe yourself"
      error="Use more then five words"
      value="I am who I am."
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
      label="SelectField"
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
    <SelectField
      changeHandler={logger}
      fieldId="selectFieldDescriptionRequired"
      label="SelectField with description and required"
      description="Choose which choice you prefer"
      required
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
    <SelectField
      changeHandler={logger}
      fieldId="selectFieldError"
      label="SelectField with error"
      description="Choose which choice you prefer"
      error="You have to choose"
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
    <SelectField
      changeHandler={logger}
      fieldId="selectFieldErrorHiddenLabel"
      label="SelectField with error and hidden label"
      isLabelVisible={false}
      disabled
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
    <h1>h1</h1>
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </p>
    <p>
      <a href="http://example.com">link</a>
    </p>
    <small>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </small>
    <ul>
      <li>Lorem</li>
      <li>ipsum</li>
      <li>dolor</li>
      <li>sit</li>
      <li>amet</li>
    </ul>
  </div>
);
