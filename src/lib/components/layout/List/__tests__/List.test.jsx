import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../List';
import { ListItem } from '../ListItem';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <List />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <List>
        <ListItem>content</ListItem>
      </List>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <List>
        <ListItem>content 1</ListItem>
        <ListItem>content 2</ListItem>
        <ListItem>content 3</ListItem>
      </List>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children and all props', () => {
    const tree = shallow((
      <List align="end" autoWidth>
        <ListItem>content 1</ListItem>
        <ListItem>content 2</ListItem>
        <ListItem>content 3</ListItem>
      </List>
    ));

    expect(tree).toMatchSnapshot();
  });
});
