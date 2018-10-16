import React from 'react';
import {
  Button,
  CheckboxField,
  Documentation,
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
  TextField,
  TextArea,
} from '../../lib';

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
  }

  render() {
    return (
      <div>
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
          name="MultipleSelectField"
          component={(
            <MultipleSelectField
              changeHandler={logger}
              fieldId="multipleSelectField"
              label="MultipleSelectField"
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
          name="MultipleSelectField with description and required"
          component={(
            <MultipleSelectField
              changeHandler={logger}
              fieldId="multipleSelectFieldDescriptionRequired"
              label="MultipleSelectField with description and required"
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
          name="MultipleSelectField with error"
          component={(
            <MultipleSelectField
              changeHandler={logger}
              fieldId="multipleSelectFieldError"
              label="MultipleSelectField with error"
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
          name="MultipleSelectField with error and hidden label"
          component={(
            <MultipleSelectField
              changeHandler={logger}
              fieldId="multipleSelectFieldErrorHiddenLabel"
              label="MultipleSelectField with error and hidden label"
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
          name="MultipleSelectField with multiple selected options"
          component={(
            <MultipleSelectField
              changeHandler={logger}
              fieldId="multipleSelectFieldWithMultipleSelectedOptions"
              label="MultipleSelectField with multiple selected options"
              options={[
                {
                  label: 'choice 1',
                  value: 'ch1',
                },
                {
                  label: 'choice 2',
                  value: 'ch2',
                },
                {
                  label: 'choice 3',
                  value: 'ch3',
                },
              ]}
              value={['ch1', 'ch3']}
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
      </div>
    );
  }
}

export default DemoContainer;
