import React from 'react';

// React UI core CSS
import '../../lib/core/core.scss';

// React UI components
import {
  Button,
  CheckboxField,
  Documentation,
  DocumentationLayout,
  DocumentationLayoutContent,
  DocumentationLayoutSidebar,
  DocumentationNavigation,
  ForgotPassword,
  Icon,
  LayoutCenter,
  Login,
  Modal,
  MultipleSelectField,
  NewPassword,
  Radio,
  SelectField,
  Table,
  TranslationProvider,
  TextField,
  TextArea,
  Toggle,
} from '../../lib';

// React UI CSS utility classes
import '../../lib/utilities/utilities.scss';

import navigationTree from './navigation';

const logger = event => console.log(event.target.value); // eslint-disable-line no-console
const loggerClick = () => console.log('click'); // eslint-disable-line no-console
const submitter = () => console.log('submitted'); // eslint-disable-line no-console

class DemoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tableSortColumn: 'id',
      tableSortDirection: 'asc',
    };

    this.exampleOptions = [
      {
        label: 'Apples',
        value: 'apples',
      },
      {
        label: 'Bananas',
        value: 'bananas',
      },
      {
        label: 'Grapefruits',
        value: 'grapefruits',
      },
    ];
  }

  render() {
    return (
      <DocumentationLayout>
        <DocumentationLayoutSidebar>
          <DocumentationNavigation items={navigationTree} />
        </DocumentationLayoutSidebar>
        <DocumentationLayoutContent>
          <section id="typography" className="offset-7">
            <h2 className="typography-size-5 offset-6">Typography</h2>
            <p>
              Curabitur sagittis hendrerit ante. Integer pellentesque quam vel velit. Sed vel
              lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Pellentesque
              sapien. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Maecenas sollicitudin.
              Phasellus faucibus molestie nisl. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum. Phasellus et lorem id felis
              nonummy placerat.
            </p>
            <p>
              <strong>Bold text</strong>
            </p>
            <p>
              <em>Emphasized text</em>
            </p>
            <p>
              <small>Small text</small>
            </p>
            <p>
              <a href="#top">Generic link</a>
            </p>
            <ul>
              <li>Unordered list item 1</li>
              <li>Unordered list item 2</li>
              <li>Unordered list item 3</li>
            </ul>
            <ol>
              <li>Ordered list item 1</li>
              <li>Ordered list item 2</li>
              <li>Ordered list item 3</li>
            </ol>
            <p>
              Horizontal ruler:
            </p>
            <hr />
            <h4 className="typography-size-0">.typography-size-0</h4>
            <h4 className="typography-size-1">.typography-size-1</h4>
            <h4 className="typography-size-2">.typography-size-2</h4>
            <h4 className="typography-size-3">.typography-size-3</h4>
            <h4 className="typography-size-4">.typography-size-4</h4>
            <h4 className="typography-size-5">.typography-size-5</h4>
          </section>
          <section id="components" className="offset-7">
            <h2 className="typography-size-5 offset-6">Components</h2>
            <h3 id="components-button" className="typography-size-4 offset-6">Button</h3>
            <Documentation
              name="Default buttons"
              component={(
                <div>
                  <Button clickHandler={loggerClick} label="Primary" />
                  <Button clickHandler={loggerClick} label="Secondary" variant="secondary" />
                  <Button clickHandler={loggerClick} label="Success" variant="success" />
                  <Button clickHandler={loggerClick} label="Warning" variant="warning" />
                  <Button clickHandler={loggerClick} label="Danger" variant="danger" />
                </div>
              )}
            />
            <Documentation
              name="Outline buttons"
              component={(
                <div>
                  <Button clickHandler={loggerClick} label="Primary " priority="outline" />
                  <Button clickHandler={loggerClick} label="Secondary" priority="outline" variant="secondary" />
                  <Button clickHandler={loggerClick} label="Success" priority="outline" variant="success" />
                  <Button clickHandler={loggerClick} label="Warning" priority="outline" variant="warning" />
                  <Button clickHandler={loggerClick} label="Danger" priority="outline" variant="danger" />
                </div>
              )}
            />
            <Documentation
              name="Flat buttons"
              component={(
                <div>
                  <Button clickHandler={loggerClick} label="Primary" priority="flat" />
                  <Button clickHandler={loggerClick} label="Secondary" priority="flat" variant="secondary" />
                  <Button clickHandler={loggerClick} label="Success" priority="flat" variant="success" />
                  <Button clickHandler={loggerClick} label="Warning" priority="flat" variant="warning" />
                  <Button clickHandler={loggerClick} label="Danger" priority="flat" variant="danger" />
                </div>
              )}
            />
            <Documentation
              name="Buttons sizes"
              component={(
                <div>
                  <Button clickHandler={loggerClick} label="Small" size="small" />
                  <Button clickHandler={loggerClick} label="Medium" />
                  <Button clickHandler={loggerClick} label="Large" size="large" />
                </div>
              )}
            />
            <Documentation
              name="Disabled buttons"
              component={(
                <div>
                  <Button clickHandler={loggerClick} label="Disabled default" disabled />
                  <Button clickHandler={loggerClick} label="Disabled outline" priority="outline" disabled />
                  <Button clickHandler={loggerClick} label="Disabled flat" priority="flat" disabled />
                </div>
              )}
            />
            <Documentation
              name="Buttons with icons"
              component={(
                <div>
                  <div className="offset-3">
                    <Button clickHandler={loggerClick} label="Icon before label, small" icon="album" size="small" />
                    <Button clickHandler={loggerClick} label="Icon before label" icon="radio" />
                    <Button clickHandler={loggerClick} label="Icon after label" icon="book" iconPosition="after" />
                  </div>
                  <div>
                    <Button
                      clickHandler={loggerClick}
                      label="Icon only"
                      labelVisibility="none"
                      icon="radio"
                    />
                    <Button
                      clickHandler={loggerClick}
                      label="Icon and label on desktop"
                      labelVisibility="desktop"
                      icon="radio"
                    />
                    <Button clickHandler={loggerClick} label="Icon and label, large" icon="album" size="large" />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Block buttons"
              component={(
                <div>
                  <Button clickHandler={loggerClick} label="Block" block />
                  <Button clickHandler={loggerClick} label="Block with icon" block icon="check" />
                </div>
              )}
            />
            <Documentation
              name="Loading button"
              component={(
                <div>
                  <Button clickHandler={loggerClick} label="Loading button" loading />
                </div>
              )}
            />
            <h3 id="components-checkbox" className="typography-size-4 offset-6">Checkbox</h3>
            <Documentation
              name="Checkbox"
              component={(
                <CheckboxField
                  fieldId="checkboxField"
                  label="checkbox"
                  changeHandler={logger}
                  required
                  description="Help text"
                />
              )}
            />
            <Documentation
              name="Checkbox checked"
              component={(
                <CheckboxField
                  fieldId="checkboxFieldChecked"
                  label="checkbox checked"
                  checked
                  value="1"
                  changeHandler={logger}
                  error="This should not be checked"
                />
              )}
            />
            <Documentation
              name="Checkbox disabled"
              component={(
                <CheckboxField
                  fieldId="checkboxFieldDisabled"
                  label="checkbox checked and disabled"
                  checked
                  disabled
                  changeHandler={logger}
                />
              )}
            />
            <h3 id="components-icon" className="typography-size-4 offset-6">Icon</h3>
            <Documentation
              name="Icon – default"
              component={<Icon icon="book" />}
            />
            <Documentation
              name="Icon — small"
              component={<Icon icon="book" size="small" />}
            />
            <Documentation
              name="Icon – large"
              component={<Icon icon="album" size="large" />}
            />
            <Documentation
              name="Icon – larger, colored"
              component={(
                <span style={{ color: '#bada55' }}>
                  <Icon icon="book" size="larger" />
                </span>
              )}
            />
            <h3 id="components-modal" className="typography-size-4 offset-6">Modal</h3>
            <Documentation
              name="Modal label"
              component={(
                <React.Fragment>
                  {!this.state.showModal && (
                    <Button
                      label="Open modal"
                      clickHandler={() => this.setState({ showModal: true })}
                    />
                  )}
                  {this.state.showModal && (
                    <Modal
                      actions={[
                        {
                          clickHandler: () => {
                            loggerClick();
                            this.setState({ showModal: false });
                          },
                          label: 'Agree',
                        },
                      ]}
                      closeHandler={() => this.setState({ showModal: false })}
                      title="Modal"
                    >
                      <p>Dialog content</p>
                    </Modal>
                  )}
                </React.Fragment>
              )}
            />
            <h3 id="components-multiple-selectfield" className="typography-size-4 offset-6">Multiple Select Field</h3>
            <Documentation
              name="Multiple select field variants"
              component={(
                <div>
                  <MultipleSelectField
                    changeHandler={logger}
                    fieldId="multipleSelectFieldVariantOutline"
                    label="Outline"
                    options={this.exampleOptions}
                  />
                  <MultipleSelectField
                    changeHandler={logger}
                    fieldId="multipleSelectFieldVariantFilled"
                    label="Filled"
                    options={this.exampleOptions}
                    variant="filled"
                  />
                </div>
              )}
            />
            <Documentation
              name="Required with helper text"
              component={(
                <div>
                  <MultipleSelectField
                    fieldId="multipleSelectFieldWithDescriptionOutline"
                    changeHandler={logger}
                    label="Favorite fruit"
                    helperText="What is your favorite fruit?"
                    options={this.exampleOptions}
                    required
                  />
                  <MultipleSelectField
                    fieldId="multipleSelectFieldWithDescriptionFilled"
                    changeHandler={logger}
                    label="Favorite fruit"
                    helperText="What is your favorite fruit?"
                    variant="filled"
                    options={this.exampleOptions}
                    required
                  />
                </div>
              )}
            />
            <Documentation
              name="Disabled multiple select field"
              component={(
                <div>
                  <MultipleSelectField
                    fieldId="multipleSelectFieldDisabledOutline"
                    changeHandler={logger}
                    label="Disabled multiple select field"
                    options={this.exampleOptions}
                    disabled
                  />
                  <MultipleSelectField
                    fieldId="multipleSelectFieldDisabledFilled"
                    changeHandler={logger}
                    label="Disabled multiple select field"
                    variant="filled"
                    options={this.exampleOptions}
                    disabled
                  />
                </div>
              )}
            />
            <Documentation
              name="Validation states"
              component={(
                <div>
                  <div>
                    <MultipleSelectField
                      fieldId="multipleSelectFieldValidationValidOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Looks good!"
                      validationState="valid"
                      options={this.exampleOptions}
                      value={['apples']}
                    />
                    <MultipleSelectField
                      fieldId="multipleSelectFieldValidationWarningOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Really…?"
                      validationState="warning"
                      options={this.exampleOptions}
                      value={['bananas']}
                    />
                    <MultipleSelectField
                      fieldId="multipleSelectFieldValidationInvalidOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Uh…"
                      validationState="invalid"
                      options={this.exampleOptions}
                      value={['grapefruits']}
                    />
                  </div>
                  <div>
                    <MultipleSelectField
                      fieldId="multipleSelectFieldValidationValidFilled"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Looks good!"
                      validationState="valid"
                      variant="filled"
                      options={this.exampleOptions}
                      value={['apples']}
                    />
                    <MultipleSelectField
                      fieldId="multipleSelectFieldValidationWarningOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Really…?"
                      validationState="warning"
                      variant="filled"
                      options={this.exampleOptions}
                      value={['bananas']}
                    />
                    <MultipleSelectField
                      fieldId="multipleSelectFieldValidationInvalidOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Uh…"
                      validationState="invalid"
                      variant="filled"
                      options={this.exampleOptions}
                      value={['grapefruits']}
                    />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Full width select field"
              component={(
                <div>
                  <MultipleSelectField
                    fieldId="multipleSelectFieldFullWidthOutline"
                    changeHandler={logger}
                    label="Favorite fruit"
                    options={this.exampleOptions}
                    fullWidth
                  />
                  <MultipleSelectField
                    fieldId="multipleSelectFieldFullWidthFilled"
                    changeHandler={logger}
                    label="Favorite fruit"
                    variant="filled"
                    options={this.exampleOptions}
                    fullWidth
                  />
                </div>
              )}
            />
            <h3 id="components-radio" className="typography-size-4 offset-6">Radio</h3>
            <Documentation
              name="Radio"
              component={(
                <Radio
                  changeHandler={logger}
                  fieldId="Radio"
                  label="Choices"
                  options={this.exampleOptions}
                  value="apples"
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
                  options={this.exampleOptions}
                  value="apples"
                  required
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
                  description="Choose one"
                  error="This is disabled"
                  options={this.exampleOptions}
                  value="apples"
                  required
                  disabled
                />
              )}
            />
            <h3 id="components-selectfield" className="typography-size-4 offset-6">Select Field</h3>
            <Documentation
              name="Select field variants"
              component={(
                <div>
                  <SelectField
                    fieldId="selectFieldVariantOutline"
                    changeHandler={logger}
                    label="Outline"
                    options={this.exampleOptions}
                  />
                  <SelectField
                    fieldId="selectFieldVariantFilled"
                    changeHandler={logger}
                    label="Filled"
                    variant="filled"
                    options={this.exampleOptions}
                  />
                </div>
              )}
            />
            <Documentation
              name="Select field with helper text"
              component={(
                <div>
                  <SelectField
                    fieldId="selectFieldWithDescriptionOutline"
                    changeHandler={logger}
                    label="Favorite fruit"
                    helperText="What is your favorite fruit?"
                    options={this.exampleOptions}
                  />
                  <SelectField
                    fieldId="selectFieldWithDescriptionFilled"
                    changeHandler={logger}
                    label="Favorite fruit"
                    helperText="What is your favorite fruit?"
                    variant="filled"
                    options={this.exampleOptions}
                  />
                </div>
              )}
            />
            <Documentation
              name="Required select field"
              component={(
                <div>
                  <SelectField
                    fieldId="selectFieldRequiredOutline"
                    changeHandler={logger}
                    label="This field is required"
                    options={this.exampleOptions}
                    required
                  />
                  <SelectField
                    fieldId="selectFieldRequiredFilled"
                    changeHandler={logger}
                    label="This field is required"
                    variant="filled"
                    options={this.exampleOptions}
                    required
                  />
                </div>
              )}
            />
            <Documentation
              name="Disabled select field"
              component={(
                <div>
                  <SelectField
                    fieldId="selectFieldDisabledOutline"
                    changeHandler={logger}
                    label="Disabled select field"
                    options={this.exampleOptions}
                    disabled
                  />
                  <SelectField
                    fieldId="selectFieldDisabledFilled"
                    changeHandler={logger}
                    label="Disabled select field"
                    variant="filled"
                    options={this.exampleOptions}
                    disabled
                  />
                </div>
              )}
            />
            <Documentation
              name="Select field with invisible label"
              component={(
                <div>
                  <SelectField
                    fieldId="selectFieldWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Select field with invisible label"
                    helperText="Showing helper text instead"
                    options={this.exampleOptions}
                    isLabelVisible={false}
                  />
                  <SelectField
                    fieldId="selectFieldWithInvisibleLabelFilled"
                    changeHandler={logger}
                    label="Select field with invisible label"
                    helperText="Showing helper text instead"
                    variant="filled"
                    options={this.exampleOptions}
                    isLabelVisible={false}
                  />
                </div>
              )}
            />
            <Documentation
              name="Validation states"
              component={(
                <div>
                  <div>
                    <SelectField
                      fieldId="selectFieldValidationValidOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Looks good!"
                      validationState="valid"
                      options={this.exampleOptions}
                      value="apples"
                    />
                    <SelectField
                      fieldId="selectFieldValidationWarningOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Really…?"
                      validationState="warning"
                      options={this.exampleOptions}
                      value="bananas"
                    />
                    <SelectField
                      fieldId="selectFieldValidationInvalidOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Uh…"
                      validationState="invalid"
                      options={this.exampleOptions}
                      value="grapefruits"
                    />
                  </div>
                  <div>
                    <SelectField
                      fieldId="selectFieldValidationValidFilled"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Looks good!"
                      validationState="valid"
                      variant="filled"
                      options={this.exampleOptions}
                      value="apples"
                    />
                    <SelectField
                      fieldId="selectFieldValidationWarningOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Really…?"
                      validationState="warning"
                      variant="filled"
                      options={this.exampleOptions}
                      value="bananas"
                    />
                    <SelectField
                      fieldId="selectFieldValidationInvalidOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Uh…"
                      validationState="invalid"
                      variant="filled"
                      options={this.exampleOptions}
                      value="grapefruits"
                    />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Full width select field"
              component={(
                <div>
                  <SelectField
                    fieldId="selectFieldFullWidthOutline"
                    changeHandler={logger}
                    label="Favorite fruit"
                    options={this.exampleOptions}
                    fullWidth
                  />
                  <SelectField
                    fieldId="selectFieldFullWidthFilled"
                    changeHandler={logger}
                    label="Favorite fruit"
                    variant="filled"
                    options={this.exampleOptions}
                    fullWidth
                  />
                </div>
              )}
            />
            <Documentation
              name="Horizontal layout"
              component={(
                <div>
                  <div className="offset-3">
                    <SelectField
                      fieldId="selectFieldHorizontalOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="What do you like?"
                      layout="horizontal"
                      options={this.exampleOptions}
                    />
                    <SelectField
                      fieldId="selectFieldHorizontalFilled"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="This kind of fruit does not exist."
                      layout="horizontal"
                      validationState="invalid"
                      variant="filled"
                      options={this.exampleOptions}
                      value="grapefruits"
                    />
                  </div>
                  <div className="offset-3">
                    <SelectField
                      fieldId="selectFieldHorizontalFullWidthOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      layout="horizontal"
                      options={this.exampleOptions}
                      fullWidth
                    />
                    <SelectField
                      fieldId="selectFieldHorizontalFullWidthFilled"
                      changeHandler={logger}
                      label="Favorite fruit"
                      layout="horizontal"
                      variant="filled"
                      options={this.exampleOptions}
                      fullWidth
                    />
                  </div>
                  <div>
                    <SelectField
                      fieldId="selectFieldHorizontalFullWidthLabelInvisibleOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      layout="horizontal"
                      isLabelVisible={false}
                      options={this.exampleOptions}
                      fullWidth
                    />
                    <SelectField
                      fieldId="selectFieldHorizontalFullWidthInvisibleFilled"
                      changeHandler={logger}
                      label="Favorite fruit"
                      layout="horizontal"
                      variant="filled"
                      isLabelVisible={false}
                      options={this.exampleOptions}
                      fullWidth
                    />
                  </div>
                </div>
              )}
            />
            <h3 id="components-table" className="typography-size-4 offset-6">Table</h3>
            <Documentation
              name="Table"
              component={(
                <Table
                  columns={[
                    {
                      isSortable: true,
                      label: 'Id',
                      name: 'id',
                    },
                    {
                      isSortable: true,
                      label: 'Name',
                      name: 'name',
                    },
                    {
                      format: row => row.dateOfBirth.toLocaleDateString('cz-CZ'),
                      isSortable: false,
                      label: 'Date of birth',
                      name: 'dateOfBirth',
                    },
                  ]}
                  rows={[
                    {
                      dateOfBirth: new Date(2018, 1, 1),
                      id: 1,
                      name: 'Jan Novak',
                    },
                    {
                      dateOfBirth: new Date(2000, 12, 31),
                      id: 2,
                      name: 'Josef Novak',
                    },
                    {
                      dateOfBirth: new Date(1970, 12, 24),
                      id: 3,
                      name: 'Jiří Novak',
                    },
                  ]}
                  sort={{
                    changeHandler: (column, direction) => {
                      this.setState({
                        tableSortColumn: column,
                        tableSortDirection: direction === 'asc' ? 'desc' : 'asc',
                      });
                    },
                    column: this.state.tableSortColumn,
                    direction: this.state.tableSortDirection,
                  }}
                />
              )}
            />
            <h3 id="components-textarea" className="typography-size-4 offset-6">Text Area</h3>
            <Documentation
              name="Text area variants"
              component={(
                <div>
                  <TextArea
                    fieldId="textAreaVariantOutline"
                    changeHandler={logger}
                    label="Outline"
                  />
                  <TextArea
                    fieldId="textAreaVariantFilled"
                    changeHandler={logger}
                    label="Filled"
                    variant="filled"
                  />
                </div>
              )}
            />
            <Documentation
              name="Text area with helper text"
              component={(
                <div>
                  <TextArea
                    fieldId="textAreaWithDescriptionOutline"
                    changeHandler={logger}
                    label="Address"
                    helperText="Fill in your address"
                  />
                  <TextArea
                    fieldId="textAreaWithDescriptionFilled"
                    changeHandler={logger}
                    label="Address"
                    helperText="Fill in your address"
                    variant="filled"
                  />
                </div>
              )}
            />
            <Documentation
              name="Required text area"
              component={(
                <div>
                  <TextArea
                    fieldId="textAreaRequiredOutline"
                    changeHandler={logger}
                    label="This field is required"
                    required
                  />
                  <TextArea
                    fieldId="textAreaRequiredFilled"
                    changeHandler={logger}
                    label="This field is required"
                    variant="filled"
                    required
                  />
                </div>
              )}
            />
            <Documentation
              name="Disabled text area"
              component={(
                <div>
                  <TextArea
                    fieldId="textAreaDisabledOutline"
                    changeHandler={logger}
                    label="Disabled text area"
                    placeholder="This field is disabled"
                    disabled
                  />
                  <TextArea
                    fieldId="textAreaDisabledFilled"
                    changeHandler={logger}
                    label="Disabled text area"
                    placeholder="This field is disabled"
                    variant="filled"
                    disabled
                  />
                </div>
              )}
            />
            <Documentation
              name="Text area with invisible label"
              component={(
                <div>
                  <TextArea
                    fieldId="textAreaWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Text area with invisible label"
                    helperText="Showing placeholder instead"
                    placeholder="Text area with invisible label"
                    isLabelVisible={false}
                  />
                  <TextArea
                    fieldId="textAreaWithInvisibleLabelFilled"
                    changeHandler={logger}
                    label="Text area with invisible label"
                    helperText="Showing placeholder instead"
                    placeholder="Text area with invisible label"
                    variant="filled"
                    isLabelVisible={false}
                  />
                </div>
              )}
            />
            <Documentation
              name="Validation states"
              component={(
                <div>
                  <div>
                    <TextArea
                      fieldId="textAreaValidationValidOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Ho ho ho, looks good!"
                      validationState="valid"
                      value="BMW M4"
                    />
                    <TextArea
                      fieldId="textAreaValidationWarningOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Isn't it a little too big for you?"
                      validationState="warning"
                      value="BMW X5"
                    />
                    <TextArea
                      fieldId="textAreaValidationInvalidOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Common, it's so ugly…"
                      validationState="invalid"
                      value="BMW X6"
                    />
                  </div>
                  <div>
                    <TextArea
                      fieldId="textAreaValidationValidOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Ho ho ho, looks good!"
                      validationState="valid"
                      value="BMW M4"
                      variant="filled"
                    />
                    <TextArea
                      fieldId="textAreaValidationWarningOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Isn't it a little too big for you?"
                      validationState="warning"
                      value="BMW X5"
                      variant="filled"
                    />
                    <TextArea
                      fieldId="textAreaValidationInvalidOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Common, it's so ugly…"
                      validationState="invalid"
                      value="BMW X6"
                      variant="filled"
                    />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Custom input size"
              component={(
                <div>
                  <TextArea
                    fieldId="textAreaCustomSizeOutline"
                    changeHandler={logger}
                    label="Rows and cols"
                    cols={10}
                    rows={5}
                  />
                  <TextArea
                    fieldId="textAreaCustomSizeFilled"
                    changeHandler={logger}
                    label="Rows and cols"
                    variant="filled"
                    cols={10}
                    rows={5}
                  />
                </div>
              )}
            />
            <Documentation
              name="Full width text area"
              component={(
                <div>
                  <TextArea
                    fieldId="textAreaFullWidthOutline"
                    changeHandler={logger}
                    label="What is your story?"
                    placeholder="I was born and raised in…"
                    fullWidth
                  />
                  <TextArea
                    fieldId="textAreaFullWidthFilled"
                    changeHandler={logger}
                    label="What is your story?"
                    placeholder="I was born and raised in…"
                    variant="filled"
                    fullWidth
                  />
                </div>
              )}
            />
            <Documentation
              name="Horizontal layout"
              component={(
                <div>
                  <div className="offset-3">
                    <TextArea
                      fieldId="textAreaHorizontalOutline"
                      changeHandler={logger}
                      label="Address"
                      helperText="Where you live"
                      layout="horizontal"
                    />
                    <TextArea
                      fieldId="textAreaHorizontalFilled"
                      changeHandler={logger}
                      label="Address"
                      value="Neverland"
                      helperText="The address does not exist."
                      validationState="invalid"
                      layout="horizontal"
                      variant="filled"
                    />
                  </div>
                  <div className="offset-3">
                    <TextArea
                      fieldId="textAreaCustomSizeOutline"
                      changeHandler={logger}
                      label="Rows and cols"
                      layout="horizontal"
                      cols={10}
                      rows={5}
                    />
                    <TextArea
                      fieldId="textAreaCustomSizeFilled"
                      changeHandler={logger}
                      label="Rows and cols"
                      layout="horizontal"
                      variant="filled"
                      cols={10}
                      rows={5}
                    />
                  </div>
                  <div className="offset-3">
                    <TextArea
                      fieldId="textAreaHorizontalFullWidthOutline"
                      changeHandler={logger}
                      label="Long story short"
                      layout="horizontal"
                      fullWidth
                    />
                    <TextArea
                      fieldId="textAreaHorizontalFullWidthFilled"
                      changeHandler={logger}
                      label="Long story short"
                      layout="horizontal"
                      variant="filled"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextArea
                      fieldId="textAreaHorizontalFullWidthLabelInvisibleOutline"
                      changeHandler={logger}
                      label="Long story short"
                      placeholder="Full width text area with horizontal layout works better with placeholder"
                      layout="horizontal"
                      isLabelVisible={false}
                      fullWidth
                    />
                    <TextArea
                      fieldId="textAreaHorizontalFullWidthInvisibleFilled"
                      changeHandler={logger}
                      label="Long story short"
                      placeholder="Full width text area with horizontal layout works better with placeholder"
                      layout="horizontal"
                      variant="filled"
                      isLabelVisible={false}
                      fullWidth
                    />
                  </div>
                </div>
              )}
            />
            <h3 id="components-textfield" className="typography-size-4 offset-6">Text Field</h3>
            <Documentation
              name="Text field variants"
              component={(
                <div>
                  <TextField
                    fieldId="textFieldVariantOutline"
                    changeHandler={logger}
                    label="Outline"
                  />
                  <TextField
                    fieldId="textFieldVariantFilled"
                    changeHandler={logger}
                    label="Filled"
                    variant="filled"
                  />
                </div>
              )}
            />
            <Documentation
              name="Text field with helper text"
              component={(
                <div>
                  <TextField
                    fieldId="textFieldWithDescriptionOutline"
                    changeHandler={logger}
                    label="Name"
                    helperText="Fill in your real name"
                  />
                  <TextField
                    fieldId="textFieldWithDescriptionFilled"
                    changeHandler={logger}
                    label="Name"
                    helperText="Fill in your real name"
                    variant="filled"
                  />
                </div>
              )}
            />
            <Documentation
              name="Required text field"
              component={(
                <div>
                  <TextField
                    fieldId="textFieldRequiredOutline"
                    changeHandler={logger}
                    label="This field is required"
                    required
                  />
                  <TextField
                    fieldId="textFieldRequiredFilled"
                    changeHandler={logger}
                    label="This field is required"
                    variant="filled"
                    required
                  />
                </div>
              )}
            />
            <Documentation
              name="Disabled text field"
              component={(
                <div>
                  <TextField
                    fieldId="textFieldDisabledOutline"
                    changeHandler={logger}
                    label="Disabled text field"
                    placeholder="This field is disabled"
                    disabled
                  />
                  <TextField
                    fieldId="textFieldDisabledFilled"
                    changeHandler={logger}
                    label="Disabled text field"
                    placeholder="This field is disabled"
                    variant="filled"
                    disabled
                  />
                </div>
              )}
            />
            <Documentation
              name="Text field with invisible label"
              component={(
                <div>
                  <TextField
                    fieldId="textFieldWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Text field with invisible label"
                    helperText="Showing placeholder instead"
                    placeholder="Text field with invisible label"
                    isLabelVisible={false}
                  />
                  <TextField
                    fieldId="textFieldWithInvisibleLabelFilled"
                    changeHandler={logger}
                    label="Text field with invisible label"
                    helperText="Showing placeholder instead"
                    placeholder="Text field with invisible label"
                    variant="filled"
                    isLabelVisible={false}
                  />
                </div>
              )}
            />
            <Documentation
              name="Validation states"
              component={(
                <div>
                  <div>
                    <TextField
                      fieldId="textFieldValidationValidOutline"
                      changeHandler={logger}
                      label="User name"
                      helperText="Looks good!"
                      validationState="valid"
                      value="terminator"
                    />
                    <TextField
                      fieldId="textFieldValidationWarningOutline"
                      changeHandler={logger}
                      label="Email"
                      helperText="Account with this address already exists, please pick a different address."
                      validationState="warning"
                      value="me@example.com"
                    />
                    <TextField
                      fieldId="textFieldValidationInvalidOutline"
                      changeHandler={logger}
                      label="Name"
                      helperText="Common, this is not your real name."
                      validationState="invalid"
                      value="xx"
                    />
                  </div>
                  <div>
                    <TextField
                      fieldId="textFieldValidationValidFilled"
                      changeHandler={logger}
                      label="User name"
                      helperText="Looks good!"
                      validationState="valid"
                      value="terminator"
                      variant="filled"
                    />
                    <TextField
                      fieldId="textFieldValidationWarningFilled"
                      changeHandler={logger}
                      label="Email"
                      helperText="Account with this address already exists, please pick a different address."
                      validationState="warning"
                      value="me@example.com"
                      variant="filled"
                    />
                    <TextField
                      fieldId="textFieldValidationInvalidFilled"
                      changeHandler={logger}
                      label="Name"
                      helperText="Common, this is not your real name."
                      validationState="invalid"
                      value="xx"
                      variant="filled"
                    />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Custom input size"
              component={(
                <div>
                  <TextField
                    fieldId="textFieldCustomSizeOutline"
                    changeHandler={logger}
                    label="Age"
                    size={3}
                  />
                  <TextField
                    fieldId="textFieldCustomSizeFilled"
                    changeHandler={logger}
                    label="Age"
                    variant="filled"
                    size={3}
                  />
                </div>
              )}
            />
            <Documentation
              name="Full width text field"
              component={(
                <div>
                  <TextField
                    fieldId="textFieldFullWidthOutline"
                    changeHandler={logger}
                    label="What is your story?"
                    placeholder="I was born and raised in…"
                    fullWidth
                  />
                  <TextField
                    fieldId="textFieldFullWidthFilled"
                    changeHandler={logger}
                    label="What is your story?"
                    placeholder="I was born and raised in…"
                    variant="filled"
                    fullWidth
                  />
                </div>
              )}
            />
            <Documentation
              name="Horizontal layout"
              component={(
                <div>
                  <div className="offset-3">
                    <TextField
                      fieldId="textFieldHorizontalOutline"
                      changeHandler={logger}
                      label="Address"
                      helperText="Where you live"
                      layout="horizontal"
                    />
                    <TextField
                      fieldId="textFieldHorizontalFilled"
                      changeHandler={logger}
                      label="Address"
                      value="Neverland"
                      helperText="The address does not exist."
                      validationState="invalid"
                      layout="horizontal"
                      variant="filled"
                    />
                  </div>
                  <div className="offset-3">
                    <TextField
                      fieldId="textFieldHorizontalCustomSizeOutline"
                      changeHandler={logger}
                      label="Age"
                      layout="horizontal"
                      size={3}
                    />
                    <TextField
                      fieldId="textFieldHorizontalCustomSizeFilled"
                      changeHandler={logger}
                      label="Age"
                      helperText="How old do you see yourself?"
                      layout="horizontal"
                      variant="filled"
                      size={3}
                    />
                  </div>
                  <div className="offset-3">
                    <TextField
                      fieldId="textFieldHorizontalFullWidthOutline"
                      changeHandler={logger}
                      label="Long story short"
                      layout="horizontal"
                      fullWidth
                    />
                    <TextField
                      fieldId="textFieldHorizontalFullWidthFilled"
                      changeHandler={logger}
                      label="Long story short"
                      layout="horizontal"
                      variant="filled"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      fieldId="textFieldHorizontalFullWidthLabelInvisibleOutline"
                      changeHandler={logger}
                      label="Long story short"
                      placeholder="Full width text field with horizontal layout works better with placeholder"
                      layout="horizontal"
                      isLabelVisible={false}
                      fullWidth
                    />
                    <TextField
                      fieldId="textFieldHorizontalFullWidthInvisibleFilled"
                      changeHandler={logger}
                      label="Long story short"
                      placeholder="Full width text field with horizontal layout works better with placeholder"
                      layout="horizontal"
                      variant="filled"
                      isLabelVisible={false}
                      fullWidth
                    />
                  </div>
                </div>
              )}
            />
            <h3 id="components-toggle" className="typography-size-4 offset-6">Toggle</h3>
            <Documentation
              name="Toggle"
              component={(
                <Toggle
                  fieldId="toggleField"
                  label="toggle"
                  changeHandler={logger}
                  required
                  description="Help text"
                />
              )}
            />
            <Documentation
              name="Toggle checked"
              component={(
                <Toggle
                  fieldId="toggleChecked"
                  label="toggle checked"
                  checked
                  value="1"
                  changeHandler={logger}
                  error="This should not be checked"
                />
              )}
            />
            <Documentation
              name="Toggle disabled"
              component={(
                <Toggle
                  fieldId="toggledDisabled"
                  label="toggle checked and disabled"
                  checked
                  disabled
                  changeHandler={logger}
                />
              )}
            />
          </section>
          <section id="screens" className="offset-7">
            <h2 className="typography-size-5 offset-6">Screens</h2>
            <Documentation
              name="Login screen"
              component={(
                <LayoutCenter>
                  <Login
                    logoUrl="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzJfMV8iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgODQxLjkgNTk1LjMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDg0MS45IDU5NS4zIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM2MURBRkIiIGQ9Ik02NjYuMywyOTYuNWMwLTMyLjUtNDAuNy02My4zLTEwMy4xLTgyLjRjMTQuNC02My42LDgtMTE0LjItMjAuMi0xMzAuNGMtNi41LTMuOC0xNC4xLTUuNi0yMi40LTUuNnYyMi4zDQoJCWM0LjYsMCw4LjMsMC45LDExLjQsMi42YzEzLjYsNy44LDE5LjUsMzcuNSwxNC45LDc1LjdjLTEuMSw5LjQtMi45LDE5LjMtNS4xLDI5LjRjLTE5LjYtNC44LTQxLTguNS02My41LTEwLjkNCgkJYy0xMy41LTE4LjUtMjcuNS0zNS4zLTQxLjYtNTBjMzIuNi0zMC4zLDYzLjItNDYuOSw4NC00Ni45bDAtMjIuM2MwLDAsMCwwLDAsMGMtMjcuNSwwLTYzLjUsMTkuNi05OS45LDUzLjYNCgkJYy0zNi40LTMzLjgtNzIuNC01My4yLTk5LjktNTMuMnYyMi4zYzIwLjcsMCw1MS40LDE2LjUsODQsNDYuNmMtMTQsMTQuNy0yOCwzMS40LTQxLjMsNDkuOWMtMjIuNiwyLjQtNDQsNi4xLTYzLjYsMTENCgkJYy0yLjMtMTAtNC0xOS43LTUuMi0yOWMtNC43LTM4LjIsMS4xLTY3LjksMTQuNi03NS44YzMtMS44LDYuOS0yLjYsMTEuNS0yLjZsMC0yMi4zYzAsMCwwLDAsMCwwYy04LjQsMC0xNiwxLjgtMjIuNiw1LjYNCgkJYy0yOC4xLDE2LjItMzQuNCw2Ni43LTE5LjksMTMwLjFjLTYyLjIsMTkuMi0xMDIuNyw0OS45LTEwMi43LDgyLjNjMCwzMi41LDQwLjcsNjMuMywxMDMuMSw4Mi40Yy0xNC40LDYzLjYtOCwxMTQuMiwyMC4yLDEzMC40DQoJCWM2LjUsMy44LDE0LjEsNS42LDIyLjUsNS42YzI3LjUsMCw2My41LTE5LjYsOTkuOS01My42YzM2LjQsMzMuOCw3Mi40LDUzLjIsOTkuOSw1My4yYzguNCwwLDE2LTEuOCwyMi42LTUuNg0KCQljMjguMS0xNi4yLDM0LjQtNjYuNywxOS45LTEzMC4xQzYyNS44LDM1OS43LDY2Ni4zLDMyOC45LDY2Ni4zLDI5Ni41eiBNNTM2LjEsMjI5LjhjLTMuNywxMi45LTguMywyNi4yLTEzLjUsMzkuNQ0KCQljLTQuMS04LTguNC0xNi0xMy4xLTI0Yy00LjYtOC05LjUtMTUuOC0xNC40LTIzLjRDNTA5LjMsMjI0LDUyMywyMjYuNiw1MzYuMSwyMjkuOHogTTQ5MC4zLDMzNi4zYy03LjgsMTMuNS0xNS44LDI2LjMtMjQuMSwzOC4yDQoJCWMtMTQuOSwxLjMtMzAsMi00NS4yLDJjLTE1LjEsMC0zMC4yLTAuNy00NS0xLjljLTguMy0xMS45LTE2LjQtMjQuNi0yNC4yLTM4Yy03LjYtMTMuMS0xNC41LTI2LjQtMjAuOC0zOS44DQoJCWM2LjItMTMuNCwxMy4yLTI2LjgsMjAuNy0zOS45YzcuOC0xMy41LDE1LjgtMjYuMywyNC4xLTM4LjJjMTQuOS0xLjMsMzAtMiw0NS4yLTJjMTUuMSwwLDMwLjIsMC43LDQ1LDEuOQ0KCQljOC4zLDExLjksMTYuNCwyNC42LDI0LjIsMzhjNy42LDEzLjEsMTQuNSwyNi40LDIwLjgsMzkuOEM1MDQuNywzMDkuOCw0OTcuOCwzMjMuMiw0OTAuMywzMzYuM3ogTTUyMi42LDMyMy4zDQoJCWM1LjQsMTMuNCwxMCwyNi44LDEzLjgsMzkuOGMtMTMuMSwzLjItMjYuOSw1LjktNDEuMiw4YzQuOS03LjcsOS44LTE1LjYsMTQuNC0yMy43QzUxNC4yLDMzOS40LDUxOC41LDMzMS4zLDUyMi42LDMyMy4zeg0KCQkgTTQyMS4yLDQzMGMtOS4zLTkuNi0xOC42LTIwLjMtMjcuOC0zMmM5LDAuNCwxOC4yLDAuNywyNy41LDAuN2M5LjQsMCwxOC43LTAuMiwyNy44LTAuN0M0MzkuNyw0MDkuNyw0MzAuNCw0MjAuNCw0MjEuMiw0MzB6DQoJCSBNMzQ2LjgsMzcxLjFjLTE0LjItMi4xLTI3LjktNC43LTQxLTcuOWMzLjctMTIuOSw4LjMtMjYuMiwxMy41LTM5LjVjNC4xLDgsOC40LDE2LDEzLjEsMjRDMzM3LjEsMzU1LjcsMzQxLjksMzYzLjUsMzQ2LjgsMzcxLjF6DQoJCSBNNDIwLjcsMTYzYzkuMyw5LjYsMTguNiwyMC4zLDI3LjgsMzJjLTktMC40LTE4LjItMC43LTI3LjUtMC43Yy05LjQsMC0xOC43LDAuMi0yNy44LDAuN0M0MDIuMiwxODMuMyw0MTEuNSwxNzIuNiw0MjAuNywxNjN6DQoJCSBNMzQ2LjcsMjIxLjljLTQuOSw3LjctOS44LDE1LjYtMTQuNCwyMy43Yy00LjYsOC04LjksMTYtMTMsMjRjLTUuNC0xMy40LTEwLTI2LjgtMTMuOC0zOS44QzMxOC42LDIyNi43LDMzMi40LDIyNCwzNDYuNywyMjEuOXoNCgkJIE0yNTYuMiwzNDcuMWMtMzUuNC0xNS4xLTU4LjMtMzQuOS01OC4zLTUwLjZjMC0xNS43LDIyLjktMzUuNiw1OC4zLTUwLjZjOC42LTMuNywxOC03LDI3LjctMTAuMWM1LjcsMTkuNiwxMy4yLDQwLDIyLjUsNjAuOQ0KCQljLTkuMiwyMC44LTE2LjYsNDEuMS0yMi4yLDYwLjZDMjc0LjMsMzU0LjIsMjY0LjksMzUwLjgsMjU2LjIsMzQ3LjF6IE0zMTAsNDkwYy0xMy42LTcuOC0xOS41LTM3LjUtMTQuOS03NS43DQoJCWMxLjEtOS40LDIuOS0xOS4zLDUuMS0yOS40YzE5LjYsNC44LDQxLDguNSw2My41LDEwLjljMTMuNSwxOC41LDI3LjUsMzUuMyw0MS42LDUwYy0zMi42LDMwLjMtNjMuMiw0Ni45LTg0LDQ2LjkNCgkJQzMxNi44LDQ5Mi42LDMxMyw0OTEuNywzMTAsNDkweiBNNTQ3LjIsNDEzLjhjNC43LDM4LjItMS4xLDY3LjktMTQuNiw3NS44Yy0zLDEuOC02LjksMi42LTExLjUsMi42Yy0yMC43LDAtNTEuNC0xNi41LTg0LTQ2LjYNCgkJYzE0LTE0LjcsMjgtMzEuNCw0MS4zLTQ5LjljMjIuNi0yLjQsNDQtNi4xLDYzLjYtMTFDNTQ0LjMsMzk0LjgsNTQ2LjEsNDA0LjUsNTQ3LjIsNDEzLjh6IE01ODUuNywzNDcuMWMtOC42LDMuNy0xOCw3LTI3LjcsMTAuMQ0KCQljLTUuNy0xOS42LTEzLjItNDAtMjIuNS02MC45YzkuMi0yMC44LDE2LjYtNDEuMSwyMi4yLTYwLjZjOS45LDMuMSwxOS4zLDYuNSwyOC4xLDEwLjJjMzUuNCwxNS4xLDU4LjMsMzQuOSw1OC4zLDUwLjYNCgkJQzY0NCwzMTIuMiw2MjEuMSwzMzIuMSw1ODUuNywzNDcuMXoiLz4NCgk8cG9seWdvbiBmaWxsPSIjNjFEQUZCIiBwb2ludHM9IjMyMC44LDc4LjQgMzIwLjgsNzguNCAzMjAuOCw3OC40IAkiLz4NCgk8Y2lyY2xlIGZpbGw9IiM2MURBRkIiIGN4PSI0MjAuOSIgY3k9IjI5Ni41IiByPSI0NS43Ii8+DQoJPHBvbHlnb24gZmlsbD0iIzYxREFGQiIgcG9pbnRzPSI1MjAuNSw3OC4xIDUyMC41LDc4LjEgNTIwLjUsNzguMSAJIi8+DQo8L2c+DQo8L3N2Zz4NCg=="
                    title="Company"
                    hasError
                    submitHandler={submitter}
                    footer={(
                      <a href="http://example.com">link</a>
                    )}
                  />
                </LayoutCenter>
              )}
            />
            <Documentation
              name="Forgot password screen"
              component={(
                <LayoutCenter>
                  <ForgotPassword
                    logoUrl="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzJfMV8iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgODQxLjkgNTk1LjMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDg0MS45IDU5NS4zIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM2MURBRkIiIGQ9Ik02NjYuMywyOTYuNWMwLTMyLjUtNDAuNy02My4zLTEwMy4xLTgyLjRjMTQuNC02My42LDgtMTE0LjItMjAuMi0xMzAuNGMtNi41LTMuOC0xNC4xLTUuNi0yMi40LTUuNnYyMi4zDQoJCWM0LjYsMCw4LjMsMC45LDExLjQsMi42YzEzLjYsNy44LDE5LjUsMzcuNSwxNC45LDc1LjdjLTEuMSw5LjQtMi45LDE5LjMtNS4xLDI5LjRjLTE5LjYtNC44LTQxLTguNS02My41LTEwLjkNCgkJYy0xMy41LTE4LjUtMjcuNS0zNS4zLTQxLjYtNTBjMzIuNi0zMC4zLDYzLjItNDYuOSw4NC00Ni45bDAtMjIuM2MwLDAsMCwwLDAsMGMtMjcuNSwwLTYzLjUsMTkuNi05OS45LDUzLjYNCgkJYy0zNi40LTMzLjgtNzIuNC01My4yLTk5LjktNTMuMnYyMi4zYzIwLjcsMCw1MS40LDE2LjUsODQsNDYuNmMtMTQsMTQuNy0yOCwzMS40LTQxLjMsNDkuOWMtMjIuNiwyLjQtNDQsNi4xLTYzLjYsMTENCgkJYy0yLjMtMTAtNC0xOS43LTUuMi0yOWMtNC43LTM4LjIsMS4xLTY3LjksMTQuNi03NS44YzMtMS44LDYuOS0yLjYsMTEuNS0yLjZsMC0yMi4zYzAsMCwwLDAsMCwwYy04LjQsMC0xNiwxLjgtMjIuNiw1LjYNCgkJYy0yOC4xLDE2LjItMzQuNCw2Ni43LTE5LjksMTMwLjFjLTYyLjIsMTkuMi0xMDIuNyw0OS45LTEwMi43LDgyLjNjMCwzMi41LDQwLjcsNjMuMywxMDMuMSw4Mi40Yy0xNC40LDYzLjYtOCwxMTQuMiwyMC4yLDEzMC40DQoJCWM2LjUsMy44LDE0LjEsNS42LDIyLjUsNS42YzI3LjUsMCw2My41LTE5LjYsOTkuOS01My42YzM2LjQsMzMuOCw3Mi40LDUzLjIsOTkuOSw1My4yYzguNCwwLDE2LTEuOCwyMi42LTUuNg0KCQljMjguMS0xNi4yLDM0LjQtNjYuNywxOS45LTEzMC4xQzYyNS44LDM1OS43LDY2Ni4zLDMyOC45LDY2Ni4zLDI5Ni41eiBNNTM2LjEsMjI5LjhjLTMuNywxMi45LTguMywyNi4yLTEzLjUsMzkuNQ0KCQljLTQuMS04LTguNC0xNi0xMy4xLTI0Yy00LjYtOC05LjUtMTUuOC0xNC40LTIzLjRDNTA5LjMsMjI0LDUyMywyMjYuNiw1MzYuMSwyMjkuOHogTTQ5MC4zLDMzNi4zYy03LjgsMTMuNS0xNS44LDI2LjMtMjQuMSwzOC4yDQoJCWMtMTQuOSwxLjMtMzAsMi00NS4yLDJjLTE1LjEsMC0zMC4yLTAuNy00NS0xLjljLTguMy0xMS45LTE2LjQtMjQuNi0yNC4yLTM4Yy03LjYtMTMuMS0xNC41LTI2LjQtMjAuOC0zOS44DQoJCWM2LjItMTMuNCwxMy4yLTI2LjgsMjAuNy0zOS45YzcuOC0xMy41LDE1LjgtMjYuMywyNC4xLTM4LjJjMTQuOS0xLjMsMzAtMiw0NS4yLTJjMTUuMSwwLDMwLjIsMC43LDQ1LDEuOQ0KCQljOC4zLDExLjksMTYuNCwyNC42LDI0LjIsMzhjNy42LDEzLjEsMTQuNSwyNi40LDIwLjgsMzkuOEM1MDQuNywzMDkuOCw0OTcuOCwzMjMuMiw0OTAuMywzMzYuM3ogTTUyMi42LDMyMy4zDQoJCWM1LjQsMTMuNCwxMCwyNi44LDEzLjgsMzkuOGMtMTMuMSwzLjItMjYuOSw1LjktNDEuMiw4YzQuOS03LjcsOS44LTE1LjYsMTQuNC0yMy43QzUxNC4yLDMzOS40LDUxOC41LDMzMS4zLDUyMi42LDMyMy4zeg0KCQkgTTQyMS4yLDQzMGMtOS4zLTkuNi0xOC42LTIwLjMtMjcuOC0zMmM5LDAuNCwxOC4yLDAuNywyNy41LDAuN2M5LjQsMCwxOC43LTAuMiwyNy44LTAuN0M0MzkuNyw0MDkuNyw0MzAuNCw0MjAuNCw0MjEuMiw0MzB6DQoJCSBNMzQ2LjgsMzcxLjFjLTE0LjItMi4xLTI3LjktNC43LTQxLTcuOWMzLjctMTIuOSw4LjMtMjYuMiwxMy41LTM5LjVjNC4xLDgsOC40LDE2LDEzLjEsMjRDMzM3LjEsMzU1LjcsMzQxLjksMzYzLjUsMzQ2LjgsMzcxLjF6DQoJCSBNNDIwLjcsMTYzYzkuMyw5LjYsMTguNiwyMC4zLDI3LjgsMzJjLTktMC40LTE4LjItMC43LTI3LjUtMC43Yy05LjQsMC0xOC43LDAuMi0yNy44LDAuN0M0MDIuMiwxODMuMyw0MTEuNSwxNzIuNiw0MjAuNywxNjN6DQoJCSBNMzQ2LjcsMjIxLjljLTQuOSw3LjctOS44LDE1LjYtMTQuNCwyMy43Yy00LjYsOC04LjksMTYtMTMsMjRjLTUuNC0xMy40LTEwLTI2LjgtMTMuOC0zOS44QzMxOC42LDIyNi43LDMzMi40LDIyNCwzNDYuNywyMjEuOXoNCgkJIE0yNTYuMiwzNDcuMWMtMzUuNC0xNS4xLTU4LjMtMzQuOS01OC4zLTUwLjZjMC0xNS43LDIyLjktMzUuNiw1OC4zLTUwLjZjOC42LTMuNywxOC03LDI3LjctMTAuMWM1LjcsMTkuNiwxMy4yLDQwLDIyLjUsNjAuOQ0KCQljLTkuMiwyMC44LTE2LjYsNDEuMS0yMi4yLDYwLjZDMjc0LjMsMzU0LjIsMjY0LjksMzUwLjgsMjU2LjIsMzQ3LjF6IE0zMTAsNDkwYy0xMy42LTcuOC0xOS41LTM3LjUtMTQuOS03NS43DQoJCWMxLjEtOS40LDIuOS0xOS4zLDUuMS0yOS40YzE5LjYsNC44LDQxLDguNSw2My41LDEwLjljMTMuNSwxOC41LDI3LjUsMzUuMyw0MS42LDUwYy0zMi42LDMwLjMtNjMuMiw0Ni45LTg0LDQ2LjkNCgkJQzMxNi44LDQ5Mi42LDMxMyw0OTEuNywzMTAsNDkweiBNNTQ3LjIsNDEzLjhjNC43LDM4LjItMS4xLDY3LjktMTQuNiw3NS44Yy0zLDEuOC02LjksMi42LTExLjUsMi42Yy0yMC43LDAtNTEuNC0xNi41LTg0LTQ2LjYNCgkJYzE0LTE0LjcsMjgtMzEuNCw0MS4zLTQ5LjljMjIuNi0yLjQsNDQtNi4xLDYzLjYtMTFDNTQ0LjMsMzk0LjgsNTQ2LjEsNDA0LjUsNTQ3LjIsNDEzLjh6IE01ODUuNywzNDcuMWMtOC42LDMuNy0xOCw3LTI3LjcsMTAuMQ0KCQljLTUuNy0xOS42LTEzLjItNDAtMjIuNS02MC45YzkuMi0yMC44LDE2LjYtNDEuMSwyMi4yLTYwLjZjOS45LDMuMSwxOS4zLDYuNSwyOC4xLDEwLjJjMzUuNCwxNS4xLDU4LjMsMzQuOSw1OC4zLDUwLjYNCgkJQzY0NCwzMTIuMiw2MjEuMSwzMzIuMSw1ODUuNywzNDcuMXoiLz4NCgk8cG9seWdvbiBmaWxsPSIjNjFEQUZCIiBwb2ludHM9IjMyMC44LDc4LjQgMzIwLjgsNzguNCAzMjAuOCw3OC40IAkiLz4NCgk8Y2lyY2xlIGZpbGw9IiM2MURBRkIiIGN4PSI0MjAuOSIgY3k9IjI5Ni41IiByPSI0NS43Ii8+DQoJPHBvbHlnb24gZmlsbD0iIzYxREFGQiIgcG9pbnRzPSI1MjAuNSw3OC4xIDUyMC41LDc4LjEgNTIwLjUsNzguMSAJIi8+DQo8L2c+DQo8L3N2Zz4NCg=="
                    title="Company"
                    hasError
                    submitHandler={submitter}
                    footer={(
                      <a href="http://example.com">link</a>
                    )}
                  />
                </LayoutCenter>
              )}
            />
            <Documentation
              name="New password screen"
              component={(
                <LayoutCenter>
                  <NewPassword
                    logoUrl="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzJfMV8iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgODQxLjkgNTk1LjMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDg0MS45IDU5NS4zIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM2MURBRkIiIGQ9Ik02NjYuMywyOTYuNWMwLTMyLjUtNDAuNy02My4zLTEwMy4xLTgyLjRjMTQuNC02My42LDgtMTE0LjItMjAuMi0xMzAuNGMtNi41LTMuOC0xNC4xLTUuNi0yMi40LTUuNnYyMi4zDQoJCWM0LjYsMCw4LjMsMC45LDExLjQsMi42YzEzLjYsNy44LDE5LjUsMzcuNSwxNC45LDc1LjdjLTEuMSw5LjQtMi45LDE5LjMtNS4xLDI5LjRjLTE5LjYtNC44LTQxLTguNS02My41LTEwLjkNCgkJYy0xMy41LTE4LjUtMjcuNS0zNS4zLTQxLjYtNTBjMzIuNi0zMC4zLDYzLjItNDYuOSw4NC00Ni45bDAtMjIuM2MwLDAsMCwwLDAsMGMtMjcuNSwwLTYzLjUsMTkuNi05OS45LDUzLjYNCgkJYy0zNi40LTMzLjgtNzIuNC01My4yLTk5LjktNTMuMnYyMi4zYzIwLjcsMCw1MS40LDE2LjUsODQsNDYuNmMtMTQsMTQuNy0yOCwzMS40LTQxLjMsNDkuOWMtMjIuNiwyLjQtNDQsNi4xLTYzLjYsMTENCgkJYy0yLjMtMTAtNC0xOS43LTUuMi0yOWMtNC43LTM4LjIsMS4xLTY3LjksMTQuNi03NS44YzMtMS44LDYuOS0yLjYsMTEuNS0yLjZsMC0yMi4zYzAsMCwwLDAsMCwwYy04LjQsMC0xNiwxLjgtMjIuNiw1LjYNCgkJYy0yOC4xLDE2LjItMzQuNCw2Ni43LTE5LjksMTMwLjFjLTYyLjIsMTkuMi0xMDIuNyw0OS45LTEwMi43LDgyLjNjMCwzMi41LDQwLjcsNjMuMywxMDMuMSw4Mi40Yy0xNC40LDYzLjYtOCwxMTQuMiwyMC4yLDEzMC40DQoJCWM2LjUsMy44LDE0LjEsNS42LDIyLjUsNS42YzI3LjUsMCw2My41LTE5LjYsOTkuOS01My42YzM2LjQsMzMuOCw3Mi40LDUzLjIsOTkuOSw1My4yYzguNCwwLDE2LTEuOCwyMi42LTUuNg0KCQljMjguMS0xNi4yLDM0LjQtNjYuNywxOS45LTEzMC4xQzYyNS44LDM1OS43LDY2Ni4zLDMyOC45LDY2Ni4zLDI5Ni41eiBNNTM2LjEsMjI5LjhjLTMuNywxMi45LTguMywyNi4yLTEzLjUsMzkuNQ0KCQljLTQuMS04LTguNC0xNi0xMy4xLTI0Yy00LjYtOC05LjUtMTUuOC0xNC40LTIzLjRDNTA5LjMsMjI0LDUyMywyMjYuNiw1MzYuMSwyMjkuOHogTTQ5MC4zLDMzNi4zYy03LjgsMTMuNS0xNS44LDI2LjMtMjQuMSwzOC4yDQoJCWMtMTQuOSwxLjMtMzAsMi00NS4yLDJjLTE1LjEsMC0zMC4yLTAuNy00NS0xLjljLTguMy0xMS45LTE2LjQtMjQuNi0yNC4yLTM4Yy03LjYtMTMuMS0xNC41LTI2LjQtMjAuOC0zOS44DQoJCWM2LjItMTMuNCwxMy4yLTI2LjgsMjAuNy0zOS45YzcuOC0xMy41LDE1LjgtMjYuMywyNC4xLTM4LjJjMTQuOS0xLjMsMzAtMiw0NS4yLTJjMTUuMSwwLDMwLjIsMC43LDQ1LDEuOQ0KCQljOC4zLDExLjksMTYuNCwyNC42LDI0LjIsMzhjNy42LDEzLjEsMTQuNSwyNi40LDIwLjgsMzkuOEM1MDQuNywzMDkuOCw0OTcuOCwzMjMuMiw0OTAuMywzMzYuM3ogTTUyMi42LDMyMy4zDQoJCWM1LjQsMTMuNCwxMCwyNi44LDEzLjgsMzkuOGMtMTMuMSwzLjItMjYuOSw1LjktNDEuMiw4YzQuOS03LjcsOS44LTE1LjYsMTQuNC0yMy43QzUxNC4yLDMzOS40LDUxOC41LDMzMS4zLDUyMi42LDMyMy4zeg0KCQkgTTQyMS4yLDQzMGMtOS4zLTkuNi0xOC42LTIwLjMtMjcuOC0zMmM5LDAuNCwxOC4yLDAuNywyNy41LDAuN2M5LjQsMCwxOC43LTAuMiwyNy44LTAuN0M0MzkuNyw0MDkuNyw0MzAuNCw0MjAuNCw0MjEuMiw0MzB6DQoJCSBNMzQ2LjgsMzcxLjFjLTE0LjItMi4xLTI3LjktNC43LTQxLTcuOWMzLjctMTIuOSw4LjMtMjYuMiwxMy41LTM5LjVjNC4xLDgsOC40LDE2LDEzLjEsMjRDMzM3LjEsMzU1LjcsMzQxLjksMzYzLjUsMzQ2LjgsMzcxLjF6DQoJCSBNNDIwLjcsMTYzYzkuMyw5LjYsMTguNiwyMC4zLDI3LjgsMzJjLTktMC40LTE4LjItMC43LTI3LjUtMC43Yy05LjQsMC0xOC43LDAuMi0yNy44LDAuN0M0MDIuMiwxODMuMyw0MTEuNSwxNzIuNiw0MjAuNywxNjN6DQoJCSBNMzQ2LjcsMjIxLjljLTQuOSw3LjctOS44LDE1LjYtMTQuNCwyMy43Yy00LjYsOC04LjksMTYtMTMsMjRjLTUuNC0xMy40LTEwLTI2LjgtMTMuOC0zOS44QzMxOC42LDIyNi43LDMzMi40LDIyNCwzNDYuNywyMjEuOXoNCgkJIE0yNTYuMiwzNDcuMWMtMzUuNC0xNS4xLTU4LjMtMzQuOS01OC4zLTUwLjZjMC0xNS43LDIyLjktMzUuNiw1OC4zLTUwLjZjOC42LTMuNywxOC03LDI3LjctMTAuMWM1LjcsMTkuNiwxMy4yLDQwLDIyLjUsNjAuOQ0KCQljLTkuMiwyMC44LTE2LjYsNDEuMS0yMi4yLDYwLjZDMjc0LjMsMzU0LjIsMjY0LjksMzUwLjgsMjU2LjIsMzQ3LjF6IE0zMTAsNDkwYy0xMy42LTcuOC0xOS41LTM3LjUtMTQuOS03NS43DQoJCWMxLjEtOS40LDIuOS0xOS4zLDUuMS0yOS40YzE5LjYsNC44LDQxLDguNSw2My41LDEwLjljMTMuNSwxOC41LDI3LjUsMzUuMyw0MS42LDUwYy0zMi42LDMwLjMtNjMuMiw0Ni45LTg0LDQ2LjkNCgkJQzMxNi44LDQ5Mi42LDMxMyw0OTEuNywzMTAsNDkweiBNNTQ3LjIsNDEzLjhjNC43LDM4LjItMS4xLDY3LjktMTQuNiw3NS44Yy0zLDEuOC02LjksMi42LTExLjUsMi42Yy0yMC43LDAtNTEuNC0xNi41LTg0LTQ2LjYNCgkJYzE0LTE0LjcsMjgtMzEuNCw0MS4zLTQ5LjljMjIuNi0yLjQsNDQtNi4xLDYzLjYtMTFDNTQ0LjMsMzk0LjgsNTQ2LjEsNDA0LjUsNTQ3LjIsNDEzLjh6IE01ODUuNywzNDcuMWMtOC42LDMuNy0xOCw3LTI3LjcsMTAuMQ0KCQljLTUuNy0xOS42LTEzLjItNDAtMjIuNS02MC45YzkuMi0yMC44LDE2LjYtNDEuMSwyMi4yLTYwLjZjOS45LDMuMSwxOS4zLDYuNSwyOC4xLDEwLjJjMzUuNCwxNS4xLDU4LjMsMzQuOSw1OC4zLDUwLjYNCgkJQzY0NCwzMTIuMiw2MjEuMSwzMzIuMSw1ODUuNywzNDcuMXoiLz4NCgk8cG9seWdvbiBmaWxsPSIjNjFEQUZCIiBwb2ludHM9IjMyMC44LDc4LjQgMzIwLjgsNzguNCAzMjAuOCw3OC40IAkiLz4NCgk8Y2lyY2xlIGZpbGw9IiM2MURBRkIiIGN4PSI0MjAuOSIgY3k9IjI5Ni41IiByPSI0NS43Ii8+DQoJPHBvbHlnb24gZmlsbD0iIzYxREFGQiIgcG9pbnRzPSI1MjAuNSw3OC4xIDUyMC41LDc4LjEgNTIwLjUsNzguMSAJIi8+DQo8L2c+DQo8L3N2Zz4NCg=="
                    title="Company"
                    hasError
                    submitHandler={submitter}
                    footer={(
                      <a href="http://example.com">link</a>
                    )}
                  />
                </LayoutCenter>
              )}
            />
            <Documentation
              name="Component with translations passed through TranslationProvider"
              component={(
                <TranslationProvider
                  translations={{
                    Login: {
                      email: 'E-mail',
                      invalidUsernameOrPassword: 'Nesprávný e-mail nebo heslo',
                      password: 'Heslo',
                      signIn: 'Přihlásit se',
                    },
                  }}
                >
                  <LayoutCenter>
                    <Login
                      logoUrl="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzJfMV8iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgODQxLjkgNTk1LjMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDg0MS45IDU5NS4zIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM2MURBRkIiIGQ9Ik02NjYuMywyOTYuNWMwLTMyLjUtNDAuNy02My4zLTEwMy4xLTgyLjRjMTQuNC02My42LDgtMTE0LjItMjAuMi0xMzAuNGMtNi41LTMuOC0xNC4xLTUuNi0yMi40LTUuNnYyMi4zDQoJCWM0LjYsMCw4LjMsMC45LDExLjQsMi42YzEzLjYsNy44LDE5LjUsMzcuNSwxNC45LDc1LjdjLTEuMSw5LjQtMi45LDE5LjMtNS4xLDI5LjRjLTE5LjYtNC44LTQxLTguNS02My41LTEwLjkNCgkJYy0xMy41LTE4LjUtMjcuNS0zNS4zLTQxLjYtNTBjMzIuNi0zMC4zLDYzLjItNDYuOSw4NC00Ni45bDAtMjIuM2MwLDAsMCwwLDAsMGMtMjcuNSwwLTYzLjUsMTkuNi05OS45LDUzLjYNCgkJYy0zNi40LTMzLjgtNzIuNC01My4yLTk5LjktNTMuMnYyMi4zYzIwLjcsMCw1MS40LDE2LjUsODQsNDYuNmMtMTQsMTQuNy0yOCwzMS40LTQxLjMsNDkuOWMtMjIuNiwyLjQtNDQsNi4xLTYzLjYsMTENCgkJYy0yLjMtMTAtNC0xOS43LTUuMi0yOWMtNC43LTM4LjIsMS4xLTY3LjksMTQuNi03NS44YzMtMS44LDYuOS0yLjYsMTEuNS0yLjZsMC0yMi4zYzAsMCwwLDAsMCwwYy04LjQsMC0xNiwxLjgtMjIuNiw1LjYNCgkJYy0yOC4xLDE2LjItMzQuNCw2Ni43LTE5LjksMTMwLjFjLTYyLjIsMTkuMi0xMDIuNyw0OS45LTEwMi43LDgyLjNjMCwzMi41LDQwLjcsNjMuMywxMDMuMSw4Mi40Yy0xNC40LDYzLjYtOCwxMTQuMiwyMC4yLDEzMC40DQoJCWM2LjUsMy44LDE0LjEsNS42LDIyLjUsNS42YzI3LjUsMCw2My41LTE5LjYsOTkuOS01My42YzM2LjQsMzMuOCw3Mi40LDUzLjIsOTkuOSw1My4yYzguNCwwLDE2LTEuOCwyMi42LTUuNg0KCQljMjguMS0xNi4yLDM0LjQtNjYuNywxOS45LTEzMC4xQzYyNS44LDM1OS43LDY2Ni4zLDMyOC45LDY2Ni4zLDI5Ni41eiBNNTM2LjEsMjI5LjhjLTMuNywxMi45LTguMywyNi4yLTEzLjUsMzkuNQ0KCQljLTQuMS04LTguNC0xNi0xMy4xLTI0Yy00LjYtOC05LjUtMTUuOC0xNC40LTIzLjRDNTA5LjMsMjI0LDUyMywyMjYuNiw1MzYuMSwyMjkuOHogTTQ5MC4zLDMzNi4zYy03LjgsMTMuNS0xNS44LDI2LjMtMjQuMSwzOC4yDQoJCWMtMTQuOSwxLjMtMzAsMi00NS4yLDJjLTE1LjEsMC0zMC4yLTAuNy00NS0xLjljLTguMy0xMS45LTE2LjQtMjQuNi0yNC4yLTM4Yy03LjYtMTMuMS0xNC41LTI2LjQtMjAuOC0zOS44DQoJCWM2LjItMTMuNCwxMy4yLTI2LjgsMjAuNy0zOS45YzcuOC0xMy41LDE1LjgtMjYuMywyNC4xLTM4LjJjMTQuOS0xLjMsMzAtMiw0NS4yLTJjMTUuMSwwLDMwLjIsMC43LDQ1LDEuOQ0KCQljOC4zLDExLjksMTYuNCwyNC42LDI0LjIsMzhjNy42LDEzLjEsMTQuNSwyNi40LDIwLjgsMzkuOEM1MDQuNywzMDkuOCw0OTcuOCwzMjMuMiw0OTAuMywzMzYuM3ogTTUyMi42LDMyMy4zDQoJCWM1LjQsMTMuNCwxMCwyNi44LDEzLjgsMzkuOGMtMTMuMSwzLjItMjYuOSw1LjktNDEuMiw4YzQuOS03LjcsOS44LTE1LjYsMTQuNC0yMy43QzUxNC4yLDMzOS40LDUxOC41LDMzMS4zLDUyMi42LDMyMy4zeg0KCQkgTTQyMS4yLDQzMGMtOS4zLTkuNi0xOC42LTIwLjMtMjcuOC0zMmM5LDAuNCwxOC4yLDAuNywyNy41LDAuN2M5LjQsMCwxOC43LTAuMiwyNy44LTAuN0M0MzkuNyw0MDkuNyw0MzAuNCw0MjAuNCw0MjEuMiw0MzB6DQoJCSBNMzQ2LjgsMzcxLjFjLTE0LjItMi4xLTI3LjktNC43LTQxLTcuOWMzLjctMTIuOSw4LjMtMjYuMiwxMy41LTM5LjVjNC4xLDgsOC40LDE2LDEzLjEsMjRDMzM3LjEsMzU1LjcsMzQxLjksMzYzLjUsMzQ2LjgsMzcxLjF6DQoJCSBNNDIwLjcsMTYzYzkuMyw5LjYsMTguNiwyMC4zLDI3LjgsMzJjLTktMC40LTE4LjItMC43LTI3LjUtMC43Yy05LjQsMC0xOC43LDAuMi0yNy44LDAuN0M0MDIuMiwxODMuMyw0MTEuNSwxNzIuNiw0MjAuNywxNjN6DQoJCSBNMzQ2LjcsMjIxLjljLTQuOSw3LjctOS44LDE1LjYtMTQuNCwyMy43Yy00LjYsOC04LjksMTYtMTMsMjRjLTUuNC0xMy40LTEwLTI2LjgtMTMuOC0zOS44QzMxOC42LDIyNi43LDMzMi40LDIyNCwzNDYuNywyMjEuOXoNCgkJIE0yNTYuMiwzNDcuMWMtMzUuNC0xNS4xLTU4LjMtMzQuOS01OC4zLTUwLjZjMC0xNS43LDIyLjktMzUuNiw1OC4zLTUwLjZjOC42LTMuNywxOC03LDI3LjctMTAuMWM1LjcsMTkuNiwxMy4yLDQwLDIyLjUsNjAuOQ0KCQljLTkuMiwyMC44LTE2LjYsNDEuMS0yMi4yLDYwLjZDMjc0LjMsMzU0LjIsMjY0LjksMzUwLjgsMjU2LjIsMzQ3LjF6IE0zMTAsNDkwYy0xMy42LTcuOC0xOS41LTM3LjUtMTQuOS03NS43DQoJCWMxLjEtOS40LDIuOS0xOS4zLDUuMS0yOS40YzE5LjYsNC44LDQxLDguNSw2My41LDEwLjljMTMuNSwxOC41LDI3LjUsMzUuMyw0MS42LDUwYy0zMi42LDMwLjMtNjMuMiw0Ni45LTg0LDQ2LjkNCgkJQzMxNi44LDQ5Mi42LDMxMyw0OTEuNywzMTAsNDkweiBNNTQ3LjIsNDEzLjhjNC43LDM4LjItMS4xLDY3LjktMTQuNiw3NS44Yy0zLDEuOC02LjksMi42LTExLjUsMi42Yy0yMC43LDAtNTEuNC0xNi41LTg0LTQ2LjYNCgkJYzE0LTE0LjcsMjgtMzEuNCw0MS4zLTQ5LjljMjIuNi0yLjQsNDQtNi4xLDYzLjYtMTFDNTQ0LjMsMzk0LjgsNTQ2LjEsNDA0LjUsNTQ3LjIsNDEzLjh6IE01ODUuNywzNDcuMWMtOC42LDMuNy0xOCw3LTI3LjcsMTAuMQ0KCQljLTUuNy0xOS42LTEzLjItNDAtMjIuNS02MC45YzkuMi0yMC44LDE2LjYtNDEuMSwyMi4yLTYwLjZjOS45LDMuMSwxOS4zLDYuNSwyOC4xLDEwLjJjMzUuNCwxNS4xLDU4LjMsMzQuOSw1OC4zLDUwLjYNCgkJQzY0NCwzMTIuMiw2MjEuMSwzMzIuMSw1ODUuNywzNDcuMXoiLz4NCgk8cG9seWdvbiBmaWxsPSIjNjFEQUZCIiBwb2ludHM9IjMyMC44LDc4LjQgMzIwLjgsNzguNCAzMjAuOCw3OC40IAkiLz4NCgk8Y2lyY2xlIGZpbGw9IiM2MURBRkIiIGN4PSI0MjAuOSIgY3k9IjI5Ni41IiByPSI0NS43Ii8+DQoJPHBvbHlnb24gZmlsbD0iIzYxREFGQiIgcG9pbnRzPSI1MjAuNSw3OC4xIDUyMC41LDc4LjEgNTIwLjUsNzguMSAJIi8+DQo8L2c+DQo8L3N2Zz4NCg=="
                      title="Company"
                      hasError
                      submitHandler={submitter}
                      footer={(
                        <a href="http://example.com">link</a>
                      )}
                    />
                  </LayoutCenter>
                </TranslationProvider>
              )}
            />
            <Documentation
              name="Component with translations passed through props"
              component={(
                <LayoutCenter>
                  <Login
                    logoUrl="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzJfMV8iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgODQxLjkgNTk1LjMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDg0MS45IDU5NS4zIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM2MURBRkIiIGQ9Ik02NjYuMywyOTYuNWMwLTMyLjUtNDAuNy02My4zLTEwMy4xLTgyLjRjMTQuNC02My42LDgtMTE0LjItMjAuMi0xMzAuNGMtNi41LTMuOC0xNC4xLTUuNi0yMi40LTUuNnYyMi4zDQoJCWM0LjYsMCw4LjMsMC45LDExLjQsMi42YzEzLjYsNy44LDE5LjUsMzcuNSwxNC45LDc1LjdjLTEuMSw5LjQtMi45LDE5LjMtNS4xLDI5LjRjLTE5LjYtNC44LTQxLTguNS02My41LTEwLjkNCgkJYy0xMy41LTE4LjUtMjcuNS0zNS4zLTQxLjYtNTBjMzIuNi0zMC4zLDYzLjItNDYuOSw4NC00Ni45bDAtMjIuM2MwLDAsMCwwLDAsMGMtMjcuNSwwLTYzLjUsMTkuNi05OS45LDUzLjYNCgkJYy0zNi40LTMzLjgtNzIuNC01My4yLTk5LjktNTMuMnYyMi4zYzIwLjcsMCw1MS40LDE2LjUsODQsNDYuNmMtMTQsMTQuNy0yOCwzMS40LTQxLjMsNDkuOWMtMjIuNiwyLjQtNDQsNi4xLTYzLjYsMTENCgkJYy0yLjMtMTAtNC0xOS43LTUuMi0yOWMtNC43LTM4LjIsMS4xLTY3LjksMTQuNi03NS44YzMtMS44LDYuOS0yLjYsMTEuNS0yLjZsMC0yMi4zYzAsMCwwLDAsMCwwYy04LjQsMC0xNiwxLjgtMjIuNiw1LjYNCgkJYy0yOC4xLDE2LjItMzQuNCw2Ni43LTE5LjksMTMwLjFjLTYyLjIsMTkuMi0xMDIuNyw0OS45LTEwMi43LDgyLjNjMCwzMi41LDQwLjcsNjMuMywxMDMuMSw4Mi40Yy0xNC40LDYzLjYtOCwxMTQuMiwyMC4yLDEzMC40DQoJCWM2LjUsMy44LDE0LjEsNS42LDIyLjUsNS42YzI3LjUsMCw2My41LTE5LjYsOTkuOS01My42YzM2LjQsMzMuOCw3Mi40LDUzLjIsOTkuOSw1My4yYzguNCwwLDE2LTEuOCwyMi42LTUuNg0KCQljMjguMS0xNi4yLDM0LjQtNjYuNywxOS45LTEzMC4xQzYyNS44LDM1OS43LDY2Ni4zLDMyOC45LDY2Ni4zLDI5Ni41eiBNNTM2LjEsMjI5LjhjLTMuNywxMi45LTguMywyNi4yLTEzLjUsMzkuNQ0KCQljLTQuMS04LTguNC0xNi0xMy4xLTI0Yy00LjYtOC05LjUtMTUuOC0xNC40LTIzLjRDNTA5LjMsMjI0LDUyMywyMjYuNiw1MzYuMSwyMjkuOHogTTQ5MC4zLDMzNi4zYy03LjgsMTMuNS0xNS44LDI2LjMtMjQuMSwzOC4yDQoJCWMtMTQuOSwxLjMtMzAsMi00NS4yLDJjLTE1LjEsMC0zMC4yLTAuNy00NS0xLjljLTguMy0xMS45LTE2LjQtMjQuNi0yNC4yLTM4Yy03LjYtMTMuMS0xNC41LTI2LjQtMjAuOC0zOS44DQoJCWM2LjItMTMuNCwxMy4yLTI2LjgsMjAuNy0zOS45YzcuOC0xMy41LDE1LjgtMjYuMywyNC4xLTM4LjJjMTQuOS0xLjMsMzAtMiw0NS4yLTJjMTUuMSwwLDMwLjIsMC43LDQ1LDEuOQ0KCQljOC4zLDExLjksMTYuNCwyNC42LDI0LjIsMzhjNy42LDEzLjEsMTQuNSwyNi40LDIwLjgsMzkuOEM1MDQuNywzMDkuOCw0OTcuOCwzMjMuMiw0OTAuMywzMzYuM3ogTTUyMi42LDMyMy4zDQoJCWM1LjQsMTMuNCwxMCwyNi44LDEzLjgsMzkuOGMtMTMuMSwzLjItMjYuOSw1LjktNDEuMiw4YzQuOS03LjcsOS44LTE1LjYsMTQuNC0yMy43QzUxNC4yLDMzOS40LDUxOC41LDMzMS4zLDUyMi42LDMyMy4zeg0KCQkgTTQyMS4yLDQzMGMtOS4zLTkuNi0xOC42LTIwLjMtMjcuOC0zMmM5LDAuNCwxOC4yLDAuNywyNy41LDAuN2M5LjQsMCwxOC43LTAuMiwyNy44LTAuN0M0MzkuNyw0MDkuNyw0MzAuNCw0MjAuNCw0MjEuMiw0MzB6DQoJCSBNMzQ2LjgsMzcxLjFjLTE0LjItMi4xLTI3LjktNC43LTQxLTcuOWMzLjctMTIuOSw4LjMtMjYuMiwxMy41LTM5LjVjNC4xLDgsOC40LDE2LDEzLjEsMjRDMzM3LjEsMzU1LjcsMzQxLjksMzYzLjUsMzQ2LjgsMzcxLjF6DQoJCSBNNDIwLjcsMTYzYzkuMyw5LjYsMTguNiwyMC4zLDI3LjgsMzJjLTktMC40LTE4LjItMC43LTI3LjUtMC43Yy05LjQsMC0xOC43LDAuMi0yNy44LDAuN0M0MDIuMiwxODMuMyw0MTEuNSwxNzIuNiw0MjAuNywxNjN6DQoJCSBNMzQ2LjcsMjIxLjljLTQuOSw3LjctOS44LDE1LjYtMTQuNCwyMy43Yy00LjYsOC04LjksMTYtMTMsMjRjLTUuNC0xMy40LTEwLTI2LjgtMTMuOC0zOS44QzMxOC42LDIyNi43LDMzMi40LDIyNCwzNDYuNywyMjEuOXoNCgkJIE0yNTYuMiwzNDcuMWMtMzUuNC0xNS4xLTU4LjMtMzQuOS01OC4zLTUwLjZjMC0xNS43LDIyLjktMzUuNiw1OC4zLTUwLjZjOC42LTMuNywxOC03LDI3LjctMTAuMWM1LjcsMTkuNiwxMy4yLDQwLDIyLjUsNjAuOQ0KCQljLTkuMiwyMC44LTE2LjYsNDEuMS0yMi4yLDYwLjZDMjc0LjMsMzU0LjIsMjY0LjksMzUwLjgsMjU2LjIsMzQ3LjF6IE0zMTAsNDkwYy0xMy42LTcuOC0xOS41LTM3LjUtMTQuOS03NS43DQoJCWMxLjEtOS40LDIuOS0xOS4zLDUuMS0yOS40YzE5LjYsNC44LDQxLDguNSw2My41LDEwLjljMTMuNSwxOC41LDI3LjUsMzUuMyw0MS42LDUwYy0zMi42LDMwLjMtNjMuMiw0Ni45LTg0LDQ2LjkNCgkJQzMxNi44LDQ5Mi42LDMxMyw0OTEuNywzMTAsNDkweiBNNTQ3LjIsNDEzLjhjNC43LDM4LjItMS4xLDY3LjktMTQuNiw3NS44Yy0zLDEuOC02LjksMi42LTExLjUsMi42Yy0yMC43LDAtNTEuNC0xNi41LTg0LTQ2LjYNCgkJYzE0LTE0LjcsMjgtMzEuNCw0MS4zLTQ5LjljMjIuNi0yLjQsNDQtNi4xLDYzLjYtMTFDNTQ0LjMsMzk0LjgsNTQ2LjEsNDA0LjUsNTQ3LjIsNDEzLjh6IE01ODUuNywzNDcuMWMtOC42LDMuNy0xOCw3LTI3LjcsMTAuMQ0KCQljLTUuNy0xOS42LTEzLjItNDAtMjIuNS02MC45YzkuMi0yMC44LDE2LjYtNDEuMSwyMi4yLTYwLjZjOS45LDMuMSwxOS4zLDYuNSwyOC4xLDEwLjJjMzUuNCwxNS4xLDU4LjMsMzQuOSw1OC4zLDUwLjYNCgkJQzY0NCwzMTIuMiw2MjEuMSwzMzIuMSw1ODUuNywzNDcuMXoiLz4NCgk8cG9seWdvbiBmaWxsPSIjNjFEQUZCIiBwb2ludHM9IjMyMC44LDc4LjQgMzIwLjgsNzguNCAzMjAuOCw3OC40IAkiLz4NCgk8Y2lyY2xlIGZpbGw9IiM2MURBRkIiIGN4PSI0MjAuOSIgY3k9IjI5Ni41IiByPSI0NS43Ii8+DQoJPHBvbHlnb24gZmlsbD0iIzYxREFGQiIgcG9pbnRzPSI1MjAuNSw3OC4xIDUyMC41LDc4LjEgNTIwLjUsNzguMSAJIi8+DQo8L2c+DQo8L3N2Zz4NCg=="
                    title="Company"
                    hasError
                    submitHandler={submitter}
                    footer={(
                      <a href="http://example.com">link</a>
                    )}
                    translations={{
                      email: 'E-mail',
                      invalidUsernameOrPassword: 'Nesprávný e-mail nebo heslo',
                      password: 'Heslo',
                      signIn: 'Přihlásit se',
                    }}
                  />
                </LayoutCenter>
              )}
            />
            <Documentation
              name="Component with translations passed through TranslationProvider and overwritten with props"
              component={(
                <TranslationProvider
                  translations={{
                    Login: {
                      email: 'E-mail',
                      invalidUsernameOrPassword: 'Invalid username or password',
                      password: 'Password',
                      signIn: 'Sign in',
                    },
                  }}
                >
                  <LayoutCenter>
                    <Login
                      logoUrl="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzJfMV8iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgODQxLjkgNTk1LjMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDg0MS45IDU5NS4zIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM2MURBRkIiIGQ9Ik02NjYuMywyOTYuNWMwLTMyLjUtNDAuNy02My4zLTEwMy4xLTgyLjRjMTQuNC02My42LDgtMTE0LjItMjAuMi0xMzAuNGMtNi41LTMuOC0xNC4xLTUuNi0yMi40LTUuNnYyMi4zDQoJCWM0LjYsMCw4LjMsMC45LDExLjQsMi42YzEzLjYsNy44LDE5LjUsMzcuNSwxNC45LDc1LjdjLTEuMSw5LjQtMi45LDE5LjMtNS4xLDI5LjRjLTE5LjYtNC44LTQxLTguNS02My41LTEwLjkNCgkJYy0xMy41LTE4LjUtMjcuNS0zNS4zLTQxLjYtNTBjMzIuNi0zMC4zLDYzLjItNDYuOSw4NC00Ni45bDAtMjIuM2MwLDAsMCwwLDAsMGMtMjcuNSwwLTYzLjUsMTkuNi05OS45LDUzLjYNCgkJYy0zNi40LTMzLjgtNzIuNC01My4yLTk5LjktNTMuMnYyMi4zYzIwLjcsMCw1MS40LDE2LjUsODQsNDYuNmMtMTQsMTQuNy0yOCwzMS40LTQxLjMsNDkuOWMtMjIuNiwyLjQtNDQsNi4xLTYzLjYsMTENCgkJYy0yLjMtMTAtNC0xOS43LTUuMi0yOWMtNC43LTM4LjIsMS4xLTY3LjksMTQuNi03NS44YzMtMS44LDYuOS0yLjYsMTEuNS0yLjZsMC0yMi4zYzAsMCwwLDAsMCwwYy04LjQsMC0xNiwxLjgtMjIuNiw1LjYNCgkJYy0yOC4xLDE2LjItMzQuNCw2Ni43LTE5LjksMTMwLjFjLTYyLjIsMTkuMi0xMDIuNyw0OS45LTEwMi43LDgyLjNjMCwzMi41LDQwLjcsNjMuMywxMDMuMSw4Mi40Yy0xNC40LDYzLjYtOCwxMTQuMiwyMC4yLDEzMC40DQoJCWM2LjUsMy44LDE0LjEsNS42LDIyLjUsNS42YzI3LjUsMCw2My41LTE5LjYsOTkuOS01My42YzM2LjQsMzMuOCw3Mi40LDUzLjIsOTkuOSw1My4yYzguNCwwLDE2LTEuOCwyMi42LTUuNg0KCQljMjguMS0xNi4yLDM0LjQtNjYuNywxOS45LTEzMC4xQzYyNS44LDM1OS43LDY2Ni4zLDMyOC45LDY2Ni4zLDI5Ni41eiBNNTM2LjEsMjI5LjhjLTMuNywxMi45LTguMywyNi4yLTEzLjUsMzkuNQ0KCQljLTQuMS04LTguNC0xNi0xMy4xLTI0Yy00LjYtOC05LjUtMTUuOC0xNC40LTIzLjRDNTA5LjMsMjI0LDUyMywyMjYuNiw1MzYuMSwyMjkuOHogTTQ5MC4zLDMzNi4zYy03LjgsMTMuNS0xNS44LDI2LjMtMjQuMSwzOC4yDQoJCWMtMTQuOSwxLjMtMzAsMi00NS4yLDJjLTE1LjEsMC0zMC4yLTAuNy00NS0xLjljLTguMy0xMS45LTE2LjQtMjQuNi0yNC4yLTM4Yy03LjYtMTMuMS0xNC41LTI2LjQtMjAuOC0zOS44DQoJCWM2LjItMTMuNCwxMy4yLTI2LjgsMjAuNy0zOS45YzcuOC0xMy41LDE1LjgtMjYuMywyNC4xLTM4LjJjMTQuOS0xLjMsMzAtMiw0NS4yLTJjMTUuMSwwLDMwLjIsMC43LDQ1LDEuOQ0KCQljOC4zLDExLjksMTYuNCwyNC42LDI0LjIsMzhjNy42LDEzLjEsMTQuNSwyNi40LDIwLjgsMzkuOEM1MDQuNywzMDkuOCw0OTcuOCwzMjMuMiw0OTAuMywzMzYuM3ogTTUyMi42LDMyMy4zDQoJCWM1LjQsMTMuNCwxMCwyNi44LDEzLjgsMzkuOGMtMTMuMSwzLjItMjYuOSw1LjktNDEuMiw4YzQuOS03LjcsOS44LTE1LjYsMTQuNC0yMy43QzUxNC4yLDMzOS40LDUxOC41LDMzMS4zLDUyMi42LDMyMy4zeg0KCQkgTTQyMS4yLDQzMGMtOS4zLTkuNi0xOC42LTIwLjMtMjcuOC0zMmM5LDAuNCwxOC4yLDAuNywyNy41LDAuN2M5LjQsMCwxOC43LTAuMiwyNy44LTAuN0M0MzkuNyw0MDkuNyw0MzAuNCw0MjAuNCw0MjEuMiw0MzB6DQoJCSBNMzQ2LjgsMzcxLjFjLTE0LjItMi4xLTI3LjktNC43LTQxLTcuOWMzLjctMTIuOSw4LjMtMjYuMiwxMy41LTM5LjVjNC4xLDgsOC40LDE2LDEzLjEsMjRDMzM3LjEsMzU1LjcsMzQxLjksMzYzLjUsMzQ2LjgsMzcxLjF6DQoJCSBNNDIwLjcsMTYzYzkuMyw5LjYsMTguNiwyMC4zLDI3LjgsMzJjLTktMC40LTE4LjItMC43LTI3LjUtMC43Yy05LjQsMC0xOC43LDAuMi0yNy44LDAuN0M0MDIuMiwxODMuMyw0MTEuNSwxNzIuNiw0MjAuNywxNjN6DQoJCSBNMzQ2LjcsMjIxLjljLTQuOSw3LjctOS44LDE1LjYtMTQuNCwyMy43Yy00LjYsOC04LjksMTYtMTMsMjRjLTUuNC0xMy40LTEwLTI2LjgtMTMuOC0zOS44QzMxOC42LDIyNi43LDMzMi40LDIyNCwzNDYuNywyMjEuOXoNCgkJIE0yNTYuMiwzNDcuMWMtMzUuNC0xNS4xLTU4LjMtMzQuOS01OC4zLTUwLjZjMC0xNS43LDIyLjktMzUuNiw1OC4zLTUwLjZjOC42LTMuNywxOC03LDI3LjctMTAuMWM1LjcsMTkuNiwxMy4yLDQwLDIyLjUsNjAuOQ0KCQljLTkuMiwyMC44LTE2LjYsNDEuMS0yMi4yLDYwLjZDMjc0LjMsMzU0LjIsMjY0LjksMzUwLjgsMjU2LjIsMzQ3LjF6IE0zMTAsNDkwYy0xMy42LTcuOC0xOS41LTM3LjUtMTQuOS03NS43DQoJCWMxLjEtOS40LDIuOS0xOS4zLDUuMS0yOS40YzE5LjYsNC44LDQxLDguNSw2My41LDEwLjljMTMuNSwxOC41LDI3LjUsMzUuMyw0MS42LDUwYy0zMi42LDMwLjMtNjMuMiw0Ni45LTg0LDQ2LjkNCgkJQzMxNi44LDQ5Mi42LDMxMyw0OTEuNywzMTAsNDkweiBNNTQ3LjIsNDEzLjhjNC43LDM4LjItMS4xLDY3LjktMTQuNiw3NS44Yy0zLDEuOC02LjksMi42LTExLjUsMi42Yy0yMC43LDAtNTEuNC0xNi41LTg0LTQ2LjYNCgkJYzE0LTE0LjcsMjgtMzEuNCw0MS4zLTQ5LjljMjIuNi0yLjQsNDQtNi4xLDYzLjYtMTFDNTQ0LjMsMzk0LjgsNTQ2LjEsNDA0LjUsNTQ3LjIsNDEzLjh6IE01ODUuNywzNDcuMWMtOC42LDMuNy0xOCw3LTI3LjcsMTAuMQ0KCQljLTUuNy0xOS42LTEzLjItNDAtMjIuNS02MC45YzkuMi0yMC44LDE2LjYtNDEuMSwyMi4yLTYwLjZjOS45LDMuMSwxOS4zLDYuNSwyOC4xLDEwLjJjMzUuNCwxNS4xLDU4LjMsMzQuOSw1OC4zLDUwLjYNCgkJQzY0NCwzMTIuMiw2MjEuMSwzMzIuMSw1ODUuNywzNDcuMXoiLz4NCgk8cG9seWdvbiBmaWxsPSIjNjFEQUZCIiBwb2ludHM9IjMyMC44LDc4LjQgMzIwLjgsNzguNCAzMjAuOCw3OC40IAkiLz4NCgk8Y2lyY2xlIGZpbGw9IiM2MURBRkIiIGN4PSI0MjAuOSIgY3k9IjI5Ni41IiByPSI0NS43Ii8+DQoJPHBvbHlnb24gZmlsbD0iIzYxREFGQiIgcG9pbnRzPSI1MjAuNSw3OC4xIDUyMC41LDc4LjEgNTIwLjUsNzguMSAJIi8+DQo8L2c+DQo8L3N2Zz4NCg=="
                      title="Company"
                      hasError
                      submitHandler={submitter}
                      footer={(
                        <a href="http://example.com">link</a>
                      )}
                      translations={{
                        email: 'E-mail',
                        invalidUsernameOrPassword: 'Nesprávný e-mail nebo heslo',
                        password: 'Heslo',
                        signIn: 'Přihlásit se',
                      }}
                    />
                  </LayoutCenter>
                </TranslationProvider>
              )}
            />
          </section>
        </DocumentationLayoutContent>
      </DocumentationLayout>
    );
  }
}

export default DemoContainer;
