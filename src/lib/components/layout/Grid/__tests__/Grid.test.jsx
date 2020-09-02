import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../../../ui/Card/Card';
import { Grid } from '../Grid';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <Grid />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Grid>
        <Card>content</Card>
      </Grid>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Grid>
        <Card>content 1</Card>
        <Card>content 2</Card>
        <Card>content 3</Card>
      </Grid>
    ));

    expect(tree).toMatchSnapshot();
  });
});
