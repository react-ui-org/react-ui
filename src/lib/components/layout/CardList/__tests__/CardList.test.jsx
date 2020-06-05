import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../../../ui/Card/Card';
import CardList from '../CardList';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <CardList />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <CardList>
        <Card>content</Card>
      </CardList>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <CardList>
        <Card>content 1</Card>
        <Card>content 2</Card>
        <Card>content 3</Card>
      </CardList>
    ));

    expect(tree).toMatchSnapshot();
  });
});
