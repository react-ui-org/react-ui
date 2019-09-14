import React from 'react';

// React UI CSS theme and foundation
import '../../lib/theme.scss';
import '../../lib/foundation.scss';

// React UI components
import {
  Alert,
  Button,
  Card,
  CheckboxField,
  Documentation,
  DocumentationLayout,
  DocumentationLayoutContent,
  DocumentationLayoutSidebar,
  DocumentationNavigation,
  DocumentationPlaceholder,
  DocumentationSwatch,
  ForgotPassword,
  Icon,
  LayoutCenter,
  List,
  ListItem,
  Login,
  Media,
  MediaBody,
  MediaObject,
  Modal,
  MultipleSelectField,
  NewPassword,
  Radio,
  Row,
  RowLeft,
  RowRight,
  SelectField,
  Table,
  TextField,
  TextArea,
  Toggle,
} from '../../lib';

// React UI utility CSS classes
import '../../lib/utilities.scss';

import navigationTree from './navigation';

const logger = (event) => console.log(event.target.value); // eslint-disable-line no-console
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
          <section id="foundation" className="mb-7">
            <h2 className="typography-size-5 mb-6">Foundation</h2>
            <h3 id="foundation-colors" className="typography-size-4 mb-6">Colors</h3>
            <div className="mb-7">
              <h4 className="typography-size-3">Theme Colors</h4>
              <div className="mb-5">
                <div>
                  <DocumentationSwatch color="primary" />
                  <DocumentationSwatch color="primary-dark" />
                  <DocumentationSwatch color="primary-darker" />
                  <DocumentationSwatch color="primary-light" />
                  <DocumentationSwatch color="on-primary" />
                </div>
                <div>
                  <DocumentationSwatch color="secondary" />
                  <DocumentationSwatch color="secondary-dark" />
                  <DocumentationSwatch color="secondary-darker" />
                  <DocumentationSwatch color="secondary-light" />
                  <DocumentationSwatch color="on-secondary" />
                </div>
              </div>
              <h4 className="typography-size-3">UI Colors</h4>
              <div className="mb-5">
                <div>
                  <DocumentationSwatch color="success" />
                  <DocumentationSwatch color="success-dark" />
                  <DocumentationSwatch color="success-darker" />
                  <DocumentationSwatch color="success-light" />
                  <DocumentationSwatch color="on-success" />
                </div>
                <div>
                  <DocumentationSwatch color="warning" />
                  <DocumentationSwatch color="warning-dark" />
                  <DocumentationSwatch color="warning-darker" />
                  <DocumentationSwatch color="warning-light" />
                  <DocumentationSwatch color="on-warning" />
                </div>
                <div>
                  <DocumentationSwatch color="error" />
                  <DocumentationSwatch color="error-dark" />
                  <DocumentationSwatch color="error-darker" />
                  <DocumentationSwatch color="error-light" />
                  <DocumentationSwatch color="on-error" />
                </div>
                <div>
                  <DocumentationSwatch color="help" />
                  <DocumentationSwatch color="help-dark" />
                  <DocumentationSwatch color="help-darker" />
                  <DocumentationSwatch color="help-light" />
                  <DocumentationSwatch color="on-help" />
                </div>
                <div>
                  <DocumentationSwatch color="info" />
                  <DocumentationSwatch color="info-dark" />
                  <DocumentationSwatch color="info-darker" />
                  <DocumentationSwatch color="info-light" />
                  <DocumentationSwatch color="on-info" />
                </div>
                <div>
                  <DocumentationSwatch color="note" />
                  <DocumentationSwatch color="note-dark" />
                  <DocumentationSwatch color="note-darker" />
                  <DocumentationSwatch color="note-light" />
                  <DocumentationSwatch color="on-note" />
                </div>
              </div>
              <h4 className="typography-size-3">Grays</h4>
              <div className="mb-5">
                <DocumentationSwatch color="white" />
                <DocumentationSwatch color="black" />
              </div>
              <div className="mb-5">
                <DocumentationSwatch color="gray-50" />
                <DocumentationSwatch color="gray-100" />
                <DocumentationSwatch color="gray-200" />
                <DocumentationSwatch color="gray-300" />
                <DocumentationSwatch color="gray-400" />
                <DocumentationSwatch color="gray-500" />
                <DocumentationSwatch color="gray-600" />
                <DocumentationSwatch color="gray-700" />
                <DocumentationSwatch color="gray-800" />
                <DocumentationSwatch color="gray-900" />
              </div>
            </div>
            <h3 id="foundation-typography" className="typography-size-4 mb-6">Typography</h3>
            <p>
              React UI uses
              {' '}
              <a
                href="https://fonts.google.com/specimen/Titillium+Web"
                target="_blank"
                rel="noopener noreferrer"
              >
                Titillium Web
              </a>
              {' '}
              type face.
            </p>
            <Documentation
              name="Typography showcase"
              component={(
                <div>
                  <p>
                    Curabitur sagittis hendrerit ante. Integer pellentesque quam vel velit. Sed vel
                    lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem.
                    Pellentesque sapien. Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    Maecenas sollicitudin. Phasellus faucibus molestie nisl. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                    laborum. Phasellus et lorem id felis nonummy placerat.
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
                    <code>Inline code</code>
                  </p>
                  <p>
                    <a href="#top">Link</a>
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
                  <h4 className="typography-size-0">Font size 0</h4>
                  <h4 className="typography-size-1">Font size 1</h4>
                  <h4 className="typography-size-2">Font size 2</h4>
                  <h4 className="typography-size-3">Font size 3</h4>
                  <h4 className="typography-size-4">Font size 4</h4>
                  <h4 className="typography-size-5">Font size 5</h4>
                </div>
              )}
            />
            <h3 id="foundation-icons" className="typography-size-4 mb-6">Icons</h3>
            <div className="mb-7">
              <p>
                React UI uses
                {' '}
                <a href="https://material.io/resources/icons/" target="_blank" rel="noopener noreferrer">
                  Material Design icons
                </a>.
              </p>
            </div>
            <h3 id="foundation-spacing" className="typography-size-4 mb-6">Spacing</h3>
            <p>
              Available spacing values (px values account with 16 px base font size):
            </p>
            <ul className="mb-7">
              <li><code>0:</code> 0 em / 0 px</li>
              <li><code>1:</code> 0.25 em / 4 px</li>
              <li><code>2:</code> 0.5 em / 8 px</li>
              <li><code>3:</code> 0.75 em / 12 px</li>
              <li><code>4:</code> 1 em / 16 px</li>
              <li><code>5:</code> 1.5 em / 24 px</li>
              <li><code>6:</code> 2 em / 32 px</li>
              <li><code>7:</code> 3 em / 48 px</li>
            </ul>
            <h3 id="foundation-breakpoints" className="typography-size-4 mb-6">Breakpoints</h3>
            <p>
              Available breakpoints (px values account with 16 px base font size):
            </p>
            <ul className="mb-7">
              <li><code>xs:</code> 0 em / 0 px</li>
              <li><code>sm:</code> 36 em / 576 px</li>
              <li><code>md:</code> 48 em / 768 px</li>
              <li><code>lg:</code> 66 em / 1056 px</li>
              <li><code>xl:</code> 84 em / 1344 px</li>
              <li><code>xxl:</code> 90 em / 1440 px</li>
            </ul>
          </section>
          <hr />
          <section id="layout-components" className="mb-7">
            <h2 className="typography-size-5 mb-6">Layout Components</h2>
            <h3 id="layout-components-centered-layout" className="typography-size-4 mb-6">Centered Layout</h3>
            <p>
              Centered layout takes 100 % of viewport height.
            </p>
            <Documentation
              name="Centered Layout"
              component={(
                <LayoutCenter>
                  <DocumentationPlaceholder text="centered content" />
                </LayoutCenter>
              )}
            />
            <h3 id="layout-components-list" className="typography-size-4 mb-6">List</h3>
            <Documentation
              name="Default list"
              component={(
                <List>
                  <ListItem>
                    <DocumentationPlaceholder text="item 1" />
                  </ListItem>
                  <ListItem>
                    <DocumentationPlaceholder text="item 2" />
                  </ListItem>
                  <ListItem>
                    <DocumentationPlaceholder text="item 3" />
                  </ListItem>
                </List>
              )}
            />
            <Documentation
              name="Right-aligned list"
              component={(
                <List align="right">
                  <ListItem>
                    <DocumentationPlaceholder text="item 1" />
                  </ListItem>
                  <ListItem>
                    <DocumentationPlaceholder text="item 2" />
                  </ListItem>
                  <ListItem>
                    <DocumentationPlaceholder text="item 3" />
                  </ListItem>
                </List>
              )}
            />
            <Documentation
              name="Right-aligned list with auto width"
              component={(
                <List align="right" autoWidth>
                  <ListItem>
                    <DocumentationPlaceholder text="item no. 1" />
                  </ListItem>
                  <ListItem>
                    <DocumentationPlaceholder text="longer item, no. 2" />
                  </ListItem>
                  <ListItem>
                    <DocumentationPlaceholder text="the longest item, no. 3" />
                  </ListItem>
                </List>
              )}
            />
            <h3 id="layout-components-media" className="typography-size-4 mb-6">Media</h3>
            <Documentation
              name="Default layout"
              component={(
                <Media>
                  <MediaObject>
                    <DocumentationPlaceholder text="object" />
                  </MediaObject>
                  <MediaBody>
                    <DocumentationPlaceholder text="body" />
                  </MediaBody>
                </Media>
              )}
            />
            <h3 id="layout-components-row" className="typography-size-4 mb-6">Row</h3>
            <Documentation
              name="Default layout"
              component={(
                <Row>
                  <RowLeft>
                    <DocumentationPlaceholder text="left part" />
                  </RowLeft>
                  <RowRight>
                    <DocumentationPlaceholder text="right part" />
                  </RowRight>
                </Row>
              )}
            />
          </section>
          <hr />
          <section id="ui-components" className="mb-7">
            <h2 className="typography-size-5 mb-6">UI Components</h2>
            <h3 id="ui-components-alert" className="typography-size-4 mb-6">Alert</h3>
            <Documentation
              name="Message types"
              component={(
                <div>
                  <Alert type="success">
                    <span>
                      <strong>Success: </strong>
                      Success message
                    </span>
                  </Alert>
                  <Alert type="warning">
                    <span>
                      <strong>Warning: </strong>
                      Warning message
                    </span>
                  </Alert>
                  <Alert type="error">
                    <span>
                      <strong>Error: </strong>
                      Error message
                    </span>
                  </Alert>
                  <Alert type="info">
                    <span>
                      <strong>Info: </strong>
                      Info message
                    </span>
                  </Alert>
                  <Alert type="help">
                    <span>
                      <strong>Help: </strong>
                      Help message
                    </span>
                  </Alert>
                  <Alert>
                    <span>
                      <strong>Note: </strong>
                      Note message
                    </span>
                  </Alert>
                </div>
              )}
            />
            <h3 id="ui-components-card" className="typography-size-4 mb-6">Card</h3>
            <Documentation
              name="Card types"
              component={(
                <div style={{ display: 'flex' }}>
                  <Card>
                    <h4>Flat card</h4>
                    <p>
                      Flat card content <br />
                      and the other one.
                    </p>
                    <Button clickHandler={loggerClick} label="Click" variant="secondary" block />
                  </Card>
                  <Card type="bordered">
                    <h4>Bordered card</h4>
                    <p>
                      Bordered card content <br />
                      and the other one.
                    </p>
                    <Button clickHandler={loggerClick} label="Click" variant="secondary" block />
                  </Card>
                  <Card type="warning">
                    <h4>Warning card</h4>
                    <p>
                      Warning card content <br />
                      and the other one.
                    </p>
                    <Button clickHandler={loggerClick} label="Click" variant="secondary" block />
                  </Card>
                  <Card type="error">
                    <h4>Error card</h4>
                    <p>
                      Error card content <br />
                      and the other one.
                    </p>
                    <Button clickHandler={loggerClick} label="Click" variant="secondary" block />
                  </Card>
                </div>
              )}
            />
            <Documentation
              name="Raised card"
              component={(
                <div>
                  <Card raised>
                    <h4>Raised card</h4>
                    <p>
                      Raised card content <br />
                      and the other one.
                    </p>
                    <Button clickHandler={loggerClick} label="Click" variant="secondary" block />
                  </Card>
                </div>
              )}
            />
            <Documentation
              name="Disabled card"
              component={(
                <div>
                  <Card disabled>
                    <h4>Disabled card</h4>
                    <p>
                      Disabled card content <br />
                      and the other one.
                    </p>
                    <Button clickHandler={loggerClick} label="Click" variant="secondary" block disabled />
                  </Card>
                </div>
              )}
            />
            <h3 id="ui-components-button" className="typography-size-4 mb-6">Button</h3>
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
                  <div className="mb-3">
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
            <h3 id="ui-components-checkbox" className="typography-size-4 mb-6">Checkbox</h3>
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
            <Documentation
              name="Validation states"
              component={(
                <div>
                  <CheckboxField
                    fieldId="checkboxFieldStateValid"
                    label="checked and valid"
                    validationState="valid"
                    checked
                    changeHandler={logger}
                  />
                  <CheckboxField
                    fieldId="checkboxFieldStateValid"
                    label="checked with warning"
                    validationState="warning"
                    checked
                    changeHandler={logger}
                  />
                  <CheckboxField
                    fieldId="checkboxFieldStateValid"
                    label="checked and invalid"
                    validationState="invalid"
                    checked
                    changeHandler={logger}
                  />
                </div>
              )}
            />
            <Documentation
              name="Checkbox label hidden"
              component={(
                <CheckboxField
                  fieldId="checkboxLabelHidden"
                  label="checkbox checked and hidden label"
                  checked
                  changeHandler={logger}
                  isLabelVisible={false}
                />
              )}
            />
            <Documentation
              name="Checkbox label left"
              component={(
                <CheckboxField
                  fieldId="checkboxLabelLeft"
                  label="checkbox checked and label left"
                  checked
                  changeHandler={logger}
                  labelPosition="before"
                />
              )}
            />
            <h3 id="ui-components-icon" className="typography-size-4 mb-6">Icon</h3>
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
            <h3 id="ui-components-modal" className="typography-size-4 mb-6">Modal</h3>
            <Documentation
              name="Modal label"
              component={(
                <>
                  <Button
                    label="Open modal"
                    clickHandler={() => this.setState({ showModal: true })}
                  />
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
                </>
              )}
            />
            <h3 id="ui-components-multiple-selectfield" className="typography-size-4 mb-6">Multiple Select Field</h3>
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
              name="Disabled multiple select field option"
              component={(
                <MultipleSelectField
                  fieldId="multipleSelectFieldDisabledOutline"
                  changeHandler={logger}
                  label="Disabled multiple select field"
                  options={[
                    ...this.exampleOptions,
                    {
                      disabled: true,
                      label: 'Oranges',
                      value: 'oranges',
                    },
                  ]}
                />
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
                  <div className="mb-5">
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
              name="Sizes"
              component={(
                <div>
                  <div className="mb-5">
                    <MultipleSelectField
                      fieldId="multipleSelectFieldSizeOutlineSmall"
                      changeHandler={logger}
                      label="Small"
                      options={this.exampleOptions}
                      size="small"
                    />
                    <MultipleSelectField
                      fieldId="multipleSelectFieldSizeOutlineMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      options={this.exampleOptions}
                      size="medium"
                    />
                    <MultipleSelectField
                      fieldId="multipleSelectFieldSizeOutlineLarge"
                      changeHandler={logger}
                      label="Large"
                      options={this.exampleOptions}
                      size="large"
                    />
                  </div>
                  <div>
                    <MultipleSelectField
                      fieldId="multipleSelectFieldSizeFilledSmall"
                      changeHandler={logger}
                      label="Small"
                      options={this.exampleOptions}
                      size="small"
                      variant="filled"
                    />
                    <MultipleSelectField
                      fieldId="multipleSelectFieldSizeFilledMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      options={this.exampleOptions}
                      size="medium"
                      variant="filled"
                    />
                    <MultipleSelectField
                      fieldId="multipleSelectFieldSizeFilledLarge"
                      changeHandler={logger}
                      label="Large"
                      options={this.exampleOptions}
                      size="large"
                      variant="filled"
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
            <h3 id="ui-components-radio" className="typography-size-4 mb-6">Radio</h3>
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
              name="Validation states"
              component={(
                <div>
                  <Radio
                    changeHandler={logger}
                    fieldId="RadioStateValid"
                    label="Choices valid"
                    options={this.exampleOptions}
                    value="apples"
                    validationState="valid"
                  />
                  <Radio
                    changeHandler={logger}
                    fieldId="RadioStateWarning"
                    label="Choices with warning"
                    options={this.exampleOptions}
                    value="apples"
                    validationState="warning"
                  />
                  <Radio
                    changeHandler={logger}
                    fieldId="RadioStateInvalid"
                    label="Choices invalid"
                    options={this.exampleOptions}
                    value="apples"
                    validationState="invalid"
                  />
                </div>
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
            <h3 id="ui-components-selectfield" className="typography-size-4 mb-6">Select Field</h3>
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
              name="Disabled select field option"
              component={(
                <SelectField
                  fieldId="selectFieldDisabledOutline"
                  changeHandler={logger}
                  label="Disabled select field"
                  options={[
                    ...this.exampleOptions,
                    {
                      disabled: true,
                      label: 'Oranges',
                      value: 'oranges',
                    },
                  ]}
                />
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
              name="Select field with hidden label"
              component={(
                <div>
                  <SelectField
                    fieldId="selectFieldWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Select field with hidden label"
                    helperText="Showing helper text instead"
                    options={this.exampleOptions}
                    isLabelVisible={false}
                  />
                  <SelectField
                    fieldId="selectFieldWithInvisibleLabelFilled"
                    changeHandler={logger}
                    label="Select field with hidden label"
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
                  <div className="mb-5">
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
              name="Sizes"
              component={(
                <div>
                  <div className="mb-5">
                    <SelectField
                      fieldId="selectFieldSizeOutlineSmall"
                      changeHandler={logger}
                      label="Small"
                      options={this.exampleOptions}
                      size="small"
                    />
                    <SelectField
                      fieldId="selectFieldSizeOutlineMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      options={this.exampleOptions}
                      size="medium"
                    />
                    <SelectField
                      fieldId="selectFieldSizeOutlineLarge"
                      changeHandler={logger}
                      label="Large"
                      options={this.exampleOptions}
                      size="large"
                    />
                  </div>
                  <div>
                    <SelectField
                      fieldId="selectFieldSizeFilledSmall"
                      changeHandler={logger}
                      label="Small"
                      options={this.exampleOptions}
                      size="small"
                      variant="filled"
                    />
                    <SelectField
                      fieldId="selectFieldSizeFilledMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      options={this.exampleOptions}
                      size="medium"
                      variant="filled"
                    />
                    <SelectField
                      fieldId="selectFieldSizeFilledLarge"
                      changeHandler={logger}
                      label="Large"
                      options={this.exampleOptions}
                      size="large"
                      variant="filled"
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
                  <div className="mb-3">
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
                  <div className="mb-3">
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
            <h3 id="ui-components-table" className="typography-size-4 mb-6">Table</h3>
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
                      format: (row) => row.dateOfBirth.toLocaleDateString('cz-CZ'),
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
            <h3 id="ui-components-textarea" className="typography-size-4 mb-6">Text Area</h3>
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
              name="Text area with hidden label"
              component={(
                <div>
                  <TextArea
                    fieldId="textAreaWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Text area with hidden label"
                    helperText="Showing placeholder instead"
                    placeholder="Text area with hidden label"
                    isLabelVisible={false}
                  />
                  <TextArea
                    fieldId="textAreaWithInvisibleLabelFilled"
                    changeHandler={logger}
                    label="Text area with hidden label"
                    helperText="Showing placeholder instead"
                    placeholder="Text area with hidden label"
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
                  <div className="mb-5">
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
                      helperText="C'mon, it's so ugly…"
                      validationState="invalid"
                      value="BMW X6"
                    />
                  </div>
                  <div>
                    <TextArea
                      fieldId="textAreaValidationValidFilled"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Ho ho ho, looks good!"
                      validationState="valid"
                      value="BMW M4"
                      variant="filled"
                    />
                    <TextArea
                      fieldId="textAreaValidationWarningFilled"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Isn't it a little too big for you?"
                      validationState="warning"
                      value="BMW X5"
                      variant="filled"
                    />
                    <TextArea
                      fieldId="textAreaValidationInvalidFilled"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="C'mon, it's so ugly…"
                      validationState="invalid"
                      value="BMW X6"
                      variant="filled"
                    />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Sizes"
              component={(
                <div>
                  <div className="mb-5">
                    <TextArea
                      fieldId="textAreaSizeOutlineSmall"
                      changeHandler={logger}
                      label="Small"
                      size="small"
                    />
                    <TextArea
                      fieldId="textAreaSizeOutlineMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      size="medium"
                    />
                    <TextArea
                      fieldId="textAreaSizeOutlineLarge"
                      changeHandler={logger}
                      label="Large"
                      size="large"
                    />
                  </div>
                  <div>
                    <TextArea
                      fieldId="textAreaSizeFilledSmall"
                      changeHandler={logger}
                      label="Small"
                      size="small"
                      variant="filled"
                    />
                    <TextArea
                      fieldId="textAreaSizeFilledMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      size="medium"
                      variant="filled"
                    />
                    <TextArea
                      fieldId="textAreaSizeFilledLarge"
                      changeHandler={logger}
                      label="Large"
                      size="large"
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
                  <div className="mb-3">
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
                  <div className="mb-3">
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
                  <div className="mb-3">
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
                      helperText="Write it down"
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
            <h3 id="ui-components-textfield" className="typography-size-4 mb-6">Text Field</h3>
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
              name="Text field with hidden label"
              component={(
                <div>
                  <TextField
                    fieldId="textFieldWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Text field with hidden label"
                    helperText="Showing placeholder instead"
                    placeholder="Text field with hidden label"
                    isLabelVisible={false}
                  />
                  <TextField
                    fieldId="textFieldWithInvisibleLabelFilled"
                    changeHandler={logger}
                    label="Text field with hidden label"
                    helperText="Showing placeholder instead"
                    placeholder="Text field with hidden label"
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
                  <div className="mb-5">
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
                      helperText="C'mon, this is not your real name."
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
                      helperText="C'mon, this is not your real name."
                      validationState="invalid"
                      value="xx"
                      variant="filled"
                    />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Sizes"
              component={(
                <div>
                  <div className="mb-5">
                    <TextField
                      fieldId="textFieldSizeOutlineSmall"
                      changeHandler={logger}
                      label="Small"
                      size="small"
                    />
                    <TextField
                      fieldId="textFieldSizeOutlineMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      size="medium"
                    />
                    <TextField
                      fieldId="textFieldSizeOutlineLarge"
                      changeHandler={logger}
                      label="Large"
                      size="large"
                    />
                  </div>
                  <div>
                    <TextField
                      fieldId="textFieldSizeFilledSmall"
                      changeHandler={logger}
                      label="Small"
                      size="small"
                      variant="filled"
                    />
                    <TextField
                      fieldId="textFieldSizeFilledMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      size="medium"
                      variant="filled"
                    />
                    <TextField
                      fieldId="textFieldSizeFilledLarge"
                      changeHandler={logger}
                      label="Large"
                      size="large"
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
                    fieldId="textFieldCustomInputSizeOutline"
                    changeHandler={logger}
                    label="Age"
                    inputSize={3}
                  />
                  <TextField
                    fieldId="textFieldCustomInputSizeFilled"
                    changeHandler={logger}
                    label="Age"
                    variant="filled"
                    inputSize={3}
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
                  <div className="mb-3">
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
                  <div className="mb-3">
                    <TextField
                      fieldId="textFieldHorizontalCustomSizeOutline"
                      changeHandler={logger}
                      label="Age"
                      layout="horizontal"
                      inputSize={3}
                    />
                    <TextField
                      fieldId="textFieldHorizontalCustomSizeFilled"
                      changeHandler={logger}
                      label="Age"
                      helperText="How old do you see yourself?"
                      layout="horizontal"
                      variant="filled"
                      inputSize={3}
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      fieldId="textFieldHorizontalFullWidthOutline"
                      changeHandler={logger}
                      helperText="Write it down"
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
            <h3 id="ui-components-toggle" className="typography-size-4 mb-6">Toggle</h3>
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
              name="Checked toggle"
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
              name="Validation states"
              component={(
                <div>
                  <Toggle
                    fieldId="toggledValidationValid"
                    label="Checked and valid"
                    validationState="valid"
                    checked
                    changeHandler={logger}
                  />
                  <Toggle
                    fieldId="toggledValidationWarning"
                    label="Checked with warning"
                    validationState="warning"
                    checked
                    changeHandler={logger}
                  />
                  <Toggle
                    fieldId="toggledValidationInvalid"
                    label="Checked and invalid"
                    validationState="invalid"
                    checked
                    changeHandler={logger}
                  />
                </div>
              )}
            />
            <Documentation
              name="Disabled toggle"
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
            <Documentation
              name="Toggle with hidden label"
              component={(
                <Toggle
                  fieldId="toggledLabelHidden"
                  label="toggle checked and label hidden"
                  checked
                  changeHandler={logger}
                  isLabelVisible={false}
                />
              )}
            />
            <Documentation
              name="Toggle with label on left"
              component={(
                <Toggle
                  fieldId="toggledLabelLeft"
                  label="toggle checked and label left"
                  checked
                  changeHandler={logger}
                  labelPosition="before"
                />
              )}
            />
          </section>
          <hr />
          <section id="screens" className="mb-7">
            <h2 className="typography-size-5 mb-6">Screens</h2>
            <h3 id="screens-login" className="typography-size-4 mb-6">Login Screen</h3>
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
            <h3 id="screens-forgot-password" className="typography-size-4 mb-6">Forgot Password Screen</h3>
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
            <h3 id="screens-new-password" className="typography-size-4 mb-6">New Password Screen</h3>
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
          </section>
          <hr />
          <section id="utilities" className="mb-7">
            <h2 className="typography-size-5 mb-6">Utilities</h2>
            <p>
              Utilities are CSS class names that do just one thing.
            </p>
            <h3 id="utilities-block-alignment" className="typography-size-4 mb-6">Box Alignment</h3>
            <p>
              Class name notation is
              {' '}
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/flex/"
                target="_blank"
                rel="noopener noreferrer"
              >
                inspired by Bootstrap 4
              </a>.
            </p>
            <p>
              The classes are named using the format <code>[alignment]-[value]</code> for
              {' '}
              <code>xs</code> and <code>[alignment]-[breakpoint]-[value]</code> for
              {' '}
              <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and
              {' '}
              <code>xxl</code>.
            </p>
            <p>
              Where <em>alignment</em> is one of:
            </p>
            <ul>
              <li>
                <code>align-items</code>
              </li>
              <li>
                <code>justify-content</code>
              </li>
            </ul>
            <p>
              For <code>align-items</code> the <em>value</em> can be:
            </p>
            <ul>
              <li>
                <code>baseline</code>
              </li>
              <li>
                <code>center</code>
              </li>
              <li>
                <code>flex-start</code>
              </li>
              <li>
                <code>flex-end</code>
              </li>
            </ul>
            <p>
              For <code>justify-content</code> the <em>value</em> can be:
            </p>
            <ul>
              <li>
                <code>start</code>
              </li>
              <li>
                <code>end</code>
              </li>
              <li>
                <code>center</code>
              </li>
              <li>
                <code>space-between</code>
              </li>
            </ul>
            <Documentation
              name="Example class names"
              component={(
                <div>
                  <div className="mb-4">
                    <code>.align-items-baseline</code>
                  </div>
                  <div className="mb-4">
                    <code>.justify-content-center</code>
                  </div>
                  <div className="mb-4">
                    <code>.justify-content-sm-end</code>
                  </div>
                </div>
              )}
            />
            <h3 id="utilities-display" className="typography-size-4 mb-6">Display</h3>
            <p>
              Class name notation is
              {' '}
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/display/"
                target="_blank"
                rel="noopener noreferrer"
              >
                inspired by Bootstrap 4
              </a>.
            </p>
            <p>
              The classes are named using the format <code>d-[value]</code> for
              {' '}
              <code>xs</code> and <code>d-[breakpoint]-[value]</code> for
              {' '}
              <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and
              {' '}
              <code>xxl</code>.
            </p>
            <p>
              Where <em>value</em> is one of:
            </p>
            <ul>
              <li>
                <code>block</code>
              </li>
              <li>
                <code>flex</code>
              </li>
              <li>
                <code>inline</code>
              </li>
              <li>
                <code>inline-flex</code>
              </li>
              <li>
                <code>none</code>
              </li>
            </ul>
            <Documentation
              name="Example class names"
              component={(
                <div>
                  <div className="mb-4">
                    <code>.d-none</code>
                  </div>
                  <div className="mb-4">
                    <code>.d-sm-block</code>
                  </div>
                  <div className="mb-4">
                    <code>.d-md-flex</code>
                  </div>
                </div>
              )}
            />
            <h3 id="utilities-typography" className="typography-size-4 mb-6">Typography</h3>
            <Documentation
              name="Font sizes"
              component={(
                <div>
                  <div className="typography-size-0 mb-4">
                    <code>.typography-size-0</code>
                  </div>
                  <div className="typography-size-1 mb-4">
                    <code>.typography-size-1</code>
                  </div>
                  <div className="typography-size-2 mb-4">
                    <code>.typography-size-2</code>
                  </div>
                  <div className="typography-size-3 mb-4">
                    <code>.typography-size-3</code>
                  </div>
                  <div className="typography-size-4 mb-4">
                    <code>.typography-size-4</code>
                  </div>
                  <div className="typography-size-5 mb-4">
                    <code>.typography-size-5</code>
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Text alignment"
              component={(
                <div>
                  <p className="text-left">
                    <code>.text-left</code>
                    {' '}
                    Left aligned text on all viewport sizes.
                  </p>
                  <p className="text-center">
                    <code>.text-center</code>
                    {' '}
                    Center aligned text on all viewport sizes.
                  </p>
                  <p className="text-right">
                    <code>.text-right</code>
                    {' '}
                    Right aligned text on all viewport sizes.
                  </p>
                  <p className="text-sm-left">
                    <code>.text-sm-left</code>
                    {' '}
                    Left aligned text on viewports sized SM (small) or wider.
                  </p>
                  <p className="text-md-left">
                    <code>.text-md-left</code>
                    {' '}
                    Left aligned text on viewports sized MD (medium) or wider.
                  </p>
                  <p className="text-lg-left">
                    <code>.text-lg-left</code>
                    {' '}
                    Left aligned text on viewports sized LG (large) or wider.
                  </p>
                  <p className="text-xl-left">
                    <code>.text-xl-left</code>
                    {' '}
                    Left aligned text on viewports sized XL (extra-large) or wider.
                  </p>
                  <p className="text-xxl-left">
                    <code>.text-xxl-left</code>
                    {' '}
                    Left aligned text on viewports sized XXL (XX-large) or wider.
                  </p>
                </div>
              )}
            />
            <h3 id="utilities-spacing" className="typography-size-4 mb-6">Spacing</h3>
            <div className="mb-7">
              <p>
                Class name notation is
                {' '}
                <a
                  href="https://getbootstrap.com/docs/4.3/utilities/spacing/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  inspired by Bootstrap 4
                </a>.
              </p>
              <p>
                The classes are named using the format <code>[property][sides]-[size]</code> for
                {' '}
                <code>xs</code> and <code>[property][sides]-[breakpoint]-[size]</code> for
                {' '}
                <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and
                {' '}
                <code>xxl</code>.
              </p>
              <p>
                Where <em>property</em> is one of:
              </p>
              <ul>
                <li>
                  <code>m</code> - for classes that set <code>margin</code>
                </li>
                <li>
                  <code>p</code> - for classes that set <code>padding</code>
                </li>
              </ul>
              <p>
                Where <em>sides</em> is one of:
              </p>
              <ul>
                <li>
                  <code>t</code> - for classes that set <code>margin-top</code> or
                  {' '}
                  <code>padding-top</code>
                </li>
                <li>
                  <code>b</code> - for classes that set <code>margin-bottom</code> or
                  {' '}
                  <code>padding-bottom</code>
                </li>
                <li>
                  <code>l</code> - for classes that set <code>margin-left</code> or
                  {' '}
                  <code>padding-left</code>
                </li>
                <li>
                  <code>r</code> - for classes that set <code>margin-right</code> or
                  {' '}
                  <code>padding-right</code>
                </li>
              </ul>
              <p>
                Where <em>size</em> is one of:
              </p>
              <ul>
                <li><code>0</code></li>
                <li><code>1</code></li>
                <li><code>2</code></li>
                <li><code>3</code></li>
                <li><code>4</code></li>
                <li><code>5</code></li>
                <li><code>6</code></li>
                <li><code>7</code></li>
                <li><code>auto</code> for classes that set the <code>margin</code> to auto</li>
              </ul>
            </div>
            <Documentation
              name="Example of bottom margin (all breakpoints)"
              component={(
                <div>
                  <div className="mb-0">
                    <DocumentationPlaceholder text=".mb-0" />
                  </div>
                  <div className="mb-1">
                    <DocumentationPlaceholder text=".mb-1" />
                  </div>
                  <div className="mb-2">
                    <DocumentationPlaceholder text=".mb-2" />
                  </div>
                  <div className="mb-3">
                    <DocumentationPlaceholder text=".mb-3" />
                  </div>
                  <div className="mb-4">
                    <DocumentationPlaceholder text=".mb-4" />
                  </div>
                  <div className="mb-5">
                    <DocumentationPlaceholder text=".mb-5" />
                  </div>
                  <div className="mb-6">
                    <DocumentationPlaceholder text=".mb-6" />
                  </div>
                  <div className="mb-7">
                    <DocumentationPlaceholder text=".mb-7" />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Example of left padding from SM screen up"
              component={(
                <div>
                  <div className="pl-sm-0">
                    <DocumentationPlaceholder text=".pl-sm-0" />
                  </div>
                  <div className="pl-sm-1">
                    <DocumentationPlaceholder text=".pl-sm-1" />
                  </div>
                  <div className="pl-sm-2">
                    <DocumentationPlaceholder text=".pl-sm-2" />
                  </div>
                  <div className="pl-sm-3">
                    <DocumentationPlaceholder text=".pl-sm-3" />
                  </div>
                  <div className="pl-sm-4">
                    <DocumentationPlaceholder text=".pl-sm-4" />
                  </div>
                  <div className="pl-sm-5">
                    <DocumentationPlaceholder text=".pl-sm-5" />
                  </div>
                  <div className="pl-sm-6">
                    <DocumentationPlaceholder text=".pl-sm-6" />
                  </div>
                  <div className="pl-sm-7">
                    <DocumentationPlaceholder text=".pl-7" />
                  </div>
                </div>
              )}
            />
          </section>
        </DocumentationLayoutContent>
      </DocumentationLayout>
    );
  }
}

export default DemoContainer;
