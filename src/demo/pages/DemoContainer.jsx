import React from 'react';

// React UI CSS theme and foundation
import '../../lib/theme.scss';
import '../../lib/foundation.scss';
import '../../lib/helpers.scss';

// React UI components
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  CTA,
  CTACenter,
  CTAEnd,
  CTAStart,
  CheckboxField,
  FormLayout,
  FormLayoutCustomField,
  Grid,
  List,
  ListItem,
  Media,
  MediaBody,
  MediaObject,
  Modal,
  Radio,
  ScrollView,
  SelectField,
  Table,
  TextField,
  TextArea,
  Toggle,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from '../../lib';

// Demo components
import {
  Documentation,
  Layout,
  LayoutContent,
  LayoutSidebar,
  Navigation,
  Placeholder,
  Icon,
  Swatch,
} from '../components';

// React UI utility CSS classes
import '../../lib/utilities.scss';

import navigationTree from './navigation';

const logger = (event) => console.log(event.target.value); // eslint-disable-line no-console
const loggerClick = () => console.log('click'); // eslint-disable-line no-console

class DemoContainer extends React.Component {
  static generateRandomString() {
    const texts = [
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      'Aenean commodo ligula eget dolor. Aenean massa.',
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
      'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
      'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
    ];

    let text = '';
    const repeatAmount = Math.floor(Math.random() * 9);

    for (let i = 0; i < (repeatAmount + 1); i += 1) {
      text += texts[Math.floor(Math.random() * Math.floor(texts.length - 1))];
    }

    return text;
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollView1: this.constructor.generateRandomString(),
      scrollView1AutoScroll: 'always',
      scrollView2: this.constructor.generateRandomString(),
      scrollView2AutoScroll: 'always',
      showModal: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
      showModal5: false,
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
      <Layout>
        <LayoutSidebar>
          <Navigation items={navigationTree} />
        </LayoutSidebar>
        <LayoutContent>
          <section id="foundation" className="mb-7">
            <h2 className="typography-size-5 mb-6">Foundation</h2>
            <h3 id="foundation-colors" className="typography-size-4 mb-6">Colors</h3>
            <div className="mb-7">
              <h4 className="typography-size-3">Theme Colors</h4>
              <div className="mb-5">
                <div>
                  <Swatch color="primary" />
                  <Swatch color="primary-dark" />
                  <Swatch color="primary-darker" />
                  <Swatch color="primary-light" />
                  <Swatch color="on-primary" />
                </div>
                <div>
                  <Swatch color="secondary" />
                  <Swatch color="secondary-dark" />
                  <Swatch color="secondary-darker" />
                  <Swatch color="secondary-light" />
                  <Swatch color="on-secondary" />
                </div>
              </div>
              <h4 className="typography-size-3">UI Colors</h4>
              <div className="mb-5">
                <div>
                  <Swatch color="success" />
                  <Swatch color="success-dark" />
                  <Swatch color="success-darker" />
                  <Swatch color="success-light" />
                  <Swatch color="on-success" />
                </div>
                <div>
                  <Swatch color="warning" />
                  <Swatch color="warning-dark" />
                  <Swatch color="warning-darker" />
                  <Swatch color="warning-light" />
                  <Swatch color="on-warning" />
                </div>
                <div>
                  <Swatch color="error" />
                  <Swatch color="error-dark" />
                  <Swatch color="error-darker" />
                  <Swatch color="error-light" />
                  <Swatch color="on-error" />
                </div>
                <div>
                  <Swatch color="help" />
                  <Swatch color="help-dark" />
                  <Swatch color="help-darker" />
                  <Swatch color="help-light" />
                  <Swatch color="on-help" />
                </div>
                <div>
                  <Swatch color="info" />
                  <Swatch color="info-dark" />
                  <Swatch color="info-darker" />
                  <Swatch color="info-light" />
                  <Swatch color="on-info" />
                </div>
                <div>
                  <Swatch color="note" />
                  <Swatch color="note-dark" />
                  <Swatch color="note-darker" />
                  <Swatch color="note-light" />
                  <Swatch color="on-note" />
                </div>
              </div>
              <h4 className="typography-size-3">Grays</h4>
              <div className="mb-5">
                <Swatch color="white" />
                <Swatch color="black" />
              </div>
              <div className="mb-5">
                <Swatch color="gray-50" />
                <Swatch color="gray-100" />
                <Swatch color="gray-200" />
                <Swatch color="gray-300" />
                <Swatch color="gray-400" />
                <Swatch color="gray-500" />
                <Swatch color="gray-600" />
                <Swatch color="gray-700" />
                <Swatch color="gray-800" />
                <Swatch color="gray-900" />
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
                    <a href="#foundation">Link</a>
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
            <h3 id="layout-components-center" className="typography-size-4 mb-6">Center</h3>
            <p>
              The Center layout spreads over its parent and aligns the content to center, both
              vertically and horizontally.
            </p>
            <Documentation
              name="Center"
              component={(
                <Center>
                  <Placeholder text="centered content" />
                </Center>
              )}
            />
            <h3 id="layout-components-cta" className="typography-size-4 mb-6">CTA</h3>
            <p>
              CTA layout is designed for a centered CTA and optional secondary actions aligned to
              sides (on large viewports).
            </p>
            <Documentation
              name="CTA layout"
              component={(
                <CTA>
                  <CTAStart>
                    <Placeholder text="secondary start" />
                  </CTAStart>
                  <CTACenter>
                    <Placeholder text="CTA" />
                  </CTACenter>
                  <CTAEnd>
                    <Placeholder text="secondary end" />
                  </CTAEnd>
                </CTA>
              )}
            />
            <Documentation
              name="CTA layout with custom alignment"
              component={(
                <CTA align="middle">
                  <CTAStart>
                    <Placeholder text="secondary start" />
                  </CTAStart>
                  <CTACenter>
                    <Placeholder text="CTA a" />
                    <Placeholder text="CTA b" />
                  </CTACenter>
                  <CTAEnd>
                    <Placeholder text="secondary end" />
                  </CTAEnd>
                </CTA>
              )}
            />
            <Documentation
              name="CTA layout with single secondary action"
              component={(
                <CTA align="middle">
                  <CTACenter>
                    <Placeholder text="CTA" />
                  </CTACenter>
                  <CTAEnd>
                    <Placeholder text="secondary end" />
                  </CTAEnd>
                </CTA>
              )}
            />
            <h3 id="layout-components-form-layout" className="typography-size-4 mb-6">Form Layout</h3>
            <p>
              Vertical Form Layout works similar to List except that List Items are not needed.
              Vertical form field layout is forced.
            </p>
            <Documentation
              name="Vertical Form Layout"
              component={(
                <FormLayout>
                  <>
                    <TextField
                      id="formLayoutVerticalFirstName"
                      changeHandler={logger}
                      label="First Name"
                    />
                    <TextField
                      id="formLayoutVerticalLastName"
                      changeHandler={logger}
                      label="Last Name"
                    />
                  </>
                  <TextField
                    id="formLayoutVerticalEmail"
                    changeHandler={logger}
                    label="Email address"
                    type="email"
                    helperText="Optional"
                  />
                  <>
                    <TextField
                      id="formLayoutVerticalAddress1"
                      changeHandler={logger}
                      label="Address"
                      placeholder="Address line 1"
                    />
                    <TextField
                      id="formLayoutVerticalAddress2"
                      changeHandler={logger}
                      isLabelVisible={false}
                      label="Address 2"
                      placeholder="Address line 2"
                    />
                    <TextField
                      id="formLayoutVerticalZip"
                      changeHandler={logger}
                      helperText="ZIP should be 5 to 6 digits long code."
                      label="ZIP"
                      inputSize={6}
                      validationState="invalid"
                    />
                    <FormLayoutCustomField
                      id="formLayoutVerticalCountry"
                      label="Country"
                    >
                      <span>Czech Republic</span>
                    </FormLayoutCustomField>
                    <CheckboxField
                      id="formLayoutVerticalDelivery"
                      changeHandler={logger}
                      label="This is my delivery address"
                    />
                  </>
                  <SelectField
                    id="formLayoutVerticalFruit"
                    changeHandler={logger}
                    label="Your favourite fruit"
                    options={this.exampleOptions}
                  />
                  <TextArea
                    id="formLayoutVerticalMessage"
                    changeHandler={logger}
                    fullWidth
                    label="Message"
                    rows={3}
                  />
                  <Toggle
                    id="formLayoutVerticalNewsletter"
                    changeHandler={logger}
                    checked
                    description="Only once per week!"
                    label="Receive weekly newsletter"
                    required
                  />
                  <Radio
                    id="formLayoutVerticalFruit2"
                    changeHandler={logger}
                    label="And fruit again!"
                    options={this.exampleOptions}
                    value="apples"
                  />
                </FormLayout>
              )}
            />
            <p>
              Horizontal Form Layout is designed for horizontal form fields.
              It is applied starting from <code>md</code> viewport size onwards.
              Horizontal form field layout is forced.
            </p>
            <Documentation
              name="Horizontal Form Layout"
              component={(
                <FormLayout fieldLayout="horizontal">
                  <>
                    <TextField
                      id="formLayoutHorizontalFirstName"
                      changeHandler={logger}
                      label="First Name"
                    />
                    <TextField
                      id="formLayoutHorizontalLastName"
                      changeHandler={logger}
                      label="Last Name"
                    />
                  </>
                  <TextField
                    id="formLayoutHorizontalEmail"
                    changeHandler={logger}
                    label="Email address"
                    type="email"
                    helperText="Optional"
                  />
                  <>
                    <TextField
                      id="formLayoutHorizontalAddress1"
                      changeHandler={logger}
                      label="Address"
                      placeholder="Address line 1"
                    />
                    <TextField
                      id="formLayoutHorizontalAddress2"
                      changeHandler={logger}
                      isLabelVisible={false}
                      label="Address 2"
                      placeholder="Address line 2"
                    />
                    <TextField
                      id="formLayoutHorizontalZip"
                      changeHandler={logger}
                      helperText="ZIP should be 5 to 6 digits long code."
                      label="ZIP"
                      inputSize={6}
                      validationState="invalid"
                    />
                    <FormLayoutCustomField
                      id="formLayoutHorizontalCountry"
                      label="Country"
                    >
                      <span>Czech Republic</span>
                    </FormLayoutCustomField>
                    <CheckboxField
                      id="formLayoutHorizontalDelivery"
                      changeHandler={logger}
                      label="This is my delivery address"
                    />
                  </>
                  <SelectField
                    id="formLayoutHorizontalFruit"
                    changeHandler={logger}
                    label="Your favourite fruit"
                    options={this.exampleOptions}
                  />
                  <TextArea
                    id="formLayoutHorizontalMessage"
                    changeHandler={logger}
                    fullWidth
                    label="Message"
                    rows={3}
                  />
                  <Toggle
                    id="formLayoutHorizontalNewsletter"
                    changeHandler={logger}
                    checked
                    label="Receive weekly newsletter"
                    required
                    description="Only once per week!"
                  />
                  <Radio
                    id="formLayoutHorizontalFruit2"
                    changeHandler={logger}
                    label="And fruit again!"
                    options={this.exampleOptions}
                    value="apples"
                  />
                </FormLayout>
              )}
            />
            <Documentation
              name="Horizontal Form Layout with Custom Label Width"
              component={(
                <FormLayout
                  fieldLayout="horizontal"
                  labelWidth="15em"
                >
                  <>
                    <TextField
                      id="formLayoutHorizontalCustomFirstName"
                      changeHandler={logger}
                      label="First Name"
                    />
                    <TextField
                      id="formLayoutHorizontalCustomLastName"
                      changeHandler={logger}
                      label="Last Name"
                    />
                  </>
                  <TextField
                    id="formLayoutHorizontalCustomEmail"
                    changeHandler={logger}
                    label="Email address"
                    type="email"
                    helperText="Optional"
                  />
                  <>
                    <TextField
                      id="formLayoutHorizontalCustomAddress1"
                      changeHandler={logger}
                      label="Address"
                      placeholder="Address line 1"
                    />
                    <TextField
                      id="formLayoutHorizontalCustomAddress2"
                      changeHandler={logger}
                      isLabelVisible={false}
                      label="Address 2"
                      placeholder="Address line 2"
                    />
                    <TextField
                      id="formLayoutHorizontalCustomZip"
                      changeHandler={logger}
                      helperText="ZIP should be 5 to 6 digits long code."
                      label="ZIP"
                      inputSize={6}
                      validationState="invalid"
                    />
                    <FormLayoutCustomField
                      id="formLayoutHorizontalCustomCountry"
                      label="Country"
                    >
                      <span>Czech Republic</span>
                    </FormLayoutCustomField>
                    <CheckboxField
                      id="formLayoutHorizontalCustomDelivery"
                      changeHandler={logger}
                      label="This is my delivery address"
                    />
                  </>
                  <SelectField
                    id="formLayoutHorizontalCustomFruit"
                    changeHandler={logger}
                    label="Your favourite fruit"
                    options={this.exampleOptions}
                  />
                  <TextArea
                    id="formLayoutHorizontalCustomMessage"
                    changeHandler={logger}
                    fullWidth
                    label="Message"
                    rows={3}
                  />
                  <Toggle
                    id="formLayoutHorizontalCustomNewsletter"
                    changeHandler={logger}
                    checked
                    label="Receive weekly newsletter"
                    required
                    description="Only once per week!"
                  />
                  <Radio
                    id="formLayoutHorizontalCustomFruit2"
                    changeHandler={logger}
                    label="And fruit again!"
                    options={this.exampleOptions}
                    value="apples"
                  />
                </FormLayout>
              )}
            />
            <Documentation
              name="Horizontal Form Layout with Auto-Width Labels (Firefox only, custom fallback)"
              component={(
                <FormLayout
                  fieldLayout="horizontal"
                  labelWidth="auto"
                  labelWidthFallback="12em"
                >
                  <>
                    <TextField
                      id="formLayoutHorizontalAutoFirstName"
                      changeHandler={logger}
                      label="First Name"
                    />
                    <TextField
                      id="formLayoutHorizontalAutoLastName"
                      changeHandler={logger}
                      label="Last Name"
                    />
                  </>
                  <TextField
                    id="formLayoutHorizontalAutoEmail"
                    changeHandler={logger}
                    label="Email address"
                    type="email"
                    helperText="Optional"
                  />
                  <>
                    <TextField
                      id="formLayoutHorizontalAutoAddress1"
                      changeHandler={logger}
                      label="Address"
                      placeholder="Address line 1"
                    />
                    <TextField
                      id="formLayoutHorizontalAutoAddress2"
                      changeHandler={logger}
                      isLabelVisible={false}
                      label="Address 2"
                      placeholder="Address line 2"
                    />
                    <TextField
                      id="formLayoutHorizontalAutoZip"
                      changeHandler={logger}
                      helperText="ZIP should be 5 to 6 digits long code."
                      label="ZIP"
                      inputSize={6}
                      validationState="invalid"
                    />
                    <FormLayoutCustomField
                      id="formLayoutHorizontalAutoCountry"
                      label="Country"
                    >
                      <span>Czech Republic</span>
                    </FormLayoutCustomField>
                    <CheckboxField
                      id="formLayoutHorizontalAutoDelivery"
                      changeHandler={logger}
                      label="This is my delivery address"
                    />
                  </>
                  <SelectField
                    id="formLayoutHorizontalAutoFruit"
                    changeHandler={logger}
                    label="Your favourite fruit"
                    options={this.exampleOptions}
                  />
                  <TextArea
                    id="formLayoutHorizontalAutoMessage"
                    changeHandler={logger}
                    fullWidth
                    label="Message"
                    rows={3}
                  />
                  <Toggle
                    id="formLayoutHorizontalAutoNewsletter"
                    changeHandler={logger}
                    checked
                    label="Receive weekly newsletter"
                    required
                    description="Only once per week!"
                  />
                  <Radio
                    id="formLayoutHorizontalAutoFruit2"
                    changeHandler={logger}
                    label="And fruit again!"
                    options={this.exampleOptions}
                    value="apples"
                  />
                </FormLayout>
              )}
            />
            <Documentation
              name="Horizontal Form Layout with Limited-Width Labels (Firefox only, custom fallback; doesn't work inside auto-width Modals)"
              component={(
                <FormLayout
                  fieldLayout="horizontal"
                  labelWidth="limited"
                  labelWidthFallback="12em"
                >
                  <>
                    <TextField
                      id="formLayoutHorizontalLimitedFirstName"
                      changeHandler={logger}
                      label="First Name"
                    />
                    <TextField
                      id="formLayoutHorizontalLimitedLastName"
                      changeHandler={logger}
                      label="Last Name"
                    />
                  </>
                  <TextField
                    id="formLayoutHorizontalLimitedEmail"
                    changeHandler={logger}
                    label="Email address"
                    type="email"
                    helperText="Optional"
                  />
                  <>
                    <TextField
                      id="formLayoutHorizontalLimitedAddress1"
                      changeHandler={logger}
                      label="Address"
                      placeholder="Address line 1"
                    />
                    <TextField
                      id="formLayoutHorizontalLimitedAddress2"
                      changeHandler={logger}
                      isLabelVisible={false}
                      label="Address 2"
                      placeholder="Address line 2"
                    />
                    <TextField
                      id="formLayoutHorizontalLimitedZip"
                      changeHandler={logger}
                      helperText="ZIP should be 5 to 6 digits long code."
                      label="ZIP"
                      inputSize={6}
                      validationState="invalid"
                    />
                    <FormLayoutCustomField
                      id="formLayoutHorizontalLimitedCountry"
                      label="Country"
                    >
                      <span>Czech Republic</span>
                    </FormLayoutCustomField>
                    <CheckboxField
                      id="formLayoutHorizontalLimitedDelivery"
                      changeHandler={logger}
                      label="This is my delivery address"
                    />
                  </>
                  <SelectField
                    id="formLayoutHorizontalLimitedFruit"
                    changeHandler={logger}
                    label="Your favourite fruit"
                    options={this.exampleOptions}
                  />
                  <TextArea
                    id="formLayoutHorizontalLimitedMessage"
                    changeHandler={logger}
                    fullWidth
                    label="Message"
                    rows={3}
                  />
                  <Toggle
                    id="formLayoutHorizontalLimitedNewsletter"
                    changeHandler={logger}
                    checked
                    label="Receive weekly newsletter"
                    required
                    description="Only once per week!"
                  />
                  <Radio
                    id="formLayoutHorizontalLimitedFruit2"
                    changeHandler={logger}
                    label="And fruit again!"
                    options={this.exampleOptions}
                    value="apples"
                  />
                </FormLayout>
              )}
            />
            <h2 className="typography-size-5 mb-6">Layout Components</h2>
            <h3 id="layout-components-grid" className="typography-size-4 mb-6">Grid</h3>
            <p>
              Grid can be used eg. to render <a href="#ui-components-card">Cards</a> in grid.
            </p>
            <Documentation
              name="Grid"
              component={(
                <Grid>
                  <Placeholder text="card" />
                  <Placeholder text="card" />
                  <Placeholder text="card" />
                  <Placeholder text="card" />
                  <Placeholder text="card" />
                </Grid>
              )}
            />
            <h3 id="layout-components-list" className="typography-size-4 mb-6">List</h3>
            <Documentation
              name="Default list"
              component={(
                <List>
                  <ListItem>
                    <Placeholder text="item 1" />
                  </ListItem>
                  <ListItem>
                    <Placeholder text="item 2" />
                  </ListItem>
                  <ListItem>
                    <Placeholder text="item 3" />
                  </ListItem>
                </List>
              )}
            />
            <Documentation
              name="Right-aligned list"
              component={(
                <List align="end">
                  <ListItem>
                    <Placeholder text="item 1" />
                  </ListItem>
                  <ListItem>
                    <Placeholder text="item 2" />
                  </ListItem>
                  <ListItem>
                    <Placeholder text="item 3" />
                  </ListItem>
                </List>
              )}
            />
            <Documentation
              name="Right-aligned list with auto width"
              component={(
                <List align="end" autoWidth>
                  <ListItem>
                    <Placeholder text="item no. 1" />
                  </ListItem>
                  <ListItem>
                    <Placeholder text="longer item, no. 2" />
                  </ListItem>
                  <ListItem>
                    <Placeholder text="the longest item, no. 3" />
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
                    <Placeholder text="object" />
                  </MediaObject>
                  <MediaBody>
                    <Placeholder text="body" />
                  </MediaBody>
                </Media>
              )}
            />
            <h3 id="layout-components-toolbar" className="typography-size-4 mb-6">Toolbar</h3>
            <Documentation
              name="Example layout with not-wrapping dense group and space-between justification"
              component={(
                <Toolbar justify="space-between">
                  <ToolbarGroup dense nowrap>
                    <ToolbarItem>
                      <Placeholder text="grouped item 1" />
                    </ToolbarItem>
                    <ToolbarItem>
                      <Placeholder text="grouped item 2" />
                    </ToolbarItem>
                    <ToolbarItem>
                      <Placeholder text="grouped item 3" />
                    </ToolbarItem>
                  </ToolbarGroup>
                  <ToolbarItem>
                    <Placeholder text="item A" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Placeholder text="item B" />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Dense toolbar with disabled wrapping (groups still wrap)"
              component={(
                <Toolbar justify="space-between" dense nowrap>
                  <ToolbarGroup>
                    <ToolbarItem>
                      <Placeholder text="grouped item 1" />
                    </ToolbarItem>
                    <ToolbarItem>
                      <Placeholder text="grouped item 2" />
                    </ToolbarItem>
                    <ToolbarItem>
                      <Placeholder text="grouped item 3" />
                    </ToolbarItem>
                  </ToolbarGroup>
                  <ToolbarItem>
                    <Placeholder text="item A" />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Centered justification and alignment"
              component={(
                <Toolbar align="middle" justify="center">
                  <ToolbarItem>
                    <Placeholder text="item 1" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Placeholder text="item 2a" />
                    <Placeholder text="item 2b" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Placeholder text="item 3" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Placeholder text="item 4" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Placeholder text="item 5" />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
          </section>
          <hr />
          <section id="ui-components" className="mb-7">
            <h2 className="typography-size-5 mb-6">UI Components</h2>
            <h3 id="ui-components-alert" className="typography-size-4 mb-6">Alert</h3>
            <Documentation
              name="Alert types"
              component={(
                <>
                  <div className="mb-4">
                    <Alert type="success">
                      <span>
                        <strong>Success: </strong>
                        Success message
                      </span>
                    </Alert>
                  </div>
                  <div className="mb-4">
                    <Alert type="warning">
                      <span>
                        <strong>Warning: </strong>
                        Warning message
                      </span>
                    </Alert>
                  </div>
                  <div className="mb-4">
                    <Alert type="error">
                      <span>
                        <strong>Error: </strong>
                        Error message
                      </span>
                    </Alert>
                  </div>
                  <div className="mb-4">
                    <Alert type="info">
                      <span>
                        <strong>Info: </strong>
                        Info message
                      </span>
                    </Alert>
                  </div>
                  <div className="mb-4">
                    <Alert type="help">
                      <span>
                        <strong>Help: </strong>
                        Help message
                      </span>
                    </Alert>
                  </div>
                  <div>
                    <Alert>
                      <span>
                        <strong>Note: </strong>
                        Note message
                      </span>
                    </Alert>
                  </div>
                </>
              )}
            />
            <Documentation
              name="Dismissible alert with icon"
              component={(
                <Alert
                  closeHandler={loggerClick}
                  icon={<Icon icon="success" />}
                  type="success"
                >
                  <span>
                    <strong>Success: </strong>
                    Success message
                  </span>
                </Alert>
              )}
            />
            <Documentation
              name="Dismissible alert with long content"
              component={(
                <Alert
                  closeHandler={loggerClick}
                  icon={<Icon icon="success" />}
                  type="success"
                >
                  <span>
                    <strong>Success: </strong>
                    Curabitur sagittis hendrerit ante. Integer pellentesque quam vel velit. Sed vel
                    lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem.
                    Pellentesque sapien. Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    Maecenas sollicitudin.
                  </span>
                </Alert>
              )}
            />
            <h3 id="ui-components-badge" className="typography-size-4 mb-6">Badge</h3>
            <Documentation
              name="Badge types"
              component={(
                <>
                  <div className="mb-3">
                    <Badge label={1} />
                    <Badge label="text" />
                  </div>
                  <div className="mb-3">
                    <Badge label="success" type="success" />
                    <Badge label="warning" type="warning" />
                    <Badge label="error" type="error" />
                    <Badge label="info" type="info" />
                    <Badge label="help" type="help" />
                  </div>
                  <div className="mb-3">
                    <Badge priority="outline" label="success" type="success" />
                    <Badge priority="outline" label="warning" type="warning" />
                    <Badge priority="outline" label="error" type="error" />
                    <Badge priority="outline" label="info" type="info" />
                    <Badge priority="outline" label="help" type="help" />
                  </div>
                  <div style={{
                    backgroundColor: '#333',
                    padding: '1rem',
                  }}
                  >
                    <Badge label="light" type="light" />
                    <Badge priority="outline" label="light" type="light" />
                  </div>
                </>
              )}
            />
            <h3 id="ui-components-button" className="typography-size-4 mb-6">Button</h3>
            <Documentation
              name="Default buttons"
              component={(
                <Toolbar>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Primary" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Secondary" variant="secondary" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Success" variant="success" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Warning" variant="warning" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Danger" variant="danger" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Dark" variant="dark" />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Outline buttons"
              component={(
                <Toolbar>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Primary " priority="outline" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Secondary" priority="outline" variant="secondary" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Success" priority="outline" variant="success" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Warning" priority="outline" variant="warning" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Danger" priority="outline" variant="danger" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Dark" priority="outline" variant="dark" />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Flat buttons"
              component={(
                <Toolbar>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Primary" priority="flat" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Secondary" priority="flat" variant="secondary" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Success" priority="flat" variant="success" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Warning" priority="flat" variant="warning" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Danger" priority="flat" variant="danger" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Dark" priority="flat" variant="dark" />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Link button"
              component={(
                <Button clickHandler={loggerClick} label="Button that looks like a link" priority="link" />
              )}
            />
            <Documentation
              name="Buttons sizes"
              component={(
                <Toolbar>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Small" size="small" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Medium" />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Large" size="large" />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Disabled buttons"
              component={(
                <Toolbar align="middle">
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Disabled default" disabled />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Disabled outline" priority="outline" disabled />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Disabled flat" priority="flat" disabled />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button clickHandler={loggerClick} label="Disabled link" priority="link" disabled />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Buttons with Icons"
              component={(
                <Toolbar align="middle">
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Icon before label"
                      beforeLabel={<Icon icon="star" />}
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Icon after label"
                      afterLabel={<Icon icon="star" />}
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Icon only"
                      labelVisibility="none"
                      beforeLabel={<Icon icon="star" />}
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Icon and label on desktop"
                      labelVisibility="desktop"
                      beforeLabel={<Icon icon="star" />}
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      beforeLabel={<Icon icon="star" />}
                      label="Link button with icon"
                      priority="link"
                    />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Buttons with Badges"
              component={(
                <Toolbar>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Badge before"
                      beforeLabel={<Badge label={3} type="light" priority="outline" />}
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Badge before, on top"
                      startCorner={<Badge label={3} />}
                      variant="secondary"
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Badge after"
                      afterLabel={<Badge label="new" type="warning" />}
                      variant="primary"
                      priority="outline"
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Badge after, on top"
                      endCorner={<Badge label={3} />}
                      variant="secondary"
                      priority="outline"
                    />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <Documentation
              name="Button with Badge and Icon"
              component={(
                <>
                  <Button
                    clickHandler={loggerClick}
                    label="Button with badge and icon"
                    beforeLabel={<Icon icon="star" />}
                    startCorner={<Badge label={3} />}
                    variant="secondary"
                    priority="outline"
                  />
                </>
              )}
            />
            <Documentation
              name="Block buttons"
              component={(
                <>
                  <div className="mb-4">
                    <Button clickHandler={loggerClick} label="Block" block />
                  </div>
                  <Button
                    clickHandler={loggerClick}
                    label="Block button with icon"
                    beforeLabel={<Icon icon="star" />}
                    block
                  />
                </>
              )}
            />
            <Documentation
              name="Loading button"
              component={(
                <Toolbar>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Loading button"
                      loadingIcon={<span className="d-inline-flex animation-spin-counterclockwise"><Icon icon="loading" /></span>}
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      clickHandler={loggerClick}
                      label="Loading button with icon and badge"
                      afterLabel={<span className="icon" />}
                      loadingIcon={<span className="d-inline-flex animation-spin-counterclockwise"><Icon icon="loading" /></span>}
                      startCorner={<Badge label={3} />}
                    />
                  </ToolbarItem>
                </Toolbar>
              )}
            />
            <h3 id="ui-components-button-group" className="typography-size-4 mb-6">Button Group</h3>
            <Documentation
              name="Button group"
              component={(
                <>
                  <div className="mb-3">
                    <ButtonGroup aria-label="Accessible group label">
                      <Button clickHandler={loggerClick} label="One" variant="dark" />
                      <Button clickHandler={loggerClick} label="Two" />
                      <Button clickHandler={loggerClick} label="Three" />
                    </ButtonGroup>
                  </div>
                  <div className="mb-3">
                    <ButtonGroup aria-label="Accessible group label" priority="outline">
                      <Button clickHandler={loggerClick} label="One" variant="dark" />
                      <Button clickHandler={loggerClick} label="Two" />
                      <Button clickHandler={loggerClick} label="Three" />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup aria-label="Accessible group label" priority="flat">
                      <Button clickHandler={loggerClick} label="One" variant="dark" />
                      <Button clickHandler={loggerClick} label="Two" />
                      <Button clickHandler={loggerClick} label="Three" />
                    </ButtonGroup>
                  </div>
                </>
              )}
            />
            <Documentation
              name="Block button group"
              component={(
                <ButtonGroup aria-label="Accessible group label" block priority="outline">
                  <Button clickHandler={loggerClick} label="One" variant="dark" />
                  <Button clickHandler={loggerClick} label="Two" />
                  <Button clickHandler={loggerClick} label="Three" />
                </ButtonGroup>
              )}
            />
            <h3 id="ui-components-card" className="typography-size-4 mb-6">Card</h3>
            <p>
              You might want to use Cards along with the <a href="#layout-components-grid">Grid</a> layout.
            </p>
            <Documentation
              name="Card types"
              component={(
                <Grid>
                  <Card>
                    <CardBody>
                      <h4>Flat card</h4>
                      <p>
                        Flat card content<br />
                        that spans two lines.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button clickHandler={loggerClick} label="Click" block />
                    </CardFooter>
                  </Card>
                  <Card type="bordered">
                    <CardBody>
                      <h4>Bordered card</h4>
                      <p>
                        Bordered card content<br />
                        that spans two lines.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button clickHandler={loggerClick} label="Click" block />
                    </CardFooter>
                  </Card>
                  <Card type="warning">
                    <CardBody>
                      <h4>Warning card</h4>
                      <p>
                        Warning card content<br />
                        that spans two lines.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button clickHandler={loggerClick} label="Click" block />
                    </CardFooter>
                  </Card>
                  <Card type="error">
                    <CardBody>
                      <h4>Error card</h4>
                      <p>
                        Error card content<br />
                        that spans two lines.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button clickHandler={loggerClick} label="Click" block />
                    </CardFooter>
                  </Card>
                </Grid>
              )}
            />
            <Documentation
              name="Raised card"
              component={(
                <Card raised>
                  <CardBody>
                    <h4>Raised card</h4>
                    <p>
                      Raised card content<br />
                      that spans two lines.
                    </p>
                    <Button clickHandler={loggerClick} label="Click" />
                  </CardBody>
                </Card>
              )}
            />
            <Documentation
              name="Dense raised card"
              component={(
                <Card dense raised>
                  <CardBody>
                    <h4>Dense raised card</h4>
                    <p>
                      Dense card content<br />
                      that spans two lines.
                    </p>
                    <Button clickHandler={loggerClick} label="Click" />
                  </CardBody>
                </Card>
              )}
            />
            <Documentation
              name="Disabled card"
              component={(
                <Card disabled>
                  <CardBody>
                    <h4>Disabled card</h4>
                    <p>
                      Disabled card content<br />
                      that spans two lines.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Button clickHandler={loggerClick} label="Click" disabled />
                  </CardFooter>
                </Card>
              )}
            />
            <h3 id="ui-components-checkbox" className="typography-size-4 mb-6">Checkbox</h3>
            <Documentation
              name="Checkbox"
              component={(
                <CheckboxField
                  id="checkboxField"
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
                  id="checkboxFieldChecked"
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
                  id="checkboxFieldDisabled"
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
                    id="checkboxFieldStateValid"
                    label="checked and valid"
                    validationState="valid"
                    checked
                    changeHandler={logger}
                  />
                  <CheckboxField
                    id="checkboxFieldStateValid"
                    label="checked with warning"
                    validationState="warning"
                    checked
                    changeHandler={logger}
                  />
                  <CheckboxField
                    id="checkboxFieldStateValid"
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
                  id="checkboxLabelHidden"
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
                  id="checkboxLabelLeft"
                  label="checkbox checked and label left"
                  checked
                  changeHandler={logger}
                  labelPosition="before"
                />
              )}
            />
            <h3 id="ui-components-modal" className="typography-size-4 mb-6">Modal</h3>
            <Documentation
              name="Modal"
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
            <Documentation
              name="Modal with long content and a loading icon"
              component={(
                <>
                  <Button
                    label="Open modal"
                    clickHandler={() => this.setState({ showModal2: true })}
                  />
                  {this.state.showModal2 && (
                    <Modal
                      actions={[
                        {
                          clickHandler: () => {
                            loggerClick();
                            this.setState({ showModal2: false });
                          },
                          label: 'Agree',
                          loadingIcon: <Icon icon="loading" />,
                        },
                      ]}
                      closeHandler={() => this.setState({ showModal2: false })}
                      size="small"
                      title="Modal with long content"
                    >
                      {/* eslint-disable-next-line max-len */}
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.</p>
                    </Modal>
                  )}
                </>
              )}
            />
            <Documentation
              name="Modal with disabled body scrolling"
              component={(
                <>
                  <Button
                    label="Open modal"
                    clickHandler={() => this.setState({ showModal3: true })}
                  />
                  {this.state.showModal3 && (
                    <Modal
                      actions={[
                        {
                          clickHandler: () => {
                            loggerClick();
                            this.setState({ showModal3: false });
                          },
                          label: 'Agree',
                          loadingIcon: <Icon icon="loading" />,
                        },
                      ]}
                      closeHandler={() => this.setState({ showModal3: false })}
                      scrollMode="modal"
                      size="small"
                      title="Modal with disabled body scrolling"
                    >
                      {/* eslint-disable-next-line max-len */}
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.</p>
                    </Modal>
                  )}
                </>
              )}
            />
            <Documentation
              name="Auto-sized modal"
              component={(
                <>
                  <Button
                    label="Open modal"
                    clickHandler={() => this.setState({ showModal4: true })}
                  />
                  {this.state.showModal4 && (
                    <Modal
                      actions={[
                        {
                          clickHandler: () => {
                            loggerClick();
                            this.setState({ showModal4: false });
                          },
                          label: 'Agree',
                        },
                      ]}
                      closeHandler={() => this.setState({ showModal4: false })}
                      size="auto"
                      title="Auto-sized modal"
                    >
                      <p>Dialog content</p>
                    </Modal>
                  )}
                </>
              )}
            />
            <Documentation
              name="Modal rendered in React portal"
              component={(
                <>
                  <Button
                    label="Open modal"
                    clickHandler={() => this.setState({ showModal5: true })}
                  />
                  {this.state.showModal5 && (
                    <Modal
                      actions={[
                        {
                          clickHandler: () => {
                            loggerClick();
                            this.setState({ showModal5: false });
                          },
                          label: 'Agree',
                        },
                      ]}
                      closeHandler={() => this.setState({ showModal5: false })}
                      portalId="app-modal-portal"
                      title="Modal in React portal"
                    >
                      <p>Dialog content</p>
                    </Modal>
                  )}
                </>
              )}
            />
            <h3 id="ui-components-radio" className="typography-size-4 mb-6">Radio</h3>
            <Documentation
              name="Radio"
              component={(
                <Radio
                  changeHandler={logger}
                  id="Radio"
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
                    id="RadioStateValid"
                    label="Choices valid"
                    options={this.exampleOptions}
                    value="apples"
                    validationState="valid"
                  />
                  <Radio
                    changeHandler={logger}
                    id="RadioStateWarning"
                    label="Choices with warning"
                    options={this.exampleOptions}
                    value="apples"
                    validationState="warning"
                  />
                  <Radio
                    changeHandler={logger}
                    id="RadioStateInvalid"
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
                  id="RadioDescriptionRequiredDisabledItem"
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
                  id="RadioDisabled"
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
            <h3 id="ui-components-scrollview" className="typography-size-4 mb-6">Scroll View</h3>
            <p>
              You should always enable arrows in horizontal mode when scrollbar is disabled.
              Otherwise users without horizontal-scrolling-enabled device (like an old-school mouse)
              might not be able to access your content.
            </p>
            <p>
              If you use auto scroll mechanism, it requires to have `key` prop set for every child
              present in `children` prop because it detects changes of these keys. Otherwise it
              will not work as expected.
            </p>
            <Documentation
              name="Vertical Scroll View"
              component={(
                <div style={{ height: '200px' }}>
                  <ScrollView>
                    <Placeholder
                      text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc."
                    />
                  </ScrollView>
                </div>
              )}
            />
            <Documentation
              name="Horizontal Scroll View with custom shadow color and size"
              component={(
                <ScrollView
                  direction="horizontal"
                  shadowColor={{
                    alpha: 0.75,
                    blue: 139,
                    green: 119,
                    red: 0,
                  }}
                  shadowSize="80px"
                >
                  <div style={{ whiteSpace: 'nowrap' }}>
                    <Placeholder
                      text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."
                    />
                  </div>
                </ScrollView>
              )}
            />
            <Documentation
              name="Horizontal Scroll View with optional arrows and disabled scrollbar"
              component={(
                <ScrollView arrows direction="horizontal" scrollbar={false} shadowSize="3.5rem">
                  <div style={{ whiteSpace: 'nowrap' }}>
                    <Placeholder
                      text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."
                    />
                  </div>
                </ScrollView>
              )}
            />
            <Documentation
              name="Horizontal Scroll View with customised shadows, arrows and scroll step"
              component={(
                <ScrollView
                  arrows
                  arrowsColor="white"
                  arrowsScrollStep={300}
                  customNextArrow={(
                    <span
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        position: 'relative',
                        textShadow: '0 0 0.4em black',
                        top: '-0.05em',
                      }}
                    >
                      →
                    </span>
                  )}
                  customPrevArrow={(
                    <span
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        position: 'relative',
                        textShadow: '0 0 0.4em black',
                        top: '-0.05em',
                      }}
                    >
                      ←
                    </span>
                  )}
                  direction="horizontal"
                  scrollbar={false}
                  shadowColor={{
                    alpha: 0.75,
                    blue: 0,
                    green: 0,
                    red: 0,
                  }}
                  shadowSize="5rem"
                >
                  <div style={{ whiteSpace: 'nowrap' }}>
                    <Placeholder
                      text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."
                    />
                  </div>
                </ScrollView>
              )}
            />
            <Documentation
              name="Vertical Scroll View with completely custom shadows and disabled scrollbar"
              component={(
                <div style={{ height: '200px' }}>
                  <ScrollView
                    customStartShadowStyle={{
                      background: 'radial-gradient(farthest-side at center top, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 60%, rgba(0, 0, 0, 0.02) 85%, rgba(0, 0, 0, 0) 100%)',
                    }}
                    customEndShadowStyle={{
                      background: 'radial-gradient(farthest-side at center bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 60%, rgba(0, 0, 0, 0.02) 85%, rgba(0, 0, 0, 0) 100%)',
                    }}
                    scrollbar={false}
                    shadowSize="40px"
                  >
                    <Placeholder
                      text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc."
                    />
                  </ScrollView>
                </div>
              )}
            />
            <Documentation
              name="Vertical Scroll View with arrows and disabled scrollbar"
              component={(
                <div style={{ height: '200px' }}>
                  <ScrollView arrows scrollbar={false} shadowSize="3.5rem">
                    <Placeholder
                      text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc."
                    />
                  </ScrollView>
                </div>
              )}
            />
            <Documentation
              name="Verical Scroll View with auto scroll"
              component={(
                <>
                  <div className="mb-5">
                    <Toolbar justify="space-between">
                      <ToolbarItem>
                        <Radio
                          changeHandler={(e) => {
                            this.setState({
                              scrollView1AutoScroll: e.target.value,
                            });
                          }}
                          options={[
                            {
                              label: 'Always',
                              value: 'always',
                            },
                            {
                              label: 'When end detected',
                              value: 'detectEnd',
                            },
                          ]}
                          id="scrollView1AutoScroll"
                          label="Autoscroll:"
                          value={this.state.scrollView1AutoScroll}
                        />
                      </ToolbarItem>
                      <ToolbarItem>
                        <Button
                          label="Add text into scroll view"
                          clickHandler={
                            () => {
                              this.setState((prevState) => ({
                                scrollView1: `${prevState.scrollView1}  ${this.constructor.generateRandomString()}`,
                              }));
                            }
                          }
                        />
                      </ToolbarItem>
                    </Toolbar>
                  </div>
                  <div style={{ height: '200px' }}>
                    <ScrollView
                      arrows
                      autoScroll={this.state.scrollView1AutoScroll}
                    >
                      <Placeholder
                        key={this.state.scrollView1.length}
                        text={this.state.scrollView1}
                      />
                    </ScrollView>
                  </div>
                </>
              )}
            />
            <Documentation
              name="Horizontal Scroll View with auto scroll"
              component={(
                <>
                  <div className="mb-5">
                    <Toolbar justify="space-between">
                      <ToolbarItem>
                        <Radio
                          changeHandler={(e) => {
                            this.setState({
                              scrollView2AutoScroll: e.target.value,
                            });
                          }}
                          options={[
                            {
                              label: 'Always',
                              value: 'always',
                            },
                            {
                              label: 'When end detected',
                              value: 'detectEnd',
                            },
                          ]}
                          id="scrollView2AutoScroll"
                          label="Autoscroll:"
                          value={this.state.scrollView2AutoScroll}
                        />
                      </ToolbarItem>
                      <ToolbarItem>
                        <Button
                          label="Add text into scroll view"
                          clickHandler={
                            () => {
                              this.setState((prevState) => ({
                                scrollView2: `${prevState.scrollView2}  ${this.constructor.generateRandomString()}`,
                              }));
                            }
                          }
                        />
                      </ToolbarItem>
                    </Toolbar>
                  </div>
                  <div>
                    <ScrollView
                      arrows
                      autoScroll={this.state.scrollView2AutoScroll}
                      direction="horizontal"
                    >
                      <div
                        key={this.state.scrollView2.length}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        <Placeholder
                          text={this.state.scrollView2}
                        />
                      </div>
                    </ScrollView>
                  </div>
                </>
              )}
            />
            <h3 id="ui-components-selectfield" className="typography-size-4 mb-6">Select Field</h3>
            <Documentation
              name="Select field variants"
              component={(
                <div>
                  <SelectField
                    id="selectFieldVariantOutline"
                    changeHandler={logger}
                    label="Outline"
                    options={this.exampleOptions}
                  />
                  <SelectField
                    id="selectFieldVariantFilled"
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
                    id="selectFieldWithDescriptionOutline"
                    changeHandler={logger}
                    label="Favorite fruit"
                    helperText="What is your favorite fruit?"
                    options={this.exampleOptions}
                  />
                  <SelectField
                    id="selectFieldWithDescriptionFilled"
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
                    id="selectFieldRequiredOutline"
                    changeHandler={logger}
                    label="This field is required"
                    options={this.exampleOptions}
                    required
                  />
                  <SelectField
                    id="selectFieldRequiredFilled"
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
                <>
                  <SelectField
                    id="selectFieldDisabledOutline"
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
                  <SelectField
                    id="selectFieldDisabledOutline"
                    changeHandler={logger}
                    label="Disabled select field"
                    variant="filled"
                    options={[
                      ...this.exampleOptions,
                      {
                        disabled: true,
                        label: 'Oranges',
                        value: 'oranges',
                      },
                    ]}
                  />
                </>
              )}
            />
            <Documentation
              name="Disabled select field"
              component={(
                <div>
                  <SelectField
                    id="selectFieldDisabledOutline"
                    changeHandler={logger}
                    label="Disabled select field"
                    options={this.exampleOptions}
                    disabled
                  />
                  <SelectField
                    id="selectFieldDisabledFilled"
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
                    id="selectFieldWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Select field with hidden label"
                    helperText="Showing helper text instead"
                    options={this.exampleOptions}
                    isLabelVisible={false}
                  />
                  <SelectField
                    id="selectFieldWithInvisibleLabelFilled"
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
                      id="selectFieldValidationValidOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Looks good!"
                      validationState="valid"
                      options={this.exampleOptions}
                      value="apples"
                    />
                    <SelectField
                      id="selectFieldValidationWarningOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Really…?"
                      validationState="warning"
                      options={this.exampleOptions}
                      value="bananas"
                    />
                    <SelectField
                      id="selectFieldValidationInvalidOutline"
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
                      id="selectFieldValidationValidFilled"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Looks good!"
                      validationState="valid"
                      variant="filled"
                      options={this.exampleOptions}
                      value="apples"
                    />
                    <SelectField
                      id="selectFieldValidationWarningOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="Really…?"
                      validationState="warning"
                      variant="filled"
                      options={this.exampleOptions}
                      value="bananas"
                    />
                    <SelectField
                      id="selectFieldValidationInvalidOutline"
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
                      id="selectFieldSizeOutlineSmall"
                      changeHandler={logger}
                      label="Small"
                      options={this.exampleOptions}
                      size="small"
                    />
                    <SelectField
                      id="selectFieldSizeOutlineMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      options={this.exampleOptions}
                      size="medium"
                    />
                    <SelectField
                      id="selectFieldSizeOutlineLarge"
                      changeHandler={logger}
                      label="Large"
                      options={this.exampleOptions}
                      size="large"
                    />
                  </div>
                  <div>
                    <SelectField
                      id="selectFieldSizeFilledSmall"
                      changeHandler={logger}
                      label="Small"
                      options={this.exampleOptions}
                      size="small"
                      variant="filled"
                    />
                    <SelectField
                      id="selectFieldSizeFilledMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      options={this.exampleOptions}
                      size="medium"
                      variant="filled"
                    />
                    <SelectField
                      id="selectFieldSizeFilledLarge"
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
                    id="selectFieldFullWidthOutline"
                    changeHandler={logger}
                    label="Favorite fruit"
                    options={this.exampleOptions}
                    fullWidth
                  />
                  <SelectField
                    id="selectFieldFullWidthFilled"
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
                      id="selectFieldHorizontalOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      helperText="What do you like?"
                      layout="horizontal"
                      options={this.exampleOptions}
                    />
                    <SelectField
                      id="selectFieldHorizontalFilled"
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
                      id="selectFieldHorizontalFullWidthOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      layout="horizontal"
                      options={this.exampleOptions}
                      fullWidth
                    />
                    <SelectField
                      id="selectFieldHorizontalFullWidthFilled"
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
                      id="selectFieldHorizontalFullWidthLabelInvisibleOutline"
                      changeHandler={logger}
                      label="Favorite fruit"
                      layout="horizontal"
                      isLabelVisible={false}
                      options={this.exampleOptions}
                      fullWidth
                    />
                    <SelectField
                      id="selectFieldHorizontalFullWidthInvisibleFilled"
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
                    ascendingIcon: <Icon icon="up" />,
                    changeHandler: (column, direction) => {
                      this.setState({
                        tableSortColumn: column,
                        tableSortDirection: direction === 'asc' ? 'desc' : 'asc',
                      });
                    },
                    column: this.state.tableSortColumn,
                    descendingIcon: <Icon icon="down" />,
                    direction: this.state.tableSortDirection,
                  }}
                />
              )}
            />
            <Documentation
              name="Responsive Table with Scroll View"
              component={(
                <ScrollView direction="horizontal" shadowSize="100px">
                  <Table
                    columns={[
                      {
                        isSortable: true,
                        label: 'Id',
                        name: 'id',
                      },
                      {
                        format: (row) => (
                          <span style={{ whiteSpace: 'nowrap' }}>{row.name}</span>
                        ),
                        isSortable: true,
                        label: 'Name',
                        name: 'name',
                      },
                      {
                        format: (row) => (
                          <span style={{ whiteSpace: 'nowrap' }}>
                            {row.dateOfBirth.toLocaleDateString('cz-CZ')}
                          </span>
                        ),
                        isSortable: false,
                        label: 'Date of birth',
                        name: 'dateOfBirth',
                      },
                      {
                        format: (row) => (
                          <span style={{ whiteSpace: 'nowrap' }}>{row.address}</span>
                        ),
                        isSortable: false,
                        label: 'Address',
                        name: 'address',
                      },
                      {
                        format: (row) => (
                          <span style={{ whiteSpace: 'nowrap' }}>{row.note}</span>
                        ),
                        isSortable: false,
                        label: 'Note',
                        name: 'note',
                      },
                    ]}
                    rows={[
                      {
                        address: '2020 Very Cool Street with a Very Long Name, Prague CZ',
                        dateOfBirth: new Date(2000, 12, 31),
                        id: 1,
                        name: 'Jan Novak',
                        note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
                      },
                      {
                        address: '2020 Very Cool Street with a Very Long Name, Prague CZ',
                        dateOfBirth: new Date(2018, 1, 1),
                        id: 2,
                        name: 'Josef Novak',
                        note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
                      },
                      {
                        address: '2020 Very Cool Street with a Very Long Name, Prague CZ',
                        dateOfBirth: new Date(1970, 12, 24),
                        id: 3,
                        name: 'Jiří Novak',
                        note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
                      },
                    ]}
                    sort={{
                      ascendingIcon: <Icon icon="up" />,
                      changeHandler: (column, direction) => {
                        this.setState({
                          tableSortColumn: column,
                          tableSortDirection: direction === 'asc' ? 'desc' : 'asc',
                        });
                      },
                      column: this.state.tableSortColumn,
                      descendingIcon: <Icon icon="down" />,
                      direction: this.state.tableSortDirection,
                    }}
                  />
                </ScrollView>
              )}
            />
            <h3 id="ui-components-textarea" className="typography-size-4 mb-6">Text Area</h3>
            <Documentation
              name="Text area variants"
              component={(
                <div>
                  <TextArea
                    id="textAreaVariantOutline"
                    changeHandler={logger}
                    label="Outline"
                  />
                  <TextArea
                    id="textAreaVariantFilled"
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
                    id="textAreaWithDescriptionOutline"
                    changeHandler={logger}
                    label="Address"
                    helperText="Fill in your address"
                  />
                  <TextArea
                    id="textAreaWithDescriptionFilled"
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
                    id="textAreaRequiredOutline"
                    changeHandler={logger}
                    label="This field is required"
                    required
                  />
                  <TextArea
                    id="textAreaRequiredFilled"
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
                    id="textAreaDisabledOutline"
                    changeHandler={logger}
                    label="Disabled text area"
                    placeholder="This field is disabled"
                    disabled
                  />
                  <TextArea
                    id="textAreaDisabledFilled"
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
                    id="textAreaWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Text area with hidden label"
                    helperText="Showing placeholder instead"
                    placeholder="Text area with hidden label"
                    isLabelVisible={false}
                  />
                  <TextArea
                    id="textAreaWithInvisibleLabelFilled"
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
                      id="textAreaValidationValidOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Ho ho ho, looks good!"
                      validationState="valid"
                      value="BMW M4"
                    />
                    <TextArea
                      id="textAreaValidationWarningOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Isn't it a little too big for you?"
                      validationState="warning"
                      value="BMW X5"
                    />
                    <TextArea
                      id="textAreaValidationInvalidOutline"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="C'mon, it's so ugly…"
                      validationState="invalid"
                      value="BMW X6"
                    />
                  </div>
                  <div>
                    <TextArea
                      id="textAreaValidationValidFilled"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Ho ho ho, looks good!"
                      validationState="valid"
                      value="BMW M4"
                      variant="filled"
                    />
                    <TextArea
                      id="textAreaValidationWarningFilled"
                      changeHandler={logger}
                      label="What do you wish for Christmas?"
                      helperText="Isn't it a little too big for you?"
                      validationState="warning"
                      value="BMW X5"
                      variant="filled"
                    />
                    <TextArea
                      id="textAreaValidationInvalidFilled"
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
                      id="textAreaSizeOutlineSmall"
                      changeHandler={logger}
                      label="Small"
                      size="small"
                    />
                    <TextArea
                      id="textAreaSizeOutlineMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      size="medium"
                    />
                    <TextArea
                      id="textAreaSizeOutlineLarge"
                      changeHandler={logger}
                      label="Large"
                      size="large"
                    />
                  </div>
                  <div>
                    <TextArea
                      id="textAreaSizeFilledSmall"
                      changeHandler={logger}
                      label="Small"
                      size="small"
                      variant="filled"
                    />
                    <TextArea
                      id="textAreaSizeFilledMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      size="medium"
                      variant="filled"
                    />
                    <TextArea
                      id="textAreaSizeFilledLarge"
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
                    id="textAreaCustomSizeOutline"
                    changeHandler={logger}
                    label="Rows and cols"
                    cols={10}
                    rows={5}
                  />
                  <TextArea
                    id="textAreaCustomSizeFilled"
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
                    id="textAreaFullWidthOutline"
                    changeHandler={logger}
                    label="What is your story?"
                    placeholder="I was born and raised in…"
                    fullWidth
                  />
                  <TextArea
                    id="textAreaFullWidthFilled"
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
                      id="textAreaHorizontalOutline"
                      changeHandler={logger}
                      label="Address"
                      helperText="Where you live"
                      layout="horizontal"
                    />
                    <TextArea
                      id="textAreaHorizontalFilled"
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
                      id="textAreaCustomSizeOutline"
                      changeHandler={logger}
                      label="Rows and cols"
                      layout="horizontal"
                      cols={10}
                      rows={5}
                    />
                    <TextArea
                      id="textAreaCustomSizeFilled"
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
                      id="textAreaHorizontalFullWidthOutline"
                      changeHandler={logger}
                      label="Long story short"
                      layout="horizontal"
                      fullWidth
                    />
                    <TextArea
                      id="textAreaHorizontalFullWidthFilled"
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
                      id="textAreaHorizontalFullWidthLabelInvisibleOutline"
                      changeHandler={logger}
                      label="Long story short"
                      placeholder="Full width text area with horizontal layout works better with placeholder"
                      layout="horizontal"
                      isLabelVisible={false}
                      fullWidth
                    />
                    <TextArea
                      id="textAreaHorizontalFullWidthInvisibleFilled"
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
                    id="textFieldVariantOutline"
                    changeHandler={logger}
                    label="Outline"
                  />
                  <TextField
                    id="textFieldVariantFilled"
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
                    id="textFieldWithDescriptionOutline"
                    changeHandler={logger}
                    label="Name"
                    helperText="Fill in your real name"
                  />
                  <TextField
                    id="textFieldWithDescriptionFilled"
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
                    id="textFieldRequiredOutline"
                    changeHandler={logger}
                    label="This field is required"
                    required
                  />
                  <TextField
                    id="textFieldRequiredFilled"
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
                    id="textFieldDisabledOutline"
                    changeHandler={logger}
                    label="Disabled text field"
                    placeholder="This field is disabled"
                    disabled
                  />
                  <TextField
                    id="textFieldDisabledFilled"
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
                    id="textFieldWithInvisibleLabelOutline"
                    changeHandler={logger}
                    label="Text field with hidden label"
                    helperText="Showing placeholder instead"
                    placeholder="Text field with hidden label"
                    isLabelVisible={false}
                  />
                  <TextField
                    id="textFieldWithInvisibleLabelFilled"
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
                      id="textFieldValidationValidOutline"
                      changeHandler={logger}
                      label="User name"
                      helperText="Looks good!"
                      validationState="valid"
                      value="terminator"
                    />
                    <TextField
                      id="textFieldValidationWarningOutline"
                      changeHandler={logger}
                      label="Email"
                      helperText="Account with this address already exists, please pick a different address."
                      validationState="warning"
                      value="me@example.com"
                    />
                    <TextField
                      id="textFieldValidationInvalidOutline"
                      changeHandler={logger}
                      label="Name"
                      helperText="C'mon, this is not your real name."
                      validationState="invalid"
                      value="xx"
                    />
                  </div>
                  <div>
                    <TextField
                      id="textFieldValidationValidFilled"
                      changeHandler={logger}
                      label="User name"
                      helperText="Looks good!"
                      validationState="valid"
                      value="terminator"
                      variant="filled"
                    />
                    <TextField
                      id="textFieldValidationWarningFilled"
                      changeHandler={logger}
                      label="Email"
                      helperText="Account with this address already exists, please pick a different address."
                      validationState="warning"
                      value="me@example.com"
                      variant="filled"
                    />
                    <TextField
                      id="textFieldValidationInvalidFilled"
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
                      id="textFieldSizeOutlineSmall"
                      changeHandler={logger}
                      label="Small"
                      size="small"
                    />
                    <TextField
                      id="textFieldSizeOutlineMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      size="medium"
                    />
                    <TextField
                      id="textFieldSizeOutlineLarge"
                      changeHandler={logger}
                      label="Large"
                      size="large"
                    />
                  </div>
                  <div>
                    <TextField
                      id="textFieldSizeFilledSmall"
                      changeHandler={logger}
                      label="Small"
                      size="small"
                      variant="filled"
                    />
                    <TextField
                      id="textFieldSizeFilledMedium"
                      changeHandler={logger}
                      label="Medium (default)"
                      size="medium"
                      variant="filled"
                    />
                    <TextField
                      id="textFieldSizeFilledLarge"
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
                    id="textFieldCustomInputSizeOutline"
                    changeHandler={logger}
                    label="Title"
                    inputSize={3}
                  />
                  <TextField
                    id="textFieldCustomInputSizeFilled"
                    changeHandler={logger}
                    label="Title"
                    variant="filled"
                    inputSize={3}
                  />
                  <TextField
                    id="textFieldCustomInputSizeNumberOutline"
                    changeHandler={logger}
                    label="Age"
                    max={100}
                    type="number"
                  />
                  <TextField
                    id="textFieldCustomInputSizeNumberFilled"
                    changeHandler={logger}
                    label="Age"
                    variant="filled"
                    max={100}
                    type="number"
                  />
                </div>
              )}
            />
            <Documentation
              name="Full width text field"
              component={(
                <div>
                  <TextField
                    id="textFieldFullWidthOutline"
                    changeHandler={logger}
                    label="What is your story?"
                    placeholder="I was born and raised in…"
                    fullWidth
                  />
                  <TextField
                    id="textFieldFullWidthFilled"
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
                      id="textFieldHorizontalOutline"
                      changeHandler={logger}
                      label="Address"
                      helperText="Where you live"
                      layout="horizontal"
                    />
                    <TextField
                      id="textFieldHorizontalFilled"
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
                      id="textFieldHorizontalCustomSizeOutline"
                      changeHandler={logger}
                      label="Age"
                      layout="horizontal"
                      inputSize={3}
                    />
                    <TextField
                      id="textFieldHorizontalCustomSizeFilled"
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
                      id="textFieldHorizontalFullWidthOutline"
                      changeHandler={logger}
                      helperText="Write it down"
                      label="Long story short"
                      layout="horizontal"
                      fullWidth
                    />
                    <TextField
                      id="textFieldHorizontalFullWidthFilled"
                      changeHandler={logger}
                      label="Long story short"
                      layout="horizontal"
                      variant="filled"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="textFieldHorizontalFullWidthLabelInvisibleOutline"
                      changeHandler={logger}
                      label="Long story short"
                      placeholder="Full width text field with horizontal layout works better with placeholder"
                      layout="horizontal"
                      isLabelVisible={false}
                      fullWidth
                    />
                    <TextField
                      id="textFieldHorizontalFullWidthInvisibleFilled"
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
                  id="toggleField"
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
                  id="toggleChecked"
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
                    id="toggledValidationValid"
                    label="Checked and valid"
                    validationState="valid"
                    checked
                    changeHandler={logger}
                  />
                  <Toggle
                    id="toggledValidationWarning"
                    label="Checked with warning"
                    validationState="warning"
                    checked
                    changeHandler={logger}
                  />
                  <Toggle
                    id="toggledValidationInvalid"
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
                  id="toggledDisabled"
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
                  id="toggledLabelHidden"
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
                  id="toggledLabelLeft"
                  label="toggle checked and label left"
                  checked
                  changeHandler={logger}
                  labelPosition="before"
                />
              )}
            />
          </section>
          <hr />
          <section id="helpers" className="mb-7">
            <h2 className="typography-size-5 mb-6">Helpers</h2>
            <p>
              Helpers are CSS class names for common situations.
            </p>
            <h3 id="helpers-animation" className="typography-size-4 mb-6">Animation</h3>
            <p>
              Remember that non-block inline elements cannot be animated.
            </p>
            <Documentation
              name="Animation"
              component={(
                <>
                  <p>
                    <code className="mr-3">.animation-spin-clockwise</code>
                    <span className="d-inline-flex animation-spin-clockwise">
                      <Icon icon="loading" />
                    </span>
                  </p>
                  <p>
                    <code className="mr-3">.animation-spin-counterclockwise</code>
                    <span className="d-inline-flex animation-spin-counterclockwise">
                      <Icon icon="loading" />
                    </span>
                  </p>
                </>
              )}
            />
          </section>
          <hr />
          <section id="utilities" className="mb-7">
            <h2 className="typography-size-5 mb-6">Utilities</h2>
            <p>
              Utilities are CSS class names that do just one thing.
            </p>
            <h3 id="utilities-box-alignment" className="typography-size-4 mb-6">Box Alignment</h3>
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
            <h3 id="utilities-colors" className="typography-size-4 mb-6">Colors</h3>
            <p>
              Class name notation is
              {' '}
              <a
                href="https://getbootstrap.com/docs/4.5/utilities/colors/"
                target="_blank"
                rel="noopener noreferrer"
              >
                inspired by Bootstrap 4
              </a>.
            </p>
            <Documentation
              name="Text colors"
              component={(
                <div>
                  <div className="text-primary mb-4">
                    <code>.text-primary</code>
                  </div>
                  <div className="text-secondary mb-4">
                    <code>.text-secondary</code>
                  </div>
                  <div className="text-success mb-4">
                    <code>.text-success</code>
                  </div>
                  <div className="text-warning mb-4">
                    <code>.text-warning</code>
                  </div>
                  <div className="text-error mb-4">
                    <code>.text-error</code>
                  </div>
                  <div className="text-help mb-4">
                    <code>.text-help</code>
                  </div>
                  <div className="text-info mb-4">
                    <code>.text-info</code>
                  </div>
                  <div className="text-note mb-4">
                    <code>.text-note</code>
                  </div>
                  <div className="text-muted">
                    <code>.text-muted</code>
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
                    <Placeholder text=".mb-0" />
                  </div>
                  <div className="mb-1">
                    <Placeholder text=".mb-1" />
                  </div>
                  <div className="mb-2">
                    <Placeholder text=".mb-2" />
                  </div>
                  <div className="mb-3">
                    <Placeholder text=".mb-3" />
                  </div>
                  <div className="mb-4">
                    <Placeholder text=".mb-4" />
                  </div>
                  <div className="mb-5">
                    <Placeholder text=".mb-5" />
                  </div>
                  <div className="mb-6">
                    <Placeholder text=".mb-6" />
                  </div>
                  <div className="mb-7">
                    <Placeholder text=".mb-7" />
                  </div>
                </div>
              )}
            />
            <Documentation
              name="Example of left padding from SM screen up"
              component={(
                <div>
                  <div className="pl-sm-0">
                    <Placeholder text=".pl-sm-0" />
                  </div>
                  <div className="pl-sm-1">
                    <Placeholder text=".pl-sm-1" />
                  </div>
                  <div className="pl-sm-2">
                    <Placeholder text=".pl-sm-2" />
                  </div>
                  <div className="pl-sm-3">
                    <Placeholder text=".pl-sm-3" />
                  </div>
                  <div className="pl-sm-4">
                    <Placeholder text=".pl-sm-4" />
                  </div>
                  <div className="pl-sm-5">
                    <Placeholder text=".pl-sm-5" />
                  </div>
                  <div className="pl-sm-6">
                    <Placeholder text=".pl-sm-6" />
                  </div>
                  <div className="pl-sm-7">
                    <Placeholder text=".pl-7" />
                  </div>
                </div>
              )}
            />
          </section>
        </LayoutContent>
      </Layout>
    );
  }
}

export default DemoContainer;
