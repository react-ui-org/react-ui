import React from 'react';
import Documentation from '../components/Documentation';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';
import CheckboxField from '../components/CheckboxField';
import Radio from '../components/Radio';
import SelectField from '../components/SelectField';
import Icon from '../components/Icon';
import Button from '../components/Button';

const logger = event => console.log(event.target.value); // eslint-disable-line no-console
const loggerClick = () => console.log('click'); // eslint-disable-line no-console

export default () => (
  <div>
    <Documentation
      name="Text field"
      component={(
        <TextField
          fieldId="textField"
          changeHandler={logger}
          label="TextField"
        />
      )}
    />
    <Documentation
      name="TextField with hidden label"
      component={(
        <TextField
          fieldId="textFieldDisabled"
          changeHandler={logger}
          label="TextField with hidden label"
          isLabelVisible={false}
          placeholder="This field is disabled"
          disabled
        />
      )}
    />
    <Documentation
      name="TextField with description text"
      component={(
        <TextField
          fieldId="textFieldDescription"
          changeHandler={logger}
          label="TextField with description text"
          description="Fill in your real name"
          placeholder="This field is required"
          required
        />
      )}
    />
    <Documentation
      name="TextField with error"
      component={(
        <TextField
          fieldId="textFieldError"
          changeHandler={logger}
          label="TextField with error"
          description="Fill in your real name"
          error="This is not your real name"
          value="I. C. Wiener"
        />
      )}
    />
    <Documentation
      name="TextArea"
      component={(
        <TextArea
          fieldId="areaField"
          label="TextArea"
          placeholder="Lorem Ipsum"
          changeHandler={logger}
        />
      )}
    />
    <Documentation
      name="TextArea with description and 5 rows"
      component={(
        <TextArea
          fieldId="areaFieldDescriptionRows"
          label="TextArea with description and 5 rows"
          placeholder="Lorem Ipsum"
          changeHandler={logger}
          description="Describe yourself"
          rows={5}
        />
      )}
    />
    <Documentation
      name="TextArea with description and error"
      component={(
        <TextArea
          fieldId="areaFieldDescriptionError"
          label="TextArea with description and error"
          placeholder="Lorem Ipsum"
          changeHandler={logger}
          description="Describe yourself"
          error="Use more then five words"
          value="I am who I am."
        />
      )}
    />
    <Documentation
      name="Checkbox"
      component={(
        <CheckboxField fieldId="checkboxField" changeHandler={logger} />
      )}
    />
    <Documentation
      name="Radio"
      component={(
        <Radio
          changeHandler={logger}
          fieldId="Radio"
          label="Choices"
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
      )}
    />
    <Documentation
      name="Radio with description, required and disabled item"
      component={(
        <Radio
          changeHandler={logger}
          fieldId="RadioDescriptionRequiredDisabledItem"
          label="Choices with description, required and disabled item"
          description="Choose one"
          required
          options={[
            {
              label: 'choice 1',
              value: 'ch1',
            },
            {
              disabled: true,
              label: 'choice 2',
              value: 'ch2',
            },
          ]}
        />
      )}
    />
    <Documentation
      name="Radio disabled with hidden label and error and chosen"
      component={(
        <Radio
          changeHandler={logger}
          fieldId="RadioDisabled"
          label="Choices disabled with hidden label and error and chosen"
          isLabelVisible={false}
          value="ch1"
          description="Choose one"
          error="This is disabled"
          required
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
      )}
    />
    <Documentation
      name="SelectField"
      component={(
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
      )}
    />
    <Documentation
      name="SelectField with description and required"
      component={(
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
      )}
    />
    <Documentation
      name="SelectField with error"
      component={(
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
      )}
    />
    <Documentation
      name="SelectField with error and hidden label"
      component={(
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
      )}
    />
    <Documentation
      name="Heading 1"
      component={<h1>h1</h1>}
    />
    <Documentation
      name="Heading 2"
      component={<h2>h2</h2>}
    />
    <Documentation
      name="Heading 3"
      component={<h3>h3</h3>}
    />
    <Documentation
      name="Heading 4"
      component={<h4>h4</h4>}
    />
    <Documentation
      name="Heading 5"
      component={<h5>h5</h5>}
    />
    <Documentation
      name="Paragraph"
      component={(
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      )}
    />
    <Documentation
      name="Link"
      component={(
        <a href="http://example.com">link</a>
      )}
    />
    <Documentation
      name="Small"
      component={(
        <small>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </small>
      )}
    />
    <Documentation
      name="List"
      component={(
        <ul>
          <li>Lorem</li>
          <li>ipsum</li>
          <li>dolor</li>
          <li>sit</li>
          <li>amet</li>
        </ul>
      )}
    />
    <Documentation
      name="Smal icon"
      component={<Icon icon="book" size="small" />}
    />
    <Documentation
      name="Normal icon"
      component={<Icon icon="book" />}
    />
    <Documentation
      name="Larger colored icon"
      component={(
        <span style={{ color: '#bada55' }}>
          <Icon icon="book" size="larger" />
        </span>
      )}
    />
    <Documentation
      name="Large icon"
      component={<Icon icon="album" size="large" />}
    />
    <Documentation
      name="Buttons"
      component={(
        <div>
          <Button clickHandler={loggerClick} label="default" />
          <Button clickHandler={loggerClick} label="default" variant="success" />
          <Button clickHandler={loggerClick} label="default" variant="warning" />
          <Button clickHandler={loggerClick} label="default" variant="danger" />
        </div>
      )}
    />
    <Documentation
      name="Primary buttons"
      component={(
        <div>
          <Button clickHandler={loggerClick} label="primary" priority="primary" />
          <Button clickHandler={loggerClick} label="primary" priority="primary" variant="success" />
          <Button clickHandler={loggerClick} label="primary" priority="primary" variant="warning" />
          <Button clickHandler={loggerClick} label="primary" priority="primary" variant="danger" />
        </div>
      )}
    />
    <Documentation
      name="Flat buttons"
      component={(
        <div>
          <Button clickHandler={loggerClick} label="flat" priority="flat" />
          <Button clickHandler={loggerClick} label="flat" priority="flat" variant="success" />
          <Button clickHandler={loggerClick} label="flat" priority="flat" variant="warning" />
          <Button clickHandler={loggerClick} label="flat" priority="flat" variant="danger" />
        </div>
      )}
    />
    <Documentation
      name="Buttons with different sizes"
      component={(
        <div>
          <Button clickHandler={loggerClick} label="small" size="small" />
          <Button clickHandler={loggerClick} label="medium" />
          <Button clickHandler={loggerClick} label="large" size="large" />
        </div>
      )}
    />
    <Documentation
      name="Disabled buttons"
      component={(
        <div>
          <Button clickHandler={loggerClick} label="disabled default" disabled />
          <Button clickHandler={loggerClick} label="disabled primary" priority="primary" disabled />
          <Button clickHandler={loggerClick} label="disabled flat" priority="flat" disabled />
        </div>
      )}
    />
    <Documentation
      name="Buttons with icons"
      component={(
        <div>
          <Button clickHandler={loggerClick} label="icon" icon="album" />
          <Button clickHandler={loggerClick} label="icon after" icon="book" iconPosition="after" />
          <Button
            clickHandler={loggerClick}
            label="icon alone"
            icon="radio"
            isLabelVisible={false}
          />
          <Button clickHandler={loggerClick} label="small icon" icon="radio" size="small" />
          <Button clickHandler={loggerClick} label="large icon" icon="album" size="large" />
        </div>
      )}
    />
    <Documentation
      name="Block buttons"
      component={(
        <div>
          <Button clickHandler={loggerClick} label="block" block />
          <Button clickHandler={loggerClick} label="block with icon" block icon="check" />
        </div>
      )}
    />
    <Documentation
      name="Loading button"
      component={(
        <div>
          <Button clickHandler={loggerClick} label="load btn" loading />
        </div>
      )}
    />
  </div>
);
